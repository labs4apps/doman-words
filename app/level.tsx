// app/screens/GameScreen.tsx

import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

// Przykładowy słownik słów
const words = {
  '4Letter': ['word', 'test', 'play'],
  '6Letter': ['simple', 'planet', 'school'],
  '8Letter': ['elephant', 'building', 'computer'],
  '10PlusLetter': ['environment', 'transformation', 'responsibility']
};

export default function level() {
  const route = useRoute();
  const { level } = route.params;

  // Wybierz słowa na podstawie poziomu
  const selectedWords = words[level];

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Selected Level: {level}</ThemedText>
      <View style={styles.wordsContainer}>
        {selectedWords.map((word, index) => (
          <ThemedText key={index} style={styles.word}>{word}</ThemedText>
        ))}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  wordsContainer: {
    marginTop: 20,
  },
  word: {
    fontSize: 18,
    marginVertical: 5,
  },
});
