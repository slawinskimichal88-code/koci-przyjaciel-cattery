import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const TARGET_URL = process.argv[2] || 'http://localhost:3000';
const SCRATCH_DIR = path.resolve('scratch');
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

if (!fs.existsSync(SCRATCH_DIR)) {
  fs.mkdirSync(SCRATCH_DIR, { recursive: true });
}

const outputPath = path.join(SCRATCH_DIR, 'lighthouse_mobile.json');
const htmlOutputPath = path.join(SCRATCH_DIR, 'lighthouse_mobile.html');

const strategy = process.argv[3] || 'mobile';
const formFactorFlag = strategy === 'desktop' ? '--preset=desktop' : '--form-factor=mobile';
const outputPrefix = `lighthouse_${strategy}`;

console.log(`[Lighthouse] Uruchamianie audytu ${strategy.toUpperCase()} dla: ${TARGET_URL}...`);

// Uruchamiamy npx lighthouse z Chrome headless
const cmd = `npx.cmd -y lighthouse "${TARGET_URL}" --chrome-flags="--headless=new --no-sandbox" ${formFactorFlag} --output=json,html --output-path="${path.join(SCRATCH_DIR, outputPrefix)}" --only-categories=performance,accessibility,best-practices,seo --quiet`;

try {
  process.env.CHROME_PATH = CHROME_PATH;
  execSync(cmd, { stdio: 'inherit', env: process.env, timeout: 180000 });
} catch (err) {
  console.error('[Lighthouse] Błąd wykonania polecenia:', err.message);
}

// Sprawdź czy plik JSON istnieje
const jsonFile = path.join(SCRATCH_DIR, `${outputPrefix}.report.json`);
const targetJson = fs.existsSync(jsonFile) ? jsonFile : path.join(SCRATCH_DIR, `${outputPrefix}.json`);

if (!fs.existsSync(targetJson)) {
  console.error('[Lighthouse] Nie znaleziono pliku raportu:', targetJson);
  process.exit(1);
}

const rawData = JSON.parse(fs.readFileSync(targetJson, 'utf-8'));
const cats = rawData.categories;
const audits = rawData.audits;

const summary = {
  url: TARGET_URL,
  device: 'Mobile (Moto G Power / Simulated Throttling)',
  scores: {
    performance: Math.round((cats.performance?.score || 0) * 100),
    accessibility: Math.round((cats.accessibility?.score || 0) * 100),
    bestPractices: Math.round((cats['best-practices']?.score || 0) * 100),
    seo: Math.round((cats.seo?.score || 0) * 100),
  },
  metrics: {
    FCP: audits['first-contentful-paint']?.displayValue,
    LCP: audits['largest-contentful-paint']?.displayValue,
    TBT: audits['total-blocking-time']?.displayValue,
    CLS: audits['cumulative-layout-shift']?.displayValue,
    SpeedIndex: audits['speed-index']?.displayValue,
  },
  lcpElement: audits['largest-contentful-paint-element']?.details?.items?.[0]?.node?.snippet || audits['largest-contentful-paint-element']?.displayValue,
  topOpportunities: [],
  topDiagnostics: []
};

// Opportunities
for (const [id, a] of Object.entries(audits)) {
  if (a.details?.type === 'opportunity' && (a.details?.overallSavingsMs > 100 || a.details?.overallSavingsBytes > 50000)) {
    summary.topOpportunities.push({
      id,
      title: a.title,
      displayValue: a.displayValue,
      savingsMs: Math.round(a.details.overallSavingsMs || 0),
      savingsKb: Math.round((a.details.overallSavingsBytes || 0) / 1024),
    });
  }
}
summary.topOpportunities.sort((a, b) => (b.savingsMs || 0) - (a.savingsMs || 0));

// Diagnostics
const diagKeys = [
  'render-blocking-resources',
  'unused-javascript',
  'unused-css-rules',
  'modern-image-formats',
  'uses-responsive-images',
  'offscreen-images',
  'mainthread-work-breakdown',
  'bootup-time',
  'network-rtt',
  'network-server-latency',
  'third-party-summary'
];

for (const key of diagKeys) {
  const a = audits[key];
  if (a && (a.score === null || a.score < 0.9)) {
    summary.topDiagnostics.push({
      id: key,
      title: a.title,
      displayValue: a.displayValue || `${a.numericValue ? Math.round(a.numericValue) + 'ms' : ''}`,
    });
  }
}

// Zapisz zwięzły raport diagnostyczny
fs.writeFileSync(path.join(SCRATCH_DIR, 'lighthouse_summary.json'), JSON.stringify(summary, null, 2), 'utf-8');

console.log('\n=============================================');
console.log('      RAPORT LIGHTHOUSE MOBILE - KOCI PRZYJACIEL');
console.log('=============================================');
console.log(`Wyniki Główne:`);
console.log(`  ⚡ Performance:    ${summary.scores.performance}/100`);
console.log(`  ♿ Accessibility:  ${summary.scores.accessibility}/100`);
console.log(`  🛡️ Best Practices: ${summary.scores.bestPractices}/100`);
console.log(`  🔍 SEO:            ${summary.scores.seo}/100`);
console.log(`\nCore Web Vitals:`);
console.log(`  - FCP (First Contentful Paint): ${summary.metrics.FCP}`);
console.log(`  - LCP (Largest Contentful Paint): ${summary.metrics.LCP}`);
console.log(`  - TBT (Total Blocking Time):     ${summary.metrics.TBT}`);
console.log(`  - CLS (Cumulative Layout Shift):  ${summary.metrics.CLS}`);
console.log(`  - Speed Index:                   ${summary.metrics.SpeedIndex}`);
if (summary.lcpElement) {
  console.log(`  - LCP Element: ${summary.lcpElement.slice(0, 120)}`);
}
console.log(`\nGłówne Wąskie Gardła (Opportunities):`);
for (const opp of summary.topOpportunities.slice(0, 6)) {
  console.log(`  * ${opp.title}: ${opp.displayValue || ''} (${opp.savingsMs}ms / ${opp.savingsKb}KB)`);
}
console.log(`\nDiagnostyka Techniczna:`);
for (const d of summary.topDiagnostics.slice(0, 6)) {
  console.log(`  * ${d.title}: ${d.displayValue || ''}`);
}
console.log('=============================================\n');
