import os
import json

input_folder = './public/assets/words'
output_folder = './public/assets/words'

def convert_txt_to_json(input_file, output_file):
    with open(input_file, 'r', encoding='utf-8') as file:
        words = [line.strip() for line in file if line.strip()]

    with open(output_file, 'w', encoding='utf-8') as file:
        json.dump(words, file, ensure_ascii=False, indent=2)

for filename in os.listdir(input_folder):
    if filename.endswith('.txt'):
        input_file = os.path.join(input_folder, filename)
        output_file = os.path.join(output_folder, filename.replace('.txt', '.json'))
        convert_txt_to_json(input_file, output_file)
        print(f'Converted {input_file} to {output_file}')
