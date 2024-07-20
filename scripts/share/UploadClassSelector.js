import { ImageShareContent } from './shareContent/ImageShareContent.js';
import { TextShareContent } from './shareContent/TextShareContent.js';
import { AnyShareContent } from './shareContent/AnyShareContent.js';

import { Popup } from '../Popup.js';

const ShareContents = [ImageShareContent, TextShareContent, AnyShareContent];

export class UploadClassSelector {
  display (callback) {
    this.callback = callback;
    this.popup = new Popup();

    this.setCancelButton();
    this.setClass();

    this.popup.displayTo();
  }

  // cancelボタン配置
  setCancelButton () {
    this.cancelButton = $('<div class="cancelButton">');
    this.cancelButton.text('cancel');
    this.cancelButton.on('click', () => {
      this.popup.close();
      this.callback(null);
    });
    this.popup.appendElement(this.cancelButton);
    this.popup.appendElement($('<br>'));
  }

  // 選択肢配置
  setClass () {
    for (let content of ShareContents) {
      let thumnail = content.createClassThumbnail();
      thumnail.on('click', () => {
        this.popup.close();
        this.callback(content);
      });
      this.popup.appendElement(thumnail);
    }
  }
}