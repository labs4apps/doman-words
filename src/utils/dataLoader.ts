export const loadWords = async (language: string, level: string): Promise<string[]> => {
  try {
    const response = await fetch(`/public/assets/words/${language}_${level}.txt`);
    
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const text = await response.text();
    const words = text.split('\n').map(word => word.trim()).filter(word => !!word);
    return words;
  } catch (error) {
    const fileName = `${language}_${level}`
    let words;
    if(fileName == 'en_4letter'){
      words = require('../../public/assets/words/en_4letter.json')
    } else if(fileName == 'en_6letter') {
      words = require('../../public/assets/words/en_6letter.json')
    } else if(fileName == 'en_8letter') {
      words = require('../../public/assets/words/en_8letter.json')
    } else if(fileName == 'en_10letter') {
      words = require('../../public/assets/words/en_10letter.json')
    } else if(fileName == 'pl_4letter') {
      words = require('../../public/assets/words/pl_4letter.json')
    } else if(fileName == 'pl_6letter') {
      words = require('../../public/assets/words/pl_6letter.json')
    } else if(fileName == 'pl_8letter') {
      words = require('../../public/assets/words/pl_8letter.json')
    } else if(fileName == 'pl_10letter') {
      words = require('../../public/assets/words/pl_10letter.json')
    }
    // console.error('Error loading words:', error);
    return words;
  }
};
