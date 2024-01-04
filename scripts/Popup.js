export class Popup {
  static cover () {
    this.coverDom = $('<div class="cover">');
    $(document.body).append(this.cover);
  }
  static removeCover () {
    this.coverDom.remove();
  }

  constructor (width, height) {
    width = width || '50vw';
    height = height || '50vh';

    this.cover = $('<div class="cover">');

    this.dom = $('<div class="popup">');
    this.dom.css({
      width: width,
      height: height,
      left: `calc((100vw - ${width}) / 2)`,
      top: `calc((100vh - ${height}) / 2)`,
    });

    this.cover.append(this.dom);
  }

  displayTo (dom = $(document.body)) {
    dom.append(this.cover);
  }

  appendElement (dom) {
    this.dom.append(dom);
  }

  close () {
    this.cover.remove();
  }
}