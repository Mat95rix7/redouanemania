// src/types/conjugation.d.ts ou src/types/index.ts

export type Pronom = "je" | "tu" | "il/elle" | "nous" | "vous" | "ils/elles";

export type Mode = "indicatif" | "subjonctif" | "conditionnel" | "impératif" | "infinitif" | "participe";

export type Temps = "présent" | "passé composé" | "imparfait" | "futur simple" | "plus-que-parfait" | "passé simple" | "futur antérieur";

export type ConjugaisonParTemps = {
  [key in Pronom]: string; // ex: { je: "suis", tu: "es", ... }
};

export type ConjugaisonVerbe = {
  [key in Mode]?: {
    [key in Temps]?: ConjugaisonParTemps;
  };
};

export type VerbesConjugaisons = {
  [verb: string]: ConjugaisonVerbe;
};