const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const PHOTOS_DIR = path.join(__dirname, "../public/photos");
const manifestPath = path.join(PHOTOS_DIR, "manifest.json");

async function convert() {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
  const newManifest = [];

  for (const file of manifest) {
    const inputPath = path.join(PHOTOS_DIR, file);
    if (!fs.existsSync(inputPath)) {
      console.log(`Skip (not found): ${file}`);
      continue;
    }
    const baseName = path.basename(file, path.extname(file));
    const outputName = `${baseName}.webp`;
    const outputPath = path.join(PHOTOS_DIR, outputName);

    await sharp(inputPath)
      .resize(800, null, { withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(outputPath);

    newManifest.push(outputName);
    console.log(`Converted: ${file} -> ${outputName}`);
  }

  fs.writeFileSync(manifestPath, JSON.stringify(newManifest, null, 2));
  console.log("Done! manifest.json updated.");
}

convert().catch(console.error);