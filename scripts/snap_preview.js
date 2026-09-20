const { spawn } = require('child_process');
const http = require('http');
const WebSocket = require('ws');
const fs = require('fs');

async function snap() {
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9232',
    '--disable-gpu',
    '--window-size=500,1000',
    'http://localhost:3000/test_hero_mobile.html'
  ]);
  await new Promise(r => setTimeout(r, 1500));
  http.get('http://127.0.0.1:9232/json', res => {
    let d = ''; res.on('data', c => d += c);
    res.on('end', async () => {
      const targets = JSON.parse(d);
      const page = targets.find(t => t.type === 'page');
      const ws = new WebSocket(page.webSocketDebuggerUrl);
      let id = 1;
      const send = (m, p = {}) => new Promise(r => {
        const i = id++;
        const l = msg => {
          const res = JSON.parse(msg);
          if (res.id === i) { ws.off('message', l); r(res.result); }
        };
        ws.on('message', l);
        ws.send(JSON.stringify({ id: i, method: m, params: p }));
      });
      await new Promise(r => ws.on('open', r));
      await send('Page.enable');
      await new Promise(r => setTimeout(r, 2000));
      const shot = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('C:/Users/Michu/.gemini/antigravity-ide/brain/b3a8bacb-94dd-4f2d-a8e8-1bc5662907cf/layout_preview_1.png', Buffer.from(shot.data, 'base64'));
      console.log('Saved layout_preview_1.png');
      process.exit(0);
    });
  });
}
snap();
