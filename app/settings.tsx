import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Picker } from '@react-native-picker/picker';
import '../src/i18n';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function Settings() {
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    setSelectedLanguage(language);
  };

  return (
    <ThemedView style={styles.container}>

      <View style={styles.content}>
        <ThemedText style={styles.label}>{t('select_language')}</ThemedText>
        <Picker
          selectedValue={selectedLanguage}
          onValueChange={(itemValue) => changeLanguage(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="English" value="en" />
          <Picker.Item label="Polski" value="pl" />
          {/* Dodaj inne języki tutaj */}
        </Picker>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 20,
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
});
