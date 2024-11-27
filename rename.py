import os

# file to rename all the pdf files cuz ion wna


def format_file_name(text):
    lowercase_text = text.lower()
    words = lowercase_text.split(" ")
    return "_".join(words)


# recursive 😱😱😱
def rename_files_in_folder(folder_path):
    # i have no clue how this works 😝😝
    try:
        for root, dirs, files in os.walk(folder_path):
            for file_name in files:
                old_file_path = os.path.join(root, file_name)

                file_base, file_extension = os.path.splitext(file_name)
                new_file_name = format_file_name(file_base) + file_extension

                new_file_path = os.path.join(root, new_file_name)

                os.rename(old_file_path, new_file_path)
                print(f"Renamed: {old_file_path} -> {new_file_path}")
    except Exception as e:
        print(f"Error: {e}")


folder_path = "assets/kkh-assets"  # if directory different change here pretty please
rename_files_in_folder(folder_path)
