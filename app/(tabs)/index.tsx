// app/(tabs)/index.tsx

import React from 'react';
import { View, StyleSheet, TouchableOpacity, Button, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import '../../src/i18n'; // Upewnij się, że ścieżka jest poprawna
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { router } from 'expo-router';

export default function HomeScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const colorScheme = useColorScheme();

  const goToSettings = () => {
    navigation.navigate('settings');
  };
  const navigateToLevel = (level: string) => {
    navigation.navigate('level', { level });
  };
  const LevelButton = ({ title, level }: { title: string, level: string }) => (
    <TouchableOpacity style={styles.levelButton} onPress={() => navigateToLevel(level)}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft} />
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={goToSettings} style={styles.iconButton}>
            <Ionicons name="settings-outline" size={24} color={Colors[colorScheme ?? 'light'].tint} />
          </TouchableOpacity>
        </View>
      </View>
      <ThemedView style={styles.buttonContainer}>
        <LevelButton title={t('4-letter')} level='4letter' />
        <LevelButton title={t('6-letter')}  level='6letter' />
        <LevelButton title={t('8-letter')}  level='8letter' />
        <LevelButton title={t('10-letter')}  level='10letter' />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    paddingTop: 20, // optional: to give some top space for status bar
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  iconButton: {
    padding: 10,
  },
  titleContainer: {
    padding: 20,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  levelButton: {
    backgroundColor: Colors.light.tint,
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
