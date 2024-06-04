import * as Papa from 'papaparse';

export const loadWords = async (language: string, level: string) => {
  try {
    const response = await fetch(`/public/assets/words/${language}/${level}.csv`);
    const csvText = await response.text();
    const { data } = Papa.parse(csvText, { header: true });
    return data.map((row: any) => row.word);
  } catch (error) {
    console.error('Error loading words:', error);
    return [];
  }
};
