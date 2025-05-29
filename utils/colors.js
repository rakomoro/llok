
const chalk = require('chalk');
const gradient = require("gradient-string");

// قائمة الألوان المتاحة
const themes = [
  'blue',
  'dream2',
  'dream',
  'fiery',
  'rainbow',
  'pastel',
  'cristal',
  'red',
  'aqua',
  'pink',
  'retro',
  'sunlight',
  'teen',
  'summer',
  'flower',
  'ghost',
  'hacker'
];

// اختيار لون عشوائي واحد عند تحميل الملف
const selectedTheme = themes[Math.floor(Math.random() * themes.length)];

// إعداد الألوان بناءً على اللون المختار
let co;
let error;
let cra;

if (selectedTheme.toLowerCase() === 'blue') {
  co = gradient([{ color: "#1affa3", pos: 0.2 }, { color: "cyan", pos: 0.4 }, { color: "pink", pos: 0.6 }, { color: "cyan", pos: 0.8 }, { color: '#1affa3', pos: 1 }]);
  error = chalk.red.bold;
} else if (selectedTheme == "dream2") {
  cra = gradient("blue", "pink");
  co = gradient("#a200ff", "#21b5ff", "#a200ff");
} else if (selectedTheme.toLowerCase() === 'dream') {
  co = gradient([{ color: "blue", pos: 0.2 }, { color: "pink", pos: 0.3 }, { color: "gold", pos: 0.6 }, { color: "pink", pos: 0.8 }, { color: "blue", pos: 1 }]);
  error = chalk.red.bold;
} else if (selectedTheme.toLowerCase() === 'fiery') {
  co = gradient("#fc2803", "#fc6f03", "#fcba03");
  error = chalk.red.bold;
} else if (selectedTheme.toLowerCase() === 'rainbow') {
  co = gradient.rainbow;
  error = chalk.red.bold;
} else if (selectedTheme.toLowerCase() === 'pastel') {
  co = gradient.pastel;
  error = chalk.red.bold;
} else if (selectedTheme.toLowerCase() === 'cristal') {
  co = gradient.cristal;
  error = chalk.red.bold;
} else if (selectedTheme.toLowerCase() === 'red') {
  co = gradient("red", "orange");
  error = chalk.red.bold;
} else if (selectedTheme.toLowerCase() === 'aqua') {
  co = gradient("#0030ff", "#4e6cf2");
  error = chalk.blueBright;
} else if (selectedTheme.toLowerCase() === 'pink') {
  cra = gradient('purple', 'pink');
  co = gradient("#d94fff", "purple");
} else if (selectedTheme.toLowerCase() === 'retro') {
  cra = gradient("#d94fff", "purple");
  co = gradient.retro;
} else if (selectedTheme.toLowerCase() === 'sunlight') {
  cra = gradient("#f5bd31", "#f5e131");
  co = gradient("orange", "#ffff00", "#ffe600");
} else if (selectedTheme.toLowerCase() === 'teen') {
  cra = gradient("#00a9c7", "#853858", "#853858", "#00a9c7");
  co = gradient.teen;
} else if (selectedTheme.toLowerCase() === 'summer') {
  cra = gradient("#fcff4d", "#4de1ff");
  co = gradient.summer;
} else if (selectedTheme.toLowerCase() === 'flower') {
  cra = gradient("blue", "purple", "yellow", "#81ff6e");
  co = gradient.pastel;
} else if (selectedTheme.toLowerCase() === 'ghost') {
  cra = gradient("#0a658a", "#0a7f8a", "#0db5aa");
  co = gradient.mind;
} else if (selectedTheme === 'hacker') {
  cra = chalk.hex('#4be813');
  co = gradient('#47a127', '#0eed19', '#27f231');
} else {
  co = gradient("#243aff", "#4687f0", "#5800d4");
  error = chalk.red.bold;
}

module.exports = {
  selectedTheme,
  co,
  error,
  cra
};
