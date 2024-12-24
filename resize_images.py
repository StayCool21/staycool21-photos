# Option 1: We use this script to place the thumbnails in /thumbs
# Option 2: We remove the /thumbs directory and just use full-sized images from /fulls

import os
from PIL import Image
from PIL.ExifTags import TAGS

# Define the directory
thumbs_dir = 'images/thumbs'
thumb_size = (2048, 1024)  # Define the size for thumbnails

# Function to resize images and preserve EXIF data
def resize_image(input_path, output_path, size):
    with Image.open(input_path) as img:
        exif = img.info.get('exif')
        img.thumbnail(size, Image.LANCZOS)
        img.save(output_path, "JPEG", exif=exif)

# Iterate over images in the thumbs directory
for root, dirs, files in os.walk(thumbs_dir):
    for file in files:
        if file.lower().endswith(('.jpg', '.jpeg', '.png')):
            thumb_image_path = os.path.join(root, file)
            output_path = os.path.splitext(thumb_image_path)[0] + '.jpg'

            # Resize and save the image
            resize_image(thumb_image_path, output_path, thumb_size)
            print(f'Resized {thumb_image_path} to {output_path}')

print('All images have been resized.')