export const loadWords = async (language: string, level: string): Promise<string[]> => {
  try {
    const response = await fetch(`/public/assets/words/${language}_${level}.txt`);
    
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const text = await response.text();
    const words = text.split('\n').map(word => word.trim()).filter(word => !!word);
    console.log('Loaded words:', words);
    return words;
  } catch (error) {
    console.error('Error loading words:', error);
    return [];
  }
};
