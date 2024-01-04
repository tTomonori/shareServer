import { ShareContentDic } from './ShareContentDic.js';

export class ShareList {
  static updateList (list, dom) {
    this.resetList(dom);
    for (let data of list) {
      let shareContent = ShareContentDic.getClass(data.type);
      let thumnail = shareContent.createThumbnail(data);
      dom.append(thumnail);
    }
  }

  // リストを空にする
  static resetList (dom) {
    dom.text('');
  }
}