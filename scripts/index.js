import { ImageShareContent } from './share/shareContent/ImageShareContent.js';
import { TextShareContent } from './share/shareContent/TextShareContent.js';
import { UploadClassSelector } from './share/UploadClassSelector.js';
import { ShareSetting } from './share/ShareSetting.js';
import { ShareList } from './share/ShareList.js';
import { SharedDisplay } from './share/SharedDisplay.js';

import { Popup } from './Popup.js';

const ShareContents = [ImageShareContent, TextShareContent];

$('#uploadButton').on('click', () => {
  displayClassThumbnail();
});

$(document).on('click','.listThumbnail', (e) => {
  Popup.cover();

  let key = $(e.currentTarget).data('key');

  $.ajax({
    url : './shareServer/data',
    type: 'POST',
    data: JSON.stringify({ key: key }),
    contentType: "application/json"
  })
  .done((data) => {
    displayDownload(data);
    Popup.removeCover();
  });
});

// アップロードするデータの種類を選択するポップアップ表示
function displayClassThumbnail () {
  let selector = new UploadClassSelector();
  selector.display((selected) => {
    if (!selected) { return; }
    displayUploadSetting(selected);
  });
}

// アップロードする内容を設定するポップアップ表示
function displayUploadSetting (shareContent) {
  let setting = new ShareSetting(shareContent);
  setting.display((setting) => {
    if (!setting) { return; }
    upload(setting)
  });
}

// アップロードする
function upload(setting) {
  $.ajax({
    url: './shareServer/upload',
    type: 'POST',
    data: JSON.stringify(setting),
    contentType: "application/json"
  })
    .done(() => {
      resetUploadedList();
    });
}

// アップロード済みデータのダウンロード用要素表示
function displayDownload(data) {
  let display = new SharedDisplay(data);
  display.display((message) => {
    if (message === 'delete') {
      Popup.cover();
      $.ajax({
        url: './shareServer/delete',
        type: 'POST',
        data: JSON.stringify({ key: data.key }),
        contentType: "application/json"
      })
        .done(() => {
          resetUploadedList();
          Popup.removeCover();
        });
    }
  });
}

// アップロード済みデータを表示する
function resetUploadedList () {
  $.ajax({
    url : './shareServer/list',
    type: 'GET',
  })
  .done((list) => {
    ShareList.updateList(list, $('#shareList'));
  });
}

resetUploadedList();