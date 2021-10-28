'use babel';

import path from 'path';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('ImagePreview', () => {
  let workspaceElement, editor, editorElement;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    // atom.project.setPaths([path.dirname(__dirname)]);
    waitsForPromise(() => atom.packages.activatePackage('language-css'));
    waitsForPromise(() =>
      atom.workspace
        .open(path.join(__dirname, 'assets', 'test.css'))
        .then(e => {
          editor = e;
        })
    );
    waitsForPromise(() => atom.packages.activatePackage('image-preview'));

    runs(() => {
      // editor = atom.workspace.getActiveTextEditor();
      editorElement = atom.views.getView(editor);
      jasmine.attachToDOM(workspaceElement);
    });
  });

  describe('when the image-preview:show event is triggered', () => {
    it('shows css image link', () => {
      editor.setCursorBufferPosition([1, 25]);
      waitsForPromise(() =>
        atom.commands.dispatch(editorElement, 'image-preview:show')
      );

      runs(() => {
        // console.log(editorElement.querySelector('.image-preview'));
        expect(editorElement.querySelector('.image-preview')).toExist();
        expect(
          editorElement.querySelector(
            `img[src="${path.join(__dirname, 'assets', 'sample.jpg')}"]`
          )
        ).toExist();
      });
    });
  });
});
