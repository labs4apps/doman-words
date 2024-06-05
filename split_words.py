import csv
import re

def podziel_plik_wejsciowy(nazwa_pliku_wejsciowego):
    zbiory_slow = {
        4: [],
        6: [],
        8: [],
        10: []
    }

    regex = re.compile(r'^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+$')  # Regex do filtrowania słów

    with open(nazwa_pliku_wejsciowego, 'r', encoding='utf-8') as plik:
        for linia in plik:
            slowo = linia.strip()
            if regex.match(slowo):  # Sprawdzenie, czy słowo zawiera tylko litery
                if len(slowo) <= 4:
                    zbiory_slow[4].append(slowo)
                elif len(slowo) <= 6:
                    zbiory_slow[6].append(slowo)
                elif len(slowo) <= 8:
                    zbiory_slow[8].append(slowo)
                else:
                    zbiory_slow[10].append(slowo)

    for klucz, slowa in zbiory_slow.items():
        nazwa_pliku_wyj = f'datasets/en_{klucz}letter.txt'
        with open(nazwa_pliku_wyj, 'w', newline='', encoding='utf-8') as plik_wyj:
            writer = csv.writer(plik_wyj)
            for slowo in slowa:
                writer.writerow([slowo])

# Wywołaj funkcję z nazwą twojego dużego pliku tekstowego
podziel_plik_wejsciowy('./words.txt')
