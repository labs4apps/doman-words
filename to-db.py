import os
import sqlite3
import pandas as pd

# Ścieżka do folderu z plikami tekstowymi
input_folder = './public/assets/words/'

# Ścieżka do folderu, w którym będą zapisywane pliki SQLite
output_folder = './assets/words/'

# Upewnij się, że folder docelowy istnieje
os.makedirs(output_folder, exist_ok=True)

# Funkcja do przetwarzania pojedynczego pliku tekstowego na plik SQLite
def process_file(file_name):
    # Nazwa pliku tekstowego
    input_file = os.path.join(input_folder, file_name)

    # Nazwa pliku bazy danych SQLite (zmiana rozszerzenia na .db)
    sqlite_file = os.path.join(output_folder, os.path.splitext(file_name)[0] + '.db')

    # Odczytaj plik tekstowy
    with open(input_file, 'r', encoding='utf-8') as file:
        words = file.read().splitlines()

    # Utwórz DataFrame z listy słów
    df = pd.DataFrame(words, columns=['word'])

    # Połącz się z bazą danych SQLite (utwórz plik, jeśli nie istnieje)
    conn = sqlite3.connect(sqlite_file)
    cursor = conn.cursor()

    # Utwórz tabelę 'words' w bazie danych SQLite
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS words (
            id INTEGER PRIMARY KEY,
            word TEXT NOT NULL
        )
    ''')

    # Wstaw dane z DataFrame do tabeli 'words'
    df.to_sql('words', conn, if_exists='append', index=False)

    # Zatwierdź zmiany i zamknij połączenie
    conn.commit()
    conn.close()

    print(f"Plik bazy danych SQLite '{sqlite_file}' został utworzony pomyślnie.")

# Iteruj przez wszystkie pliki w folderze
for file_name in os.listdir(input_folder):
    if file_name.endswith('.txt'):  # Przetwarzaj tylko pliki tekstowe
        process_file(file_name)
