const express = require('express');
const ip = require('ip');
const app = express();

const ShareServer = require('./server/ShareServer');

app.use(express.json({ limit: '100mb' }));

// static files directory に指定
app.use(express.static(__dirname));

// サイトURL生成
const port = 3000;
const host = ip.address();
const firstPath = 'shareServer';
const myAppCommonPath = 'myApp';
const thisAppUrl = `${host}:${port}/${firstPath}`;
console.log('This app URL : ' + thisAppUrl);

app.get(`/${firstPath}`, (req, res) => {
  res.render(__dirname + '/views/index.ejs', { thisAppUrl: thisAppUrl });
});

app.get(`/${myAppCommonPath}`, (req, res) => {
  res.render(__dirname + '/views/index.ejs', { thisAppUrl: thisAppUrl });
});

app.post(`/${firstPath}/upload`, (req, res) => {
  ShareServer.upload(req.body);
  res.send(200);
});

app.get(`/${firstPath}/list`, (req, res) => {
  let list = ShareServer.getList();
  res.send(list);
});

app.post(`/${firstPath}/data`, (req, res) => {
  let data = ShareServer.getData(req.body.key);
  res.send(data);
});

app.post(`/${firstPath}/delete`, (req, res) => {
  let data = ShareServer.delete(req.body.key);
  res.send(data);
});

// ポート指定で接続
app.listen(port);

if (process.argv[2] !== 'debug') {
  // chromeを開く
  const { spawn } = require("child_process")
  spawn("start", ["http:" + thisAppUrl, "chrome"], { shell: true })
}