// Dev helper: turns `key`: [...] entries in a translation part into valid [`key`]: [...] syntax.
import fs from 'node:fs';

const B = String.fromCharCode(96); // backtick
const E = String.fromCharCode(92, 92); // two backslashes = an escaped backslash inside a RegExp source
const re = new RegExp('^  (' + B + '(?:[^' + B + E + ']|' + E + '.)*' + B + '):', 'gm');

for (const f of process.argv.slice(2)) {
  const s = fs.readFileSync(f, 'utf8').replace(re, '  [$1]:');
  fs.writeFileSync(f, s);
}
