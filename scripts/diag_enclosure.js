const { spawn } = require('child_process');
const http = require('http');
const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');

const OUT_DIR = 'C:/Users/Michu/.gemini/antigravity-ide/brain/b3a8bacb-94dd-4f2d-a8e8-1bc5662907cf';

async function testEnclosureSizes() {
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9240',
    '--disable-gpu',
    '--window-size=390,844',
    'http://localhost:3000'
  ]);
  await new Promise(r => setTimeout(r, 2000));
  http.get('http://127.0.0.1:9240/json', res => {
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
      await send('Runtime.enable');
      
      const sizes = [
        { name: 'iphone_se_667', w: 375, h: 667 },
        { name: 'iphone_14_844', w: 390, h: 844 },
        { name: 'iphone_pro_max_932', w: 430, h: 932 }
      ];

      for (const s of sizes) {
        await send('Emulation.setDeviceMetricsOverride', {
          width: s.w,
          height: s.h,
          deviceScaleFactor: 2,
          mobile: true
        });

        // Scroll to enclosure section start
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
        await new Promise(r => setTimeout(r, 600));
        let shot = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(path.join(OUT_DIR, `diag_enclosure_${s.name}_start.png`), Buffer.from(shot.data, 'base64'));

        // Scroll to enclosure slide 1 (+400px)
        await send('Runtime.evaluate', {
          expression: `
            (() => {
              const el = document.getElementById('wybieg');
              if (el) {
                const y = window.pageYOffset + el.getBoundingClientRect().top + 400;
                window.scrollTo(0, y);
              }
            })()
          `
        });
        await new Promise(r => setTimeout(r, 600));
        shot = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(path.join(OUT_DIR, `diag_enclosure_${s.name}_slide1.png`), Buffer.from(shot.data, 'base64'));
      }

      console.log('Diagnostic enclosure screenshots saved!');
      process.exit(0);
    });
  });
}
testEnclosureSizes();
