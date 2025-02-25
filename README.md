# MTG AI Normalizer Web App

This very specialized web app takes a list of MTG cards in the standard list format ("1 Lightning Bolt") and converts it to the format usable by LLMs so they can help with the deck building process.

Example input:

```
[COMMANDER]
1 Uril, the Miststalker

[CREATURES]
1 Eidolon of Blossoms
1 Eidolon of Countless Battles
...
```

Example output:

```
[COMMANDER]

Uril, the Miststalker - {2}{R}{G}{W}:
Legendary Creature — Beast (5/5)
Hexproof (This creature can't be the target of spells or abilities your opponents control.)
Uril, the Miststalker gets +2/+2 for each Aura attached to it.

[CREATURES]

Eidolon of Blossoms - {2}{G}{G}:
Enchantment Creature — Spirit (2/2)
Constellation — Whenever Eidolon of Blossoms or another enchantment you control enters, draw a card.

Eidolon of Countless Battles - {1}{W}{W}:
Enchantment Creature — Spirit (0/0)
Bestow {2}{W}{W} (If you cast this card for its bestow cost, it's an Aura spell with enchant creature. It becomes a creature again if it's not attached to a creature.)
Eidolon of Countless Battles and enchanted creature each get +1/+1 for each creature you control and +1/+1 for each Aura you control.

...
```

> Note: This ignores newlines, and the `[COMMANDER]` parts can be added or omitted

I made this because I use Claude all the time asking questions about decks, but it knows very little about card specifics. So this adds all the relative details needed when asking questions.

I get my card data from the `ManaBox` app. I go to a deck, click the dots in the top right corner, share, as text, and copy to clipboard. From there, you can paste it here, and it'll convert it and allow you to copy it to your clipboard for pasting elsewhere.
