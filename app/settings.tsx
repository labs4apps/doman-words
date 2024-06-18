import React, { useState } from 'react';
import { View, StyleSheet, Switch, Text, Platform, Button, ActionSheetIOS, useColorScheme } from 'react-native';
import { useTranslation } from 'react-i18next';
import '../src/i18n';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useSettings } from '@/providers/settingsProvider';
import { Picker } from '@react-native-picker/picker';
import Modal from 'react-native-modal';

export default function Settings() {
  const { t, i18n } = useTranslation();
  const { language, setLanguage, autoChange, setAutoChange, interval, setInterval } = useSettings();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const [isLanguagePickerVisible, setLanguagePickerVisible] = useState(false);
  const [isIntervalPickerVisible, setIntervalPickerVisible] = useState(false);

  const languages = [
    { label: "English", value: "en" },
    { label: "Polski", value: "pl" },
    // Dodaj inne języki tutaj
  ];

  const intervals = [5, 10, 15, 20, 30];

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    setLanguage(language);
  };

  const showLanguagePicker = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: languages.map(lang => lang.label),
          cancelButtonIndex: languages.length,
        },
        (buttonIndex) => {
          if (buttonIndex < languages.length) {
            changeLanguage(languages[buttonIndex].value);
          }
        }
      );
    } else {
      setLanguagePickerVisible(true);
    }
  };

  const showIntervalPicker = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: intervals.map(interval => interval.toString()),
          cancelButtonIndex: intervals.length,
        },
        (buttonIndex) => {
          if (buttonIndex < intervals.length) {
            setInterval(intervals[buttonIndex]);
          }
        }
      );
    } else {
      setIntervalPickerVisible(true);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <ThemedText style={styles.label}>{t('select_language')}</ThemedText>
        <Button title={languages.find(lang => lang.value === language)?.label || t('select_language')} onPress={showLanguagePicker} />
        <Modal isVisible={isLanguagePickerVisible}>
          <View style={styles.modalContent}>
            <Picker
              selectedValue={language}
              onValueChange={(itemValue) => {
                changeLanguage(itemValue);
                setLanguagePickerVisible(false);
              }}
              style={isDarkMode ? styles.pickerDark : styles.pickerLight}
            >
              {languages.map(lang => (
                <Picker.Item key={lang.value} label={lang.label} value={lang.value} />
              ))}
            </Picker>
            <Button title={t('close')} onPress={() => setLanguagePickerVisible(false)} />
          </View>
        </Modal>

        <View style={styles.switchContainer}>
          <ThemedText style={styles.label}>{t('auto_change_words')}</ThemedText>
          <Switch
            value={autoChange}
            onValueChange={setAutoChange}
          />
        </View>

        {autoChange && (
          <View>
            <ThemedText style={styles.label}>{t('change_interval_seconds')}</ThemedText>
            <Button title={interval.toString()} onPress={showIntervalPicker} />
            <Modal isVisible={isIntervalPickerVisible}>
              <View style={styles.modalContent}>
                <Picker
                  selectedValue={interval}
                  onValueChange={(itemValue) => {
                    setInterval(itemValue);
                    setIntervalPickerVisible(false);
                  }}
                  style={isDarkMode ? styles.pickerDark : styles.pickerLight}
                >
                  {intervals.map(value => (
                    <Picker.Item key={value} label={value.toString()} value={value} />
                  ))}
                </Picker>
                <Button title={t('close')} onPress={() => setIntervalPickerVisible(false)} />
              </View>
            </Modal>
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
  pickerLight: {
    backgroundColor: 'white',
    color: 'black',
  },
  pickerDark: {
    backgroundColor: '#333',
    color: 'white',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
});
