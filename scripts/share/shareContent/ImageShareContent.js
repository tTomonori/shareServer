import {ShareContent} from '../ShareContent.js';
import util from '../../util.js';

export class ImageShareContent extends ShareContent {
  // 登録するデータ形式の選択肢要素生成
  static createClassThumbnail() {
    let thumnail = $('<div class="classThumnail">');
    thumnail.text('Image')
    return thumnail;
  }

  // アップロード内容設定要素生成
  static createUploadSetting () {
    let setting = $('<div>');
    let imageInput = $('<input type="file" class="ImageShareContentFile">');
    setting.append(imageInput);
    return setting;
  }

  // サーバに登録するデータ取得
  static async getSettingInput() {
    let fileBinary = await this.getFileAsBinary();
    if (!fileBinary) { return null; }
    return {
      image: fileBinary,
      ...ShareContent.getCommonUploadParam(this),
    };
  }

  // アップロードするファイルのバイナリデータ取得
  static async getFileAsBinary () {
    return new Promise((res, rej) => {
      let selectedFile = $('.ImageShareContentFile')[0].files[0];
      if (!selectedFile) {
        res(null);
        return;
      }
      let reader = new FileReader();
      reader.onloadend = () => {
        let b64 = util.binaryToBase64(reader.result);
        res(b64);
      };
      reader.readAsArrayBuffer(selectedFile);
    });
  }

  // アップロード済み内容詳細要素生成
  static createDownloadPop (data) {
    let dom = $('<div>');
    let img = $('<img class="sharedDisplayImage">');

    img.prop('src', 'data:image/png;base64,' + data.image);

    dom.append(img);

    return dom;
  }

  // データ形式名取得
  static getContentType () {
    return 'Image';
  }

  // データ概要取得
  static getOverviewStr () {
    return $('.ImageShareContentFile')[0].files[0].name;
  }
}