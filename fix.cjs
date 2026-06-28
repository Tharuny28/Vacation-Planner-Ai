const fs = require('fs');
let text = fs.readFileSync('src/App.jsx', 'utf8');
text = text.replace(/\\`/g, '`');
text = text.replace(/\\\$/g, '$');
fs.writeFileSync('src/App.jsx', text);
console.log('Fixed file');
