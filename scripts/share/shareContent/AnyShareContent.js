import {ShareContent} from '../ShareContent.js';
import util from '../../util.js';

export class AnyShareContent extends ShareContent {
  // 登録するデータ形式の選択肢要素生成
  static createClassThumbnail() {
    let thumnail = $('<div class="classThumnail">');
    thumnail.text('AnyFile')
    return thumnail;
  }

  // アップロード内容設定要素生成
  static createUploadSetting () {
    let setting = $('<div>');
    let fileInput = $('<input type="file" class="AnyShareContentFile">');
    setting.append(fileInput);
    return setting;
  }

  // サーバに登録するデータ取得
  static async getSettingInput() {
    let fileBinary = await this.getFileAsBinary();
    if (!fileBinary) { return null; }
    let name = this.getSelectedFileName();
    let type = this.getSelectedFileType();
    return {
      file: fileBinary,
      name: name,
      type: type,
      ...ShareContent.getCommonUploadParam(this),
    };
  }

  // アップロードするファイルのバイナリデータ取得
  static async getFileAsBinary () {
    return new Promise((res, rej) => {
      let selectedFile = $('.AnyShareContentFile')[0].files[0];
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

  // アップロードするファイルの名称取得
  static getSelectedFileName () {
    let selectedFile = $('.AnyShareContentFile')[0].files[0];
    return selectedFile.name;
  }

  // アップロードするファイルのtype取得
  static getSelectedFileType () {
    let selectedFile = $('.AnyShareContentFile')[0].files[0];
    return selectedFile.type;
  }

  // アップロード済み内容詳細要素生成
  static createDownloadPop (data) {
    let dom = $('<div>');
    let link = $('<a class="shareDownloadLink">');

    link.text(data.name);
    link.prop('href', `data:${data.type};base64,${data.file}`);
    link.prop('download', data.name);

    dom.append(link);

    return dom;
  }

  // データ形式名取得
  static getContentType () {
    return 'AnyFile';
  }

  // データ概要取得
  static getOverviewStr () {
    return $('.AnyShareContentFile')[0].files[0].name;
  }
}