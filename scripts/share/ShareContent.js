export class ShareContent {
  // 登録するデータ形式の選択肢要素生成
  static createClassThumbnail() {}
  // アップロード内容設定要素生成
  static createUploadSetting () {}
  // サーバに登録するデータ取得
  static async getSettingInput () {}
  // データ形式名取得
  static getContentType () {}
  // データ概要取得
  static getOverviewStr () {}
  // アップロード済み内容詳細要素生成
  static createDownloadPop () {}

  // 共通のアップロード項目取得
  static getCommonUploadParam (sc) {
    return {
      type: sc.getContentType(),
      overview: sc.getOverviewStr(),
    }
  }

  // アップロード済みデータ一覧に表示する要素生成
  static createThumbnail (data) {
    let thumnail = $('<div class="listThumbnail">');
    let type = $('<div class="listThumbnailType">');
    let overview = $('<div class="listThumbnailOverview">');

    thumnail.data('key', data.key);
    type.text(data.type);
    overview.text(data.overview);

    thumnail.append(type);
    thumnail.append(overview);

    return thumnail;
  }
}