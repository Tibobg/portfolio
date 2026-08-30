from PIL import Image
import os, json, glob

DIR = "public/photos"

files = sorted(
    glob.glob(os.path.join(DIR, "*.jpg")) +
    glob.glob(os.path.join(DIR, "*.JPG")) +
    glob.glob(os.path.join(DIR, "*.jpeg")) +
    glob.glob(os.path.join(DIR, "*.JPEG")) +
    glob.glob(os.path.join(DIR, "*.png")) +
    glob.glob(os.path.join(DIR, "*.PNG"))
)

new_manifest = []
for path in files:
    fname = os.path.basename(path)
    base = os.path.splitext(fname)[0]
    out_name = base + ".webp"
    out_path = os.path.join(DIR, out_name)
    
    img = Image.open(path)
    if img.mode in ("RGBA", "P"):
        img = img.convert("RGB")
    
    if img.width > 800:
        ratio = 800 / img.width
        new_h = int(img.height * ratio)
        img = img.resize((800, new_h), Image.LANCZOS)
    
    img.save(out_path, "webp", quality=80, method=6)
    new_manifest.append(out_name)
    print(f"Converted: {fname} -> {out_name} ({img.width}x{img.height})")

manifest_path = os.path.join(DIR, "manifest.json")
with open(manifest_path, "w", encoding="utf-8") as f:
    json.dump(new_manifest, f, indent=2)

print(f"\nDone! {len(new_manifest)} images converted. manifest.json updated.")