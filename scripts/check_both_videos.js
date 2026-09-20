const { spawn } = require('child_process');
const http = require('http');
const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');

const OUT_DIR = 'C:/Users/Michu/.gemini/antigravity-ide/brain/b3a8bacb-94dd-4f2d-a8e8-1bc5662907cf';

async function run() {
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9230',
    '--disable-gpu',
    '--window-size=390,844',
    'http://localhost:3000'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  http.get('http://127.0.0.1:9230/json', (res) => {
    let data = '';
    res.on('data', c => data += c);
    res.on('end', async () => {
      const targets = JSON.parse(data);
      const pageTarget = targets.find(t => t.type === 'page');
      const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);

      let id = 1;
      const callbacks = new Map();
      ws.on('message', msg => {
        const r = JSON.parse(msg);
        if (r.id && callbacks.has(r.id)) {
          callbacks.get(r.id)(r.result);
          callbacks.delete(r.id);
        }
      });

      const send = (method, params = {}) => new Promise(res => {
        const msgId = id++;
        callbacks.set(msgId, res);
        ws.send(JSON.stringify({ id: msgId, method, params }));
      });

      await new Promise(res => ws.on('open', res));
      await send('Page.enable');
      await send('Runtime.enable');
      await send('Emulation.setDeviceMetricsOverride', {
        width: 390,
        height: 844,
        deviceScaleFactor: 2,
        mobile: true
      });

      // Wait 3.5s so hero video fades in
      await new Promise(r => setTimeout(r, 3500));

      // 1. Hero at top after video fade in
      let shot = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(OUT_DIR, 'check_hero_0.png'), Buffer.from(shot.data, 'base64'));
      console.log('Saved check_hero_0.png');

      // 2. Hero scrolled to scene 1 (y = 900)
      await send('Runtime.evaluate', { expression: 'window.scrollTo(0, 900);' });
      await new Promise(r => setTimeout(r, 800));
      shot = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(OUT_DIR, 'check_hero_scene1.png'), Buffer.from(shot.data, 'base64'));
      console.log('Saved check_hero_scene1.png');

      // 3. Hero scrolled to scene 2 (y = 1800)
      await send('Runtime.evaluate', { expression: 'window.scrollTo(0, 1800);' });
      await new Promise(r => setTimeout(r, 800));
      shot = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(OUT_DIR, 'check_hero_scene2.png'), Buffer.from(shot.data, 'base64'));
      console.log('Saved check_hero_scene2.png');

      // 3c. Hero scrolled to scene 3 (y = 3500)
      await send('Runtime.evaluate', { expression: 'window.scrollTo(0, 3500);' });
      await new Promise(r => setTimeout(r, 800));
      shot = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(OUT_DIR, 'check_hero_scene3.png'), Buffer.from(shot.data, 'base64'));
      console.log('Saved check_hero_scene3.png');

      // 3d. Hero scrolled to scene 4 CTA (y = 4200)
      await send('Runtime.evaluate', { expression: 'window.scrollTo(0, 4200);' });
      await new Promise(r => setTimeout(r, 800));
      shot = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(OUT_DIR, 'check_hero_scene4.png'), Buffer.from(shot.data, 'base64'));
      console.log('Saved check_hero_scene4.png');

      // 4. EnclosureSection start
      await send('Runtime.evaluate', {
        expression: `
          (() => {
            const el = document.getElementById('wybieg');
            if (el) {
              const y = window.pageYOffset + el.getBoundingClientRect().top;
              window.scrollTo(0, y);
            }
          })()
        `
      });
      await new Promise(r => setTimeout(r, 800));
      shot = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(OUT_DIR, 'check_wybieg_start.png'), Buffer.from(shot.data, 'base64'));
      console.log('Saved check_wybieg_start.png');

      // 5. EnclosureSection slide 1 (+500px)
      await send('Runtime.evaluate', {
        expression: `
          (() => {
            const el = document.getElementById('wybieg');
            if (el) {
              const y = window.pageYOffset + el.getBoundingClientRect().top + 500;
              window.scrollTo(0, y);
            }
          })()
        `
      });
      await new Promise(r => setTimeout(r, 800));
      shot = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(OUT_DIR, 'check_wybieg_slide1.png'), Buffer.from(shot.data, 'base64'));
      console.log('Saved check_wybieg_slide1.png');

      // 6. EnclosureSection slide 2 (+1000px)
      await send('Runtime.evaluate', {
        expression: `
          (() => {
            const el = document.getElementById('wybieg');
            if (el) {
              const y = window.pageYOffset + el.getBoundingClientRect().top + 1000;
              window.scrollTo(0, y);
            }
          })()
        `
      });
      await new Promise(r => setTimeout(r, 800));
      shot = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(OUT_DIR, 'check_wybieg_slide2.png'), Buffer.from(shot.data, 'base64'));
      console.log('Saved check_wybieg_slide2.png');

      ws.close();
      chrome.kill();
      console.log('ALL DIAGNOSTIC SCREENSHOTS SAVED!');
      process.exit(0);
    });
  });
}
run();
