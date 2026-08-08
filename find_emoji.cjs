const fs = require('fs');
const path = require('path');

function findEmojis(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const fp = path.join(dir, e.name);
    if (e.isDirectory()) {
      findEmojis(fp);
    } else if (e.name.endsWith('.jsx')) {
      const c = fs.readFileSync(fp, 'utf8');
      const lines = c.split('\n');
      lines.forEach((l, i) => {
        for (const ch of l) {
          const cp = ch.codePointAt(0);
          if (cp > 0x2700 || ch === '\u2728') {
            console.log(fp + ':' + (i+1) + ': emoji U+' + cp.toString(16).toUpperCase() + ' ' + ch + ' | ' + l.trim().slice(0, 120));
            break;
          }
        }
      });
    }
  }
}
findEmojis('src');
