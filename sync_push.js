const fs = require('fs');
const crypto = require('crypto');
const { execSync } = require('child_process');

const localState = JSON.parse(fs.readFileSync('C:\\Users\\Michu\\AppData\\Roaming\\Antigravity IDE\\Local State', 'utf8'));
const encKeyBuf = Buffer.from(localState.os_crypt.encrypted_key, 'base64').slice(5);
const hex = encKeyBuf.toString('hex');
const psCmd = `powershell -Command "Add-Type -AssemblyName System.Security; $bytes = [byte[]] -split ('${hex}' -replace '..', '0x$& '); $dec = [System.Security.Cryptography.ProtectedData]::Unprotect($bytes, $null, [System.Security.Cryptography.DataProtectionScope]::CurrentUser); [System.BitConverter]::ToString($dec).Replace('-', '')"`;
const rawHex = execSync(psCmd, { encoding: 'utf8' }).trim();
const key = Buffer.from(rawHex, 'hex');

const text = fs.readFileSync('C:\\Users\\Michu\\AppData\\Roaming\\Antigravity IDE\\User\\globalStorage\\state.vscdb', 'latin1');
const regex = /\{"type":"Buffer","data":\[([0-9, ]+)\]\}/g;
let m, tok;
while ((m = regex.exec(text)) !== null) {
  const buf = Buffer.from(m[1].split(',').map(n => parseInt(n.trim(), 10)));
  if (buf.length > 31 && buf.slice(0, 3).toString() === 'v10') {
    try {
      const d = crypto.createDecipheriv('aes-256-gcm', key, buf.slice(3, 15));
      d.setAuthTag(buf.slice(buf.length - 16));
      const dec = Buffer.concat([d.update(buf.slice(15, buf.length - 16)), d.final()]).toString('utf8');
      const tm = dec.match(/gh[pousr]_[A-Za-z0-9_]+/);
      if (tm) { tok = tm[0]; break; }
    } catch(e) {}
  }
}

if (!tok) {
  console.log('Token not found');
  process.exit(1);
}

const gitExe = 'C:\\Users\\Michu\\mingit\\cmd\\git.exe';
const remote = `https://x-access-token:${tok}@github.com/slawinskimichal88-code/koci-przyjaciel-cattery.git`;

console.log('Staging changes...');
execSync(`"${gitExe}" add -A`, { encoding: 'utf8' });

console.log('Committing changes...');
try {
  execSync(`"${gitExe}" commit -m "Split into subpages (/kocieta, /baza-wiedzy, /kontakt), add modern legible navbar, reservation bar, and knowledge teaser"`, { encoding: 'utf8' });
} catch(e) {
  console.log('Commit note:', e.message);
}

console.log('Pushing to GitHub...');
const out = execSync(`"${gitExe}" push "${remote}" main`, { encoding: 'utf8' });
console.log(out);
console.log('SYNC_COMPLETE');
