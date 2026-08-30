from PIL import Image
import os, glob, json

DIR = "public/photos"

for path in glob.glob(os.path.join(DIR, "*.jpg")) + glob.glob(os.path.join(DIR, "*.JPG")):
    img = Image.open(path)
    
    # Applique l'orientation EXIF
    if hasattr(img, '_getexif') and img._getexif():
        exif = img._getexif()
        orientation = exif.get(274)
        if orientation == 3: img = img.rotate(180, expand=True)
        elif orientation == 6: img = img.rotate(270, expand=True)
        elif orientation == 8: img = img.rotate(90, expand=True)
    
    base = os.path.splitext(os.path.basename(path))[0]
    out = os.path.join(DIR, base + ".webp")
    
    if img.width > 800:
        ratio = 800 / img.width
        img = img.resize((800, int(img.height * ratio)), Image.LANCZOS)
    
    img.save(out, "webp", quality=80, method=6)
    print(f"Converted: {os.path.basename(path)}")