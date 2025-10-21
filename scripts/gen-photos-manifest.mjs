#!/usr/bin/env node
/**
 * Génère public/photos/manifest.json à partir des fichiers présents
 * dans public/photos (y compris sous-dossiers).
 *
 * Usage :
 *   node scripts/gen-photos-manifest.mjs            // tri par nom (défaut)
 *   node scripts/gen-photos-manifest.mjs --sort=mtime  // tri par date récente
 *   node scripts/gen-photos-manifest.mjs --limit=100   // limite le nombre
 */

import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";

const PHOTOS_DIR = path.resolve("public", "photos");
const MANIFEST_PATH = path.join(PHOTOS_DIR, "manifest.json");
const exts = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"]);

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v = true] = a.replace(/^--/, "").split("=");
    return [k, v];
  })
);
const sortMode = args.sort === "mtime" ? "mtime" : "name";
const limit = Number.isFinite(+args.limit) ? +args.limit : null;

/** Walk récursif */
async function walk(dir) {
  const out = [];
  const entries = await fsp.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    if (e.name.startsWith(".")) continue; // ignore .DS_Store & co
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      out.push(...(await walk(p)));
    } else {
      const ext = path.extname(e.name).toLowerCase();
      if (!exts.has(ext)) continue;
      // chemin relatif depuis public/photos, en style POSIX
      const rel = path.relative(PHOTOS_DIR, p).split(path.sep).join("/");
      out.push(rel);
    }
  }
  return out;
}

async function main() {
  // sécurité : vérifier dossier
  try {
    await fsp.access(PHOTOS_DIR, fs.constants.R_OK);
  } catch {
    console.error("❌ Dossier introuvable :", PHOTOS_DIR);
    process.exit(1);
  }

  let files = await walk(PHOTOS_DIR);
  // Dédup + tri
  files = Array.from(new Set(files));

  if (sortMode === "mtime") {
    const stats = new Map();
    await Promise.all(
      files.map(async (rel) => {
        const abs = path.join(PHOTOS_DIR, rel);
        const st = await fsp.stat(abs);
        stats.set(rel, st.mtimeMs);
      })
    );
    files.sort((a, b) => (stats.get(b) ?? 0) - (stats.get(a) ?? 0)); // récents d’abord
  } else {
    files.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }));
  }

  if (limit && limit > 0) files = files.slice(0, limit);

  const json = JSON.stringify(files, null, 2) + "\n";
  await fsp.writeFile(MANIFEST_PATH, json, "utf8");

  console.log(`✅ manifest.json mis à jour (${files.length} entrées) → ${MANIFEST_PATH}`);
  console.log(`   Exemple: ${files[0] ? `/photos/${files[0]}` : "(aucune image)"}`);
}

main().catch((err) => {
  console.error("❌ Erreur:", err);
  process.exit(1);
});
