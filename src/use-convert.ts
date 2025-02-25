import { useEffect, useState } from "react";

type Card = {
  card_faces?: Omit<Card, "card_faces">[];
  mana_cost: string;
  type_line: string;
  oracle_text: string;
  name: string;
  power?: string;
  toughness?: string;
};
type Cards = Record<string, Card>;

type CardWithFaces = Omit<Card, "card_faces"> & { card_faces: Card[] };

const prettyPrintCardFace = (card: Card) => {
  const { name, mana_cost, type_line, oracle_text, power, toughness } = card;

  return `${name} - ${mana_cost}:
${type_line}${power && toughness ? ` (${power}/${toughness})` : ""}
${oracle_text}`.trim();
};

const prettyPrintCardWithManyFaces = ({ name, card_faces }: CardWithFaces) => {
  return `${name} - ${card_faces[0]?.mana_cost}:\n${card_faces
    .map((face) => prettyPrintCardFace(face))
    .join("\n//\n")}`.trim();
};

const prettyPrintCard = (card: Card) => {
  if (card.card_faces) {
    return prettyPrintCardWithManyFaces(card as CardWithFaces);
  }

  return prettyPrintCardFace(card);
};

const convert = (cards: Cards, input: string) => {
  const lines = input.split("\n").filter((v) => !!v);

  return lines
    .map((line) => {
      if (!line.trim() || line.startsWith("[")) {
        return line;
      }

      const [, ...rest] = line.split(" ");
      const name = rest.join(" ");
      const card = cards[name];

      if (!card) {
        console.log(`Card not found: ${line}`);
        return line.trim();
      }

      return prettyPrintCard(card);
    })
    .join("\n\n")
    .trim();
};

const useConvert = (): [(input: string) => string, boolean] => {
  const [isLoading, setIsLoading] = useState(true);
  const [cards, setCards] = useState<Cards>({});

  const fetchCards = async () => {
    const response = await fetch("/normalized-cards.json");

    if (!response.ok) {
      alert("Failed to fetch cards");
      return;
    }

    const data: Cards = await response.json();

    setCards(data);
  };

  useEffect(() => {
    if (Object.keys(cards).length === 0) {
      fetchCards().then(() => setIsLoading(false));
    }
  }, [cards]);

  return [(input) => convert(cards, input), isLoading];
};

export default useConvert;
