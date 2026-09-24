const postcss = require('postcss');
const tailwind = require('@tailwindcss/postcss');
const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, '..', 'src', 'app', 'input.css');
const outputPath = path.join(__dirname, '..', 'src', 'app', 'globals.css');

if (!fs.existsSync(inputPath)) {
  fs.copyFileSync(outputPath, inputPath);
}

const css = fs.readFileSync(inputPath, 'utf8');

postcss([tailwind()])
  .process(css, { from: inputPath, to: outputPath })
  .then(result => {
    fs.writeFileSync(outputPath, result.css, 'utf8');
    console.log(`[build-css] Generated ${outputPath} (${result.css.length} bytes)`);
  })
  .catch(err => {
    console.error('[build-css] Error:', err);
    process.exit(1);
  });
