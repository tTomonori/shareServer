let mod = {};
// クリップボードへコピー
mod.copyToClipboard = (str) => {
  if (!str || typeof str !== 'string') {
      return '';
  }
  const textarea = document.createElement('textarea');
  textarea.id = 'tmp_copy';
  textarea.style.position = 'fixed';
  textarea.style.right = '100vw';
  textarea.style.fontSize = '16px';
  textarea.setAttribute('readonly', 'readonly');
  textarea.textContent = str;
  document.body.appendChild(textarea);
  const elm = document.getElementById('tmp_copy');
  elm.select();
  const range = document.createRange();
  range.selectNodeContents(elm);
  const sel = window.getSelection();
  if (sel) {
      sel.removeAllRanges();
      sel.addRange(range);
  }
  elm.setSelectionRange(0, 999999);
  document.execCommand('copy');
  document.body.removeChild(textarea);

  return str;
};

mod.binaryToBase64 = function (arrayBuffer) {
  // binaryをstringに変換
  let binaryString = "";
  const bytes = new Uint8Array(arrayBuffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binaryString += String.fromCharCode(bytes[i]);
  }
  // stringをbase64に変換
  let base64 = btoa(binaryString);
  return base64;
}

export default mod;