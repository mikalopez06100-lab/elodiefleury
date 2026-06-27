import sharp from "sharp";
import path from "path";

const source = path.join(
  "C:",
  "Users",
  "ppmpc",
  ".cursor",
  "projects",
  "c-Users-ppmpc-Elodie-Fleury",
  "assets",
  "c__Users_ppmpc_AppData_Roaming_Cursor_User_workspaceStorage_79f0b6f4821e25b7817d1265d7a47bfe_images_copy_C62F8FAC-1543-4858-B766-C1BE5CCA26A2-b04a7f35-be1c-4dbd-8c96-fe6a7f2f6957.png"
);

const outDir = path.join(
  "c:",
  "Users",
  "ppmpc",
  "Elodie Fleury",
  "elodie-cote-azur",
  "public",
  "images"
);

const metadata = await sharp(source).metadata();
console.log("Source:", metadata.width, "x", metadata.height);

// Portrait 4:5 — optimisé pour la section profil (max 960px de large)
await sharp(source)
  .rotate()
  .resize(960, 1200, {
    fit: "cover",
    position: "top",
  })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(path.join(outDir, "profile-elodie.jpg"));

await sharp(source)
  .rotate()
  .resize(960, 1200, {
    fit: "cover",
    position: "top",
  })
  .webp({ quality: 82 })
  .toFile(path.join(outDir, "profile-elodie.webp"));

const jpg = await sharp(path.join(outDir, "profile-elodie.jpg")).metadata();
const webp = await sharp(path.join(outDir, "profile-elodie.webp")).metadata();

console.log("JPG:", jpg.width, "x", jpg.height);
console.log("WebP:", webp.width, "x", webp.height);

import fs from "fs";
const jpgSize = fs.statSync(path.join(outDir, "profile-elodie.jpg")).size;
const webpSize = fs.statSync(path.join(outDir, "profile-elodie.webp")).size;
console.log(`JPG size: ${(jpgSize / 1024).toFixed(1)} KB`);
console.log(`WebP size: ${(webpSize / 1024).toFixed(1)} KB`);
