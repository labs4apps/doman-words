// app/screens/Settings.tsx
import React from 'react';
import { View, StyleSheet, Switch, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Picker } from '@react-native-picker/picker';
import '../src/i18n';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useSettings } from '@/providers/settingsProvider';

export default function Settings() {
  const { t, i18n } = useTranslation();
  const { language, setLanguage, autoChange, setAutoChange, interval, setInterval } = useSettings();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    setLanguage(language);
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <ThemedText style={styles.label}>{t('select_language')}</ThemedText>
        <Picker
          selectedValue={language}
          onValueChange={(itemValue) => changeLanguage(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="English" value="en" />
          <Picker.Item label="Polski" value="pl" />
          {/* Dodaj inne języki tutaj */}
        </Picker>

        <View style={styles.switchContainer}>
          <ThemedText style={styles.label}>{t('auto_change_words')}</ThemedText>
          <Switch value={autoChange} onValueChange={setAutoChange} />
        </View>

        {autoChange && (
          <View style={styles.intervalContainer}>
            <ThemedText style={styles.label}>{t('change_interval_seconds')}</ThemedText>
            <Picker
              selectedValue={interval}
              onValueChange={(itemValue) => setInterval(itemValue)}
              style={styles.picker}
            >
              {[5, 10, 15, 20, 30].map((value) => (
                <Picker.Item key={value} label={`${value}`} value={value} />
              ))}
            </Picker>
          </View>
        )}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  content: {
    flex: 1,
  },
  label: {
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  intervalContainer: {
    marginVertical: 10,
  },
});
