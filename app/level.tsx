// app/screens/level.tsx
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { ThemedView } from '@/components/ThemedView';
import { loadWords } from '@/src/utils/dataLoader';
import { useSettings } from '@/hooks/useSettings'; // assuming you have a custom hook for accessing settings

export default function Level() {
  const route = useRoute();
  const { level } = route.params;
  const { language, autoChange, interval } = useSettings();
  const [words, setWords] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      const loadedWords = await loadWords(language, level);
      setWords(loadedWords);
    };
    loadData();
  }, [language, level]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (autoChange) {
      timer = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
      }, interval * 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [autoChange, interval, words]);

  const handleNextWord = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleNextWord} disabled={autoChange}>
      <ThemedView style={styles.wordContainer}>
        <Text style={styles.wordText}>{words[currentIndex]}</Text>
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
    fontSize: 48,
    textAlign: 'center',
  },
});
