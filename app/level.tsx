import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, useWindowDimensions, useColorScheme } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { ThemedView } from '@/components/ThemedView';
import { loadWords } from '@/src/utils/dataLoader';
import { useSettings } from '@/providers/settingsProvider';

export default function Level() {
  const route = useRoute();
  const { level } = route.params;
  const { language, autoChange, interval } = useSettings();
  const [words, setWords] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { width, height } = useWindowDimensions(); // Get the width and height of the screen
  const colorScheme = useColorScheme(); // Get the current color scheme

  useEffect(() => {
    const loadData = async () => {
      const loadedWords = await loadWords(language, level);
      setWords(loadedWords);
      setCurrentIndex(Math.floor(Math.random() * loadedWords.length)); // Set initial index to a random word
    };
    loadData();
  }, [language, level]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (autoChange) {
      timer = setInterval(() => {
        setCurrentIndex(Math.floor(Math.random() * words.length)); // Set index to a random word
      }, interval * 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [autoChange, interval, words]);

  const handleNextWord = () => {
    setCurrentIndex(Math.floor(Math.random() * words.length)); // Set index to a random word
  };

  const getDynamicFontSize = (word: string) => {
    // More aggressive formula to ensure larger font size
    const baseFontSize = (width) / word.length; 
    return Math.min(baseFontSize); 
  };

  const textColor = colorScheme === 'dark' ? 'white' : 'black'; // Determine text color based on color scheme

  return (
    <TouchableOpacity style={styles.container} onPress={handleNextWord} disabled={autoChange}>
      <ThemedView style={styles.wordContainer}>
        {words.length > 0 && (
          <Text style={[styles.wordText, { fontSize: getDynamicFontSize(words[currentIndex]), color: textColor }]}>
            {words[currentIndex]}
          </Text>
        )}
      </ThemedView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wordContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  wordText: {
    textAlign: 'center',
  },
});
