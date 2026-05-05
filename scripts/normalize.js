import fs from "node:fs";
import path from "node:path";
import streamArray from "stream-json/streamers/stream-array.js";

const rootDir = path.dirname(import.meta.dirname);
const scriptsDir = path.resolve(rootDir, "scripts");

// gotten from https://scryfall.com/docs/api/bulk-data -> default cards
const cardsPath = path.resolve(scriptsDir, "cards.json");

const cardsByName = {};
await new Promise((resolve, reject) => {
  fs.createReadStream(cardsPath)
    .pipe(streamArray.withParserAsStream())
    .on("data", ({ value: card }) => {
      cardsByName[card.name] = {
        mana_cost: card.mana_cost,
        type_line: card.type_line,
        oracle_text: card.oracle_text,
        card_faces: card.card_faces,
        power: card.power,
        toughness: card.toughness,
        name: card.name,
      };
    })
    .on("end", resolve)
    .on("error", reject);
});

fs.writeFileSync(
  path.resolve(rootDir, "public/normalized-cards.json"),
  JSON.stringify(cardsByName),
);
