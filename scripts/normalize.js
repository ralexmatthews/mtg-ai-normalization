import fs from "node:fs";
import path from "node:path";

const rootDir = path.dirname(import.meta.dirname);
const scriptsDir = path.resolve(rootDir, "scripts");

// gotten from https://scryfall.com/docs/api/bulk-data -> default cards
const cardsPath = path.resolve(scriptsDir, "cards.json");

const cards = JSON.parse(fs.readFileSync(cardsPath, "utf-8"));

const cardsByName = cards.reduce((acc, card) => {
  acc[card.name] = {
    mana_cost: card.mana_cost,
    type_line: card.type_line,
    oracle_text: card.oracle_text,
    card_faces: card.card_faces,
    power: card.power,
    toughness: card.toughness,
    name: card.name,
  };
  return acc;
}, {});

fs.writeFileSync(
  path.resolve(rootDir, "public/normalized-cards.json"),
  JSON.stringify(cardsByName),
);
