'use babel';

import fs from 'fs';
import path from 'path';
import url from 'url';
import glob from 'glob';
import validDataUrl from 'valid-data-url';

const extensions = ['jpg', 'jpeg', 'png', 'gif', 'svg'];

export function getTargetScope(currentScopes, expectedScopes) {
  for (const cScope of currentScopes) {
    if (expectedScopes.indexOf(cScope) != -1) return cScope;
  }
  return null;
}

export async function parseImagePath(value, basePath) {
  let imagePath = value.trim();
  let result = [];

  if (!isLocalPath(imagePath)) {
    if (isValidDataUrl(imagePath)) {
      result.push(imagePath);
    } else if (isProtocolRelativeUrl(imagePath)) {
      const errors = [];
      const promises = [
        remoteFileExists(`http:${imagePath}`),
        remoteFileExists(`https:${imagePath}`)
      ];

      await Promise.all(
        promises.map(p => {
          return p.then(
            val => ({ val, status: 'resolved' }),
            err => ({ err, status: 'rejected' })
          );
        })
      ).then(data => {
        data.forEach(item => {
          if (item.status === 'resolved') {
            result.push(item.val);
          } else {
            errors.push(item.err);
          }
        });

        if (!result.length && errors.length) {
          throw new Error(errors.join('<br>'));
        }
      });
    } else {
      await remoteFileExists(imagePath)
        .then(() => {
          result.push(imagePath);
        })
        .catch(err => {
          throw new Error(err);
        });
    }
    return result;
  }

  if (path.isAbsolute(imagePath)) {
    if (localFileExists(imagePath)) {
      result.push(imagePath);
    } else {
      result = await searchFiles(imagePath);
    }
    return result;
  }

  const imageFullPath = path.resolve(basePath, imagePath);

  if (localFileExists(imageFullPath)) {
    result.push(imageFullPath);
    return result;
  }

  if (!hasImageExtention(imageFullPath)) {
    for (let ext of extensions) {
      let newPath = `${imageFullPath}.${ext}`;
      if (localFileExists(newPath)) {
        result.push(newPath);
      }
    }

    if (result.length) {
      return result;
    }
  }

  result = await searchFiles(imagePath.replace(/(?:\.*\/)*/, ''));

  return result;
}

function isValidDataUrl(url) {
  return validDataUrl(url);
}

export function isLocalPath(value) {
  return (
    typeof value === 'string' &&
    !url.parse(value).hostname &&
    !isProtocolRelativeUrl(value)
  );
}

function isProtocolRelativeUrl(path) {
  return /^\/\//.test(path);
}

function localFileExists(path) {
  try {
    return fs.statSync(path).isFile();
  } catch (err) {
    return false;
  }
}

async function remoteFileExists(url) {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.send(null);
    xhr.onload = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(url);
        } else {
          reject(`${url} does not exist.`);
        }
      }
    };
    xhr.onerror = () => {
      reject(`${url} does not exist.`);
    };
  });
}

function searchFiles(imagePath) {
  return new Promise((resolve, reject) => {
    const editor = atom.workspace.getActiveTextEditor();
    const rootPath = atom.project.relativizePath(editor.getPath())[0];
    let pattern;

    if (extensions.indexOf(imagePath.split('.').pop()) !== -1) {
      pattern = path.join(rootPath, '**', imagePath);
    } else {
      pattern = path.join(
        rootPath,
        '**',
        `${imagePath}.{${extensions.join(',')}}`
      );
    }

    glob(pattern, (err, files) => {
      if (err) reject(err);

      if (files.length > 0) {
        resolve(files);
      } else {
        reject(`Could not find a file that matches: ${pattern}`);
      }
    });
  });
}

function hasImageExtention(path) {
  return extensions.indexOf(path.split('.').pop()) !== -1;
}
