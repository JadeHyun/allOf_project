'use babel';

import fs from 'fs';
import bytes from 'bytes';
import { Emitter } from 'atom';
import { isLocalPath } from './utils';

export default class ImagePreviewView {
  constructor() {
    this.emitter = new Emitter();
    this.images = new Map();
    this.activeImageIndex = 1;

    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('image-preview');

    this.closeBtn = document.createElement('button');
    this.closeBtn.classList.add('btn', 'btn-sm', 'icon', 'icon-x');
    this.closeBtn.addEventListener('click', ::this.onCloseBtnClick);

    this.btnWhite = document.createElement('button');
    this.btnWhite.classList.add('btn-color', 'btn-white');
    this.btnWhite.addEventListener('click', () => {
      this.onChangeColor('white');
    });

    this.btnBlack = document.createElement('button');
    this.btnBlack.classList.add('btn-color', 'btn-black');
    this.btnBlack.addEventListener('click', () => {
      this.onChangeColor('black');
    });

    this.btnTransparent = document.createElement('button');
    this.btnTransparent.classList.add('btn-color', 'btn-transparent');
    this.btnTransparent.addEventListener('click', () => {
      this.onChangeColor('transparent');
    });

    this.colors = document.createElement('div');
    this.colors.classList.add('colors');
    this.colors.append(this.btnWhite, this.btnBlack, this.btnTransparent);

    this.actions = document.createElement('div');
    this.actions.classList.add('actions');
    this.actions.append(this.closeBtn, this.colors);

    this.spinner = document.createElement('div');
    this.spinner.classList.add('spinner');

    this.imgContainer = document.createElement('div');
    this.imgContainer.classList.add('image-container');
    this.imgContainer.appendChild(this.spinner);

    this.imgPath = document.createElement('div');
    this.imgPath.classList.add('image-path');

    this.imgSize = document.createElement('div');
    this.imgSize.classList.add('image-size');

    this.imgInfo = document.createElement('div');
    this.imgInfo.classList.add('image-info');
    this.imgInfo.append(this.imgPath, this.imgSize);

    this.element.append(this.actions, this.imgContainer, this.imgInfo);
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

  onCloseBtnClick() {
    this.emitter.emit('onClose');
  }

  onChangeColor(color) {
    this.imgContainer.setAttribute('data-background', color);
  }

  onClose(callback) {
    this.emitter.on('onClose', callback);
  }

  loadImages(paths) {
    const promises = [];
    paths.map((path, index) => {
      promises.push(this.loadImage(path, index));
    });

    return Promise.all(promises)
      .then(() => {
        this.spinner.remove();
        this.showImage(this.activeImageIndex);

        if (this.images.size > 1) {
          this.showPagination();
          this.updatePaginationText();
        }
      })
      .catch(err => {
        throw new Error(err);
      });
  }

  loadImage(path, index) {
    return new Promise((resolve, reject) => {
      const img = document.createElement('img');
      img.src = path;
      img.setAttribute('data-index', index + 1);
      this.imgContainer.appendChild(img);

      img.addEventListener('load', () => {
        let size = `${img.naturalWidth}x${img.naturalHeight}`;
        let stat;

        if (isLocalPath(path)) {
          stat = fs.statSync(path);
          size = `${size} ${bytes(stat.size)}`;
        }

        this.images.set(img, { path, size });
        resolve();
      });

      img.addEventListener('error', () => {
        reject(`${path} is invalid url.`);
      });
    });
  }

  showImage(index) {
    const activeImg = this.imgContainer.querySelector('.is-active');
    if (activeImg) activeImg.classList.remove('is-active');

    const img = this.imgContainer.querySelector(`img[data-index="${index}"]`);
    img.classList.add('is-active');
    this.updateImageInfo(img);
  }

  showPagination() {
    this.pagination = document.createElement('div');
    this.pagination.classList.add('pagination');

    this.prevBtn = document.createElement('button');
    this.prevBtn.classList.add('btn', 'btn-sm', 'icon', 'icon-chevron-left');
    this.prevBtn.addEventListener('click', ::this.onPrevBtnClick);

    this.nextBtn = document.createElement('button');
    this.nextBtn.classList.add('btn', 'btn-sm', 'icon', 'icon-chevron-right');
    this.nextBtn.addEventListener('click', ::this.onNextBtnClick);

    this.paginationText = document.createElement('div');
    this.paginationText.classList.add('pagination-text');

    this.pagination.append(this.prevBtn, this.paginationText, this.nextBtn);
    this.actions.appendChild(this.pagination);

    const tooltip = atom.tooltips.add(this.pagination, {
      title: 'Found multiple images',
      trigger: 'manual',
      placement: 'top'
    });

    setTimeout(() => {
      tooltip.dispose();
    }, 2500);

    this.onClose(() => {
      tooltip.dispose();
    });
  }

  onPrevBtnClick() {
    this.activeImageIndex =
      0 < this.activeImageIndex - 1
        ? this.activeImageIndex - 1
        : this.images.size;

    this.showImage(this.activeImageIndex);
    this.updatePaginationText();
  }

  onNextBtnClick() {
    this.activeImageIndex =
      this.images.size < this.activeImageIndex + 1
        ? 1
        : this.activeImageIndex + 1;

    this.showImage(this.activeImageIndex);
    this.updatePaginationText();
  }

  updatePaginationText() {
    this.paginationText.textContent = `${this.activeImageIndex}/${
      this.images.size
    }`;
  }

  updateImageInfo(img) {
    const imgInfo = this.images.get(img);
    this.imgPath.textContent = imgInfo.path;
    this.imgSize.textContent = imgInfo.size;
  }
}
