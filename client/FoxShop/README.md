# Lišákův obchod

## Popis projektu

Jedná se o jednoduchou webovou aplikaci — online obchod — která slouží k prohlížení, filtrování, úpravě a správě produktů.

---

## Funkce

### Domovská stránka

- Výchozí stránka, na kterou je uživatel přesměrován po zadání základní URL.

### Sekce **Produkty**

- Načte a zobrazí 10 demo (dummy) produktů ve formě kartiček.
- U každého produktu jsou zobrazeny:
  - Název
  - Cena
  - Počet kusů na skladě
  - Stav - aktivní (není zobrazen na kartě) nebo neaktivní

#### Filtry

- Filtrovat podle:
  - Název
  - Počet kusů na skladě - minimální a maximální
  - Aktivní/Neaktivní stav
- Reset filtrů do výchozího stavu jedním kliknutím.

#### Správa produktů

- **Deaktivace produktu:**
  - Kliknutím na červený křížek na kartě produktu se produkt označí jako neaktivní.
- **Úprava produktu:**
  - Kliknutím na modré tlačítko **Upravit** se ve stejné kartičce otevře formulář pro editaci dat produktu.
  - Uživatel může měnit všechny vlastnosti produktu.
- **Přidání nového produktu:**
  - Kliknutím na velké modré tlačítko **+** v modrém kolečku umístěném na konci seznamu produktů.
  - Validace:
    - Název produktu je povinný.
    - Cena musí být větší než 0.

---
