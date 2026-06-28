const fs = require('fs');
let text = fs.readFileSync('src/App.jsx', 'utf8');

// Replace "USD" with "INR"
text = text.replace(/in USD/g, 'in INR');

// Replace "$" inside JSX UI with "₹"
// Budget input prefix
text = text.replace(/>\$/g, '>₹');

// Budget summary chips: `\$\${form.budget}` to `₹\${form.budget}`
text = text.replace(/`\$\$\{form.budget\}`/g, '`₹${form.budget}`');

// AI prompt budget
text = text.replace(/- Budget: \$\$\{planData.budget\}/g, '- Budget: ₹${planData.budget}');

// AI prompt priceRange hint
text = text.replace(/"\$10-20 per person"/g, '"₹500-1000 per person"');

// Header and Hero budget values: \${planData.budget} wait, in JSX it's `\${planData.budget}` if it was a template literal, but it's just `$\${planData.budget}` or similar? Let's be careful.
text = text.replace(/\$\$\{planData.budget\}/g, '₹${planData.budget}');

// Also replace `>$\${planData.budget}` or `>$\${v}`
text = text.replace(/>\$\$\{v\}/g, '>₹${v}');
text = text.replace(/>\$\$\{planData.budget\}/g, '>₹${planData.budget}');

// The budget chips mapping string: `>\${b}</button>` -> `>₹{b}</button>`
text = text.replace(/>\$\{b\}<\/button>/g, '>₹{b}</button>');

// If there's any remaining `$` that's not part of `${`, replace it, but it's safer to just run this first.
fs.writeFileSync('src/App.jsx', text);
console.log('Replaced currency.');
