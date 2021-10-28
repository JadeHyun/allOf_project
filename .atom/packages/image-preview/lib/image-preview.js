'use babel';

import path from 'path';
import { CompositeDisposable } from 'atom';
import ImagePreviewView from './image-preview-view';
import { expectedScopes, regexPatterns } from './scopes';
import { getTargetScope, parseImagePath } from './utils';

export default {
  subscriptions: null,

  activate() {
    this.markers = new WeakMap();
    this.updateCurrentEditor(atom.workspace.getActiveTextEditor());

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(
      atom.workspace.onDidStopChangingActivePaneItem(editor => {
        this.updateCurrentEditor(editor);
      })
    );

    this.subscriptions.add(
      atom.commands.add('atom-text-editor', {
        'image-preview:show': () => this.showPreview()
      })
    );

    atom.contextMenu.add({
      'atom-text-editor': [
        {
          label: 'Show Image Preview',
          command: 'image-preview:show',
          shouldDisplay: ::this.shouldDisplayContextMenu
        }
      ]
    });
  },

  deactivate() {
    this.subscriptions.dispose();
    this.clearAllPreviews();
  },

  serialize() {},

  updateCurrentEditor(editor) {
    if (!editor || this.editor === editor) return;
    this.editor = editor;
  },

  shouldDisplayContextMenu() {
    const editor = atom.workspace.getActiveTextEditor();
    const currentScopes = editor
      .getLastCursor()
      .getScopeDescriptor()
      .getScopesArray();
    const targetScope = getTargetScope(currentScopes, expectedScopes);

    return editor !== null && targetScope !== null;
  },

  showPreview() {
    const cursor = this.editor.getLastCursor();
    const currentScopes = cursor.getScopeDescriptor().getScopesArray();
    const targetScope = getTargetScope(currentScopes, expectedScopes);
    let markerView;

    if (targetScope !== null) {
      markerView = new ImagePreviewView();
      this.createMarker(markerView);
      this.setMarkerImage(targetScope, markerView).catch(err => {
        this.destroyMarker();
        atom.notifications.addWarning(err.message);
      });
    } else {
      atom.notifications.addWarning(
        'Could not find anything to preview at cursor"'
      );
      return;
    }
  },

  createMarker(view) {
    if (this.markers.has(this.editor)) {
      this.destroyMarker();
    }

    const marker = this.editor.markBufferRange(
      this.editor.getSelectedBufferRange(),
      {
        invalidate: 'never'
      }
    );

    this.editor.decorateMarker(marker, {
      class: 'image-preview-overlay',
      type: 'overlay',
      item: view,
      avoidOverflow: false
    });

    view.onClose(() => {
      marker.destroy();
    });

    this.markers.set(this.editor, marker);
  },

  destroyMarker() {
    const marker = this.markers.get(this.editor);
    marker.destroy();
  },

  async setMarkerImage(targetScope, view) {
    const range = this.editor.bufferRangeForScopeAtCursor(targetScope);
    const basePath = path.dirname(this.editor.getPath());
    const rangeText = this.editor.getTextInRange(range);
    const cursor = this.editor.getLastCursor();
    const selectedBufferRange = this.editor.getSelectedBufferRange();
    const lineContent = cursor.getCurrentBufferLine();
    const targetScopeColumnPosition = lineContent.indexOf(rangeText);
    let result = null;
    let startPosition = null;
    let regex;

    if (/srcset=.*,.*/.test(rangeText)) {
      regex = regexPatterns[`${targetScope}.srcset`];
      regex.lastIndex = 0;

      while ((result = regex.exec(rangeText)) && result[0].length) {
        startPosition =
          targetScopeColumnPosition + rangeText.indexOf(result[1]);

        if (
          startPosition <= selectedBufferRange.start.column &&
          selectedBufferRange.start.column < startPosition + result[1].length
        ) {
          break;
        }
      }
    } else {
      regex = regexPatterns[targetScope];

      if ((result = regex.exec(rangeText)) !== null) {
        startPosition =
          targetScopeColumnPosition + rangeText.indexOf(result[1]);
      }
    }

    if (result !== null) {
      this.selectPath(result[1], startPosition);
      await parseImagePath(result[1], basePath)
        .then(imagePaths => {
          return view.loadImages(imagePaths);
        })
        .catch(err => {
          throw new Error(err);
        });
    } else {
      throw new Error('Regex match failed.');
    }
  },

  selectPath(path, startPosition) {
    const cursor = this.editor.getLastCursor();
    const cursorBufferRow = cursor.getBufferRow();

    this.editor.addSelectionForBufferRange([
      [cursorBufferRow, startPosition],
      [cursorBufferRow, startPosition + path.length]
    ]);
  },

  clearAllPreviews() {
    const editors = atom.workspace.getTextEditors();
    for (let editor of editors) {
      let marker = this.markers.get(editor);
      if (marker) {
        marker.destroy();
      }
    }
  }
};
