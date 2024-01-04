import { Popup } from '../Popup.js';
export class ShareSetting {
  constructor (share) {
    this.shareContent = share;
  }
  display (callback) {
    this.callback = callback;
    this.popup = new Popup();
    this.setCancelButton();

    let settingDom = this.shareContent.createUploadSetting();

    this.popup.appendElement(settingDom);
    this.popup.appendElement($('<div style="height:10px">'))
    this.setUploadButton();
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

  // uploadボタン配置
  setUploadButton () {
    this.uploadButton = $('<div class="uploadButton">');
    this.uploadButton.text('Upload');
    this.uploadButton.on('click', async () => {
      let inputs = await this.shareContent.getSettingInput();
      this.popup.close();
      this.callback(inputs);
    });
    this.popup.appendElement(this.uploadButton);
  }
}