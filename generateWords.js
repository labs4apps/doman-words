const https = require('https');
const fs = require('fs');
const path = require('path');

const sources = {
  en: 'https://raw.githubusercontent.com/first20hours/google-10000-english/master/20k.txt',
  pl: 'https://raw.githubusercontent.com/hermitdave/FrequencyWords/master/content/2018/pl/pl_50k.txt'
};

const categories = {
  '4': word => word.length <= 4,
  '6': word => word.length >= 5 && word.length <= 6,
  '8': word => word.length >= 7 && word.length <= 8,
  '10': word => word.length >= 9
};

const outputDir = path.join(__dirname, 'output');

// Pobieranie pliku
function fetchWords(url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      let data = '';
      res.on('data', chunk => (data += chunk));
      res.on('end', () => resolve(data));
      res.on('error', err => reject(err));
    });
  });
}

// Zapisywanie słów do pliku TXT i JSON
function saveWords(language, category, words) {
  const baseName = `${language}_${category}letter`;
  const txtPath = path.join(outputDir, `${baseName}.txt`);
  const jsonPath = path.join(outputDir, `${baseName}.json`);

  fs.writeFileSync(txtPath, words.join('\n'), 'utf-8');
  fs.writeFileSync(jsonPath, JSON.stringify(words, null, 2), 'utf-8');

  console.log(`✅ Zapisano ${words.length} słów do ${baseName}.txt i ${baseName}.json`);
}

// Główna funkcja
async function generate(language = 'en', limit = 5000) {
  try {
    if (!sources[language]) {
      console.error('❌ Nieobsługiwany język:', language);
      process.exit(1);
    }

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    console.log(`📥 Pobieram słowa dla języka: ${language}...`);
    const rawData = await fetchWords(sources[language]);
    let words = rawData
      .split(/\r?\n/)
      .map(line => line.split(' ')[0].trim())
      .filter(word => /^[a-ząćęłńóśźż]+$/i.test(word))
      .slice(0, limit);

    console.log(`🔎 Przetwarzam ${words.length} słów...`);

    const uniqueWords = Array.from(new Set(words));

    for (const [category, condition] of Object.entries(categories)) {
      const filtered = uniqueWords.filter(condition);
      saveWords(language, category, filtered);
    }

    console.log('🎉 Gotowe!');
  } catch (err) {
    console.error('❌ Błąd:', err);
  }
}

// Parsowanie argumentów
const args = process.argv.slice(2);
const langArg = args.find(arg => arg.startsWith('--language='));
const limitArg = args.find(arg => arg.startsWith('--limit='));

const language = langArg ? langArg.split('=')[1] : 'en';
const limit = limitArg ? parseInt(limitArg.split('=')[1], 10) : 5000;

generate(language, limit);
