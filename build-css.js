const postcss = require('postcss');
const tailwind = require('@tailwindcss/postcss');
const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, 'src', 'app', 'input.css');
const outputPath = path.join(__dirname, 'src', 'app', 'globals.css');

if (!fs.existsSync(inputPath)) {
  fs.copyFileSync(outputPath, inputPath);
}

const css = fs.readFileSync(inputPath, 'utf8');

const customPath = path.join(__dirname, 'src', 'app', 'custom.css');
const customCss = fs.existsSync(customPath) ? fs.readFileSync(customPath, 'utf8') : '';

postcss([tailwind()])
  .process(css, { from: inputPath, to: outputPath })
  .then(result => {
    const finalCss = result.css + '\n\n' + customCss;
    fs.writeFileSync(outputPath, finalCss, 'utf8');
    console.log(`[build-css] Generated ${outputPath} (${finalCss.length} bytes)`);
  })
  .catch(err => {
    console.error('[build-css] Error:', err);
    process.exit(1);
  });
