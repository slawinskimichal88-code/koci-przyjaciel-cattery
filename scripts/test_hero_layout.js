const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const http = require('http');
const WebSocket = require('ws');

const OUT_DIR = 'C:/Users/Michu/.gemini/antigravity-ide/brain/b3a8bacb-94dd-4f2d-a8e8-1bc5662907cf';

// Create a test page comparing different mobile Hero layouts
const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { background: #000; color: #fff; font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif; display: flex; flex-direction: column; align-items: center; gap: 40px; padding: 20px; }
  .phone-screen {
    width: 390px;
    height: 844px;
    position: relative;
    overflow: hidden;
    background: #000;
    border-radius: 48px;
    border: 8px solid #27272a;
    box-shadow: 0 25px 60px rgba(0,0,0,0.8);
  }
  .dynamic-island {
    position: absolute;
    top: 12px;
    left: 50%;
    transform: translateX(-50%);
    width: 120px;
    height: 35px;
    background: #000;
    border-radius: 20px;
    z-index: 100;
  }
  .nav-bar {
    position: absolute;
    top: 52px;
    left: 20px;
    right: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 90;
  }
</style>
</head>
<body>

  <!-- Layout 1: Apple Card at Bottom, Video Centered at Top with head fully preserved -->
  <div class="phone-screen" id="view1">
    <div class="dynamic-island"></div>
    <div class="nav-bar">
      <div style="font-size: 14px; font-weight: 600; letter-spacing: 0.05em;">KOCI PRZYJACIEL <span style="color: #f59e0b;">*PL</span></div>
      <div style="background: rgba(255,255,255,0.15); padding: 6px 12px; border-radius: 20px; font-size: 11px;">EN</div>
    </div>

    <!-- Video at top / hero area -->
    <div style="position: absolute; top: 0; left: 0; right: 0; height: 58%; overflow: hidden;">
      <video src="http://localhost:3000/video/hero-cat.mp4" autoplay muted loop playsinline
        style="width: 100%; height: 100%; object-fit: cover; object-position: center 20%; filter: contrast(1.05) brightness(0.95);"></video>
      <div style="position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 20%, transparent 60%, #000 100%);"></div>
    </div>

    <!-- Apple Content Card anchored at bottom, zero overlap with cat head -->
    <div style="position: absolute; bottom: 34px; left: 16px; right: 16px; z-index: 50; padding: 24px; background: rgba(18,18,22,0.85); backdrop-filter: blur(28px); -webkit-backdrop-filter: blur(28px); border-radius: 28px; border: 1px solid rgba(255,255,255,0.12); box-shadow: 0 20px 50px rgba(0,0,0,0.9);">
      <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
        <span style="width: 6px; height: 6px; border-radius: 50%; background: #10b981;"></span>
        <span style="font-size: 10px; font-family: monospace; text-transform: uppercase; letter-spacing: 0.25em; color: #fbbf24; font-weight: 700;">RASA MAINE COON</span>
      </div>
      <h2 style="font-size: 28px; font-weight: 300; line-height: 1.1; margin-bottom: 8px; letter-spacing: -0.02em;">
        Największy <strong style="font-weight: 600; background: linear-gradient(90deg, #fff, #a1a1aa); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">kot domowy.</strong>
      </h2>
      <div style="display: flex; align-items: baseline; gap: 6px; margin-bottom: 10px;">
        <span style="font-size: 40px; font-weight: 200; line-height: 1;">12</span>
        <span style="font-size: 16px; color: #a1a1aa;">kg wagi samca</span>
      </div>
      <p style="font-size: 13px; color: #d4d4d8; line-height: 1.5; font-weight: 300; margin-bottom: 16px;">
        Maine Coon to jeden z największych kotów na świecie — potężny, łagodny i bezgranicznie oddany rodzinie.
      </p>
      <div style="display: flex; gap: 10px;">
        <button style="flex: 1; padding: 12px; border-radius: 20px; background: #fff; color: #000; font-size: 12px; font-weight: 700; border: none; text-transform: uppercase; letter-spacing: 0.15em;">Zarezerwuj</button>
        <button style="padding: 12px 18px; border-radius: 20px; background: rgba(255,255,255,0.1); color: #fff; font-size: 12px; font-weight: 600; border: 1px solid rgba(255,255,255,0.2);">Kociaki ↓</button>
      </div>
    </div>
  </div>

</body>
</html>
`;

fs.writeFileSync('C:/Users/Michu/.gemini/antigravity-ide/scratch/koci-przyjaciel-cattery/public/test_hero_mobile.html', html);
console.log('Saved test_hero_mobile.html');
