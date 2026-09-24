// Cross-platform replacement for `cp -r assets/* public/ 2>/dev/null || true`
// Copies the contents of assets/ into public/ (merging, overwriting), skipping dotfiles.
const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '..', 'assets');
const dest = path.join(__dirname, '..', 'public');

try {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue;
    fs.cpSync(path.join(src, entry.name), path.join(dest, entry.name), {
      recursive: true,
      force: true,
    });
  }
} catch (err) {
  // assets/ may not exist; match the original `|| true` behavior
}
