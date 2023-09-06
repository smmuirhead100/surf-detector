import tarfile
import gzip

def decompressFile(file_name, out_file):
    # Extract data from a tarball archive
    def extract_tarball(file_path, destination_folder):
        with tarfile.open(file_path, 'r') as tar:
            tar.extractall(destination_folder)

    # Extract data from a gzip-compressed file
    def extract_gzip(file_path, destination_file):
        with gzip.open(file_path, 'rb') as gz:
            with open(destination_file, 'wb') as out_file:
                out_file.write(gz.read())

    # Example usage
    extract_tarball(file_name, out_file)