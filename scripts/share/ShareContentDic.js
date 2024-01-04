import { ImageShareContent } from './shareContent/ImageShareContent.js';
import { TextShareContent } from './shareContent/TextShareContent.js';

export class ShareContentDic {
  // 文字列からクラスを取得
  static getClass (type) {
    switch (type) {
      case 'Image':
        return ImageShareContent;
      case 'Text':
        return TextShareContent;
      default:
        null;
    }
  }
}