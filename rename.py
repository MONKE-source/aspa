import os
import re

# file to rename all the pdf files cuz ion wna


def format_file_name(text):
    lowercase_text = text.lower()
    words = re.split(r"[_+ ]", lowercase_text)
    return " ".join(words)


def rename_files_in_folder(folder_path):
    # i have no clue how this works 😝😝
    try:
        for root, dirs, files in os.walk(folder_path, topdown=False):
            # Rename files
            for file_name in files:
                old_file_path = os.path.join(root, file_name)

                file_base, file_extension = os.path.splitext(file_name)
                new_file_name = format_file_name(file_base) + file_extension

                new_file_path = os.path.join(root, new_file_name)

                os.rename(old_file_path, new_file_path)
                print(f"Renamed: {old_file_path} -> {new_file_path}")

            # Rename directories
            for dir_name in dirs:
                old_dir_path = os.path.join(root, dir_name)
                new_dir_name = format_file_name(dir_name)
                new_dir_path = os.path.join(root, new_dir_name)

                os.rename(old_dir_path, new_dir_path)
                print(f"Renamed: {old_dir_path} -> {new_dir_path}")

    except Exception as e:
        print(f"Error: {e}")


folder_path = "assets/kkh-assets"  # if directory different change here
rename_files_in_folder(folder_path)
