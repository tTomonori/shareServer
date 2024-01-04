import { Popup } from '../Popup.js';
import { ShareContentDic } from './ShareContentDic.js';

export class SharedDisplay {
  constructor (data) {
    this.data = data;
    this.shareContent = ShareContentDic.getClass(data.type);
  }

  display (callback) {
    this.callback = callback;
    this.popup = new Popup();
    this.setCancelButton();
    this.setDeleteButton()
    this.popup.appendElement($('<br>'));

    let downloadDom = this.shareContent.createDownloadPop(this.data);

    this.popup.appendElement(downloadDom);
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
  }

  // deletecancelボタン配置
  setDeleteButton () {
    this.deletecancel = $('<div class="deleteButton">');
    this.deletecancel.text('delete');
    this.deletecancel.on('click', () => {
      this.popup.close();
      this.callback('delete');
    });
    this.popup.appendElement(this.deletecancel);
  }
}