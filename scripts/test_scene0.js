const fs = require('fs');

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
</style>
</head>
<body>

  <!-- Scene 0 Preview -->
  <div class="phone-screen" id="scene0">
    <div class="dynamic-island"></div>

    <!-- Video at top / hero area -->
    <div style="position: absolute; top: 0; left: 0; right: 0; height: 56%; overflow: hidden;">
      <video src="http://localhost:3000/video/hero-cat.mp4" autoplay muted loop playsinline
        style="width: 100%; height: 100%; object-fit: cover; object-position: center 18%; filter: contrast(1.05) brightness(0.95);"></video>
      <div style="position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 25%, transparent 60%, #000 100%);"></div>
    </div>

    <!-- Scene 0 Apple Content Card anchored at bottom -->
    <div style="position: absolute; bottom: 28px; left: 16px; right: 16px; z-index: 50; padding: 22px 20px; background: rgba(18,18,22,0.88); backdrop-filter: blur(28px); -webkit-backdrop-filter: blur(28px); border-radius: 28px; border: 1px solid rgba(255,255,255,0.12); box-shadow: 0 20px 50px rgba(0,0,0,0.9); text-align: center;">
      
      <!-- Small Crest Badge -->
      <div style="display: inline-flex; align-items: center; gap: 8px; padding: 4px 14px; border-radius: 20px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); margin-bottom: 12px;">
        <span style="width: 6px; height: 6px; border-radius: 50%; background: #10b981;"></span>
        <span style="font-size: 10px; font-family: monospace; text-transform: uppercase; letter-spacing: 0.25em; color: rgba(255,255,255,0.9); font-weight: 600;">FIFe · FPL · WROCŁAW</span>
      </div>

      <h1 style="font-size: 32px; font-weight: 300; line-height: 1.05; margin-bottom: 8px; letter-spacing: -0.02em;">
        Koci <span style="font-weight: 600; font-style: italic; background: linear-gradient(90deg, #fef08a, #fff, #d4d4d8); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Przyjaciel</span>
      </h1>

      <p style="font-size: 13px; color: #e4e4e7; line-height: 1.45; font-weight: 300; margin-bottom: 14px;">
        Hodowla kotów Maine Coon we Wrocławiu.<br>
        <span style="font-size: 11px; color: #a1a1aa; text-transform: uppercase; letter-spacing: 0.15em; font-family: monospace; display: block; margin-top: 4px;">Wychowujemy z miłością · Od 10 lat</span>
      </p>

      <div style="display: flex; align-items: center; justify-content: center; gap: 6px; color: #71717a; font-size: 10px; text-transform: uppercase; letter-spacing: 0.25em;">
        <span>Przewiń, aby poznać</span>
        <span style="display: inline-block; animation: bounce 1.5s infinite;">↓</span>
      </div>
    </div>
  </div>

</body>
</html>
`;

fs.writeFileSync('C:/Users/Michu/.gemini/antigravity-ide/scratch/koci-przyjaciel-cattery/public/test_hero_scene0.html', html);
console.log('Saved test_hero_scene0.html');
