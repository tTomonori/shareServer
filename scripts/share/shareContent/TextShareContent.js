import {ShareContent} from '../ShareContent.js';
import util from '../../util.js';

export class TextShareContent extends ShareContent {
  // 登録するデータ形式の選択肢要素生成
  static createClassThumbnail() {
    let thumnail = $('<div class="classThumnail">');
    thumnail.text('Text')
    return thumnail;
  }

  // アップロード内容設定要素生成
  static createUploadSetting () {
    let setting = $('<div>');
    let textArea = $('<textarea class="TextShareContentText">');
    setting.append(textArea);
    return setting;
  }

  // サーバに登録するデータ取得
  static async getSettingInput() {
    let text = $('.TextShareContentText').val();
    if (!text) { return null; }
    return {
      text: text,
      ...ShareContent.getCommonUploadParam(this),
    };
  }

  // アップロード済み内容詳細要素生成
  static createDownloadPop (data) {
    let dom = $('<div>');
    let textArea = $('<textarea class="sharedDisplayText" readonly>');
    let copyButton = $('<div class="copyButton">')

    textArea.html(data.text);
    copyButton.text('copy');

    copyButton.on('click', () => {
      util.copyToClipboard(data.text);
      copyButton.text('copied!');
    });

    dom.append(textArea);
    dom.append($('<div style="height:10px">'))
    dom.append(copyButton);

    return dom;
  }

  // データ形式名取得
  static getContentType () {
    return 'Text';
  }

  // データ概要取得
  static getOverviewStr () {
    return $('.TextShareContentText').val().substr(0, 10);
  }
}