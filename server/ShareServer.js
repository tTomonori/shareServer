const uploaded = [];
class ShareServer {
  // 登録
  static upload (data) {
    data.key = this.getKey();
    uploaded.push(data);
  }

  // 取得
  static getData (key) {
    return uploaded.find(data => data.key === key);
  }

  // 削除
  static delete (key) {
    for (let i = 0; i < uploaded.length; i++) {
      if (uploaded[i].key === key) {
        uploaded.splice(i, 1);
        return;
      }
    }
  }

  // 一覧取得
  static getList () {
    return uploaded.map((data) => {
      return {
        key: data.key,
        type: data.type,
        overview: data.overview,
      }
    })
  }

  // キーを生成
  static getKey () {
    let date = new Date();
    let key = date.getTime().toString();
    return key;
  }
}

module.exports = ShareServer;