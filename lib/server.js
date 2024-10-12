const express = require('express');
const app = express();
const port = 4000;
const prefix = '/api/';
app.get('/home', (req, res) => {
  res.send('hello world');
});
app.get(`${prefix}sse/getData`, (req, res) => {
  // 设置 HTTP 响应头
  res.writeHead(200, {
    // 下面三个响应头是 sse 必须的
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
    // 设置跨域请求头
    'access-control-allow-origin': '*'
  });

  // 每隔 1 秒发送一次消息
  const intervalId = setInterval(() => {
    const message = `时间戳: ${new Date().toLocaleTimeString()}`;
    // 用双换行符分隔每条数据
    res.write(`data: ${message}\ndata:hhhhh\n\n`);
  }, 1000);
  const intervalId2 = setInterval(() => {
    const message = `时间戳: ${new Date().toLocaleTimeString()}`;
    // 用双换行符分隔每条数据
    res.write(`event:my-event\ndata: ${message}\n\n`);
  }, 2000);
  const end = () => {
    clearInterval(intervalId);
    clearInterval(intervalId2);
    res.end();
  };

  // 测试用：设置 8s 后关闭
  // setTimeout(() => {
  //     end()
  // }, 8000)

  // 当连接关闭时，清除定时器
  req.on('close', () => {
    end();
  });
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});