import { VerbesConjugaisons, Mode, Temps, Pronom } from '../types/index';

const conjugaisons: VerbesConjugaisons = {
  // --- VERBE ÊTRE ---
  "être": {
    "indicatif": {
      "présent": {
        "je": "suis",
        "tu": "es",
        "il/elle": "est",
        "nous": "sommes",
        "vous": "êtes",
        "ils/elles": "sont"
      },
      "passé composé": {
        "je": "ai été",
        "tu": "as été",
        "il/elle": "a été",
        "nous": "avons été",
        "vous": "avez été",
        "ils/elles": "ont été"
      },
      "imparfait": {
        "je": "étais",
        "tu": "étais",
        "il/elle": "était",
        "nous": "étions",
        "vous": "étiez",
        "ils/elles": "étaient"
      },
      "futur simple": {
        "je": "serai",
        "tu": "seras",
        "il/elle": "sera",
        "nous": "serons",
        "vous": "serez",
        "ils/elles": "seront"
      }
    }
  },

  // --- VERBE AVOIR ---
  "avoir": {
    "indicatif": {
      "présent": {
        "je": "ai",
        "tu": "as",
        "il/elle": "a",
        "nous": "avons",
        "vous": "avez",
        "ils/elles": "ont"
      },
      "passé composé": {
        "je": "ai eu",
        "tu": "as eu",
        "il/elle": "a eu",
        "nous": "avons eu",
        "vous": "avez eu",
        "ils/elles": "ont eu"
      },
      "imparfait": {
        "je": "avais",
        "tu": "avais",
        "il/elle": "avait",
        "nous": "avions",
        "vous": "aviez",
        "ils/elles": "avaient"
      },
      "futur simple": {
        "je": "aurai",
        "tu": "auras",
        "il/elle": "aura",
        "nous": "aurons",
        "vous": "aurez",
        "ils/elles": "auront"
      }
    }
  },

  // --- VERBE ALLER ---
  "aller": {
    "indicatif": {
      "présent": {
        "je": "vais",
        "tu": "vas",
        "il/elle": "va",
        "nous": "allons",
        "vous": "allez",
        "ils/elles": "vont"
      },
      "passé composé": {
        "je": "suis allé(e)",
        "tu": "es allé(e)",
        "il/elle": "est allé(e)",
        "nous": "sommes allé(e)s",
        "vous": "êtes allé(e)s",
        "ils/elles": "sont allé(e)s"
      },
      "imparfait": {
        "je": "allais",
        "tu": "allais",
        "il/elle": "allait",
        "nous": "allions",
        "vous": "alliez",
        "ils/elles": "allaient"
      },
      "futur simple": {
        "je": "irai",
        "tu": "iras",
        "il/elle": "ira",
        "nous": "irons",
        "vous": "irez",
        "ils/elles": "iront"
      }
    }
  },

  // --- VERBE FAIRE ---
  "faire": {
    "indicatif": {
      "présent": {
        "je": "fais",
        "tu": "fais",
        "il/elle": "fait",
        "nous": "faisons",
        "vous": "faites",
        "ils/elles": "font"
      },
      "passé composé": {
        "je": "ai fait",
        "tu": "as fait",
        "il/elle": "a fait",
        "nous": "avons fait",
        "vous": "avez fait",
        "ils/elles": "ont fait"
      },
      "imparfait": {
        "je": "faisais",
        "tu": "faisais",
        "il/elle": "faisait",
        "nous": "faisions",
        "vous": "faisiez",
        "ils/elles": "faisaient"
      },
      "futur simple": {
        "je": "ferai",
        "tu": "feras",
        "il/elle": "fera",
        "nous": "ferons",
        "vous": "ferez",
        "ils/elles": "feront"
      }
    }
  },

  // --- VERBE DIRE ---
  "dire": {
    "indicatif": {
      "présent": {
        "je": "dis",
        "tu": "dis",
        "il/elle": "dit",
        "nous": "disons",
        "vous": "dites",
        "ils/elles": "disent"
      },
      "passé composé": {
        "je": "ai dit",
        "tu": "as dit",
        "il/elle": "a dit",
        "nous": "avons dit",
        "vous": "avez dit",
        "ils/elles": "ont dit"
      },
      "imparfait": {
        "je": "disais",
        "tu": "disais",
        "il/elle": "disait",
        "nous": "disions",
        "vous": "disiez",
        "ils/elles": "disaient"
      },
      "futur simple": {
        "je": "dirai",
        "tu": "diras",
        "il/elle": "dira",
        "nous": "dirons",
        "vous": "direz",
        "ils/elles": "diront"
      }
    }
  },

  // --- VERBE POUVOIR ---
  "pouvoir": {
    "indicatif": {
      "présent": {
        "je": "peux",
        "tu": "peux",
        "il/elle": "peut",
        "nous": "pouvons",
        "vous": "pouvez",
        "ils/elles": "peuvent"
      },
      "passé composé": {
        "je": "ai pu",
        "tu": "as pu",
        "il/elle": "a pu",
        "nous": "avons pu",
        "vous": "avez pu",
        "ils/elles": "ont pu"
      },
      "imparfait": {
        "je": "pouvais",
        "tu": "pouvais",
        "il/elle": "pouvait",
        "nous": "pouvions",
        "vous": "pouviez",
        "ils/elles": "pouvaient"
      },
      "futur simple": {
        "je": "pourrai",
        "tu": "pourras",
        "il/elle": "pourra",
        "nous": "pourrons",
        "vous": "pourrez",
        "ils/elles": "pourront"
      }
    }
  },

  // --- VERBE VOULOIR ---
  "vouloir": {
    "indicatif": {
      "présent": {
        "je": "veux",
        "tu": "veux",
        "il/elle": "veut",
        "nous": "voulons",
        "vous": "voulez",
        "ils/elles": "veulent"
      },
      "passé composé": {
        "je": "ai voulu",
        "tu": "as voulu",
        "il/elle": "a voulu",
        "nous": "avons voulu",
        "vous": "avez voulu",
        "ils/elles": "ont voulu"
      },
      "imparfait": {
        "je": "voulais",
        "tu": "voulais",
        "il/elle": "voulait",
        "nous": "voulions",
        "vous": "vouliez",
        "ils/elles": "voulaient"
      },
      "futur simple": {
        "je": "voudrai",
        "tu": "voudras",
        "il/elle": "voudra",
        "nous": "voudrons",
        "vous": "voudrez",
        "ils/elles": "voudront"
      }
    }
  },

  // --- VERBE VOIR ---
  "voir": {
    "indicatif": {
      "présent": {
        "je": "vois",
        "tu": "vois",
        "il/elle": "voit",
        "nous": "voyons",
        "vous": "voyez",
        "ils/elles": "voient"
      },
      "passé composé": {
        "je": "ai vu",
        "tu": "as vu",
        "il/elle": "a vu",
        "nous": "avons vu",
        "vous": "avez vu",
        "ils/elles": "ont vu"
      },
      "imparfait": {
        "je": "voyais",
        "tu": "voyais",
        "il/elle": "voyait",
        "nous": "voyions",
        "vous": "voyiez",
        "ils/elles": "voyaient"
      },
      "futur simple": {
        "je": "verrai",
        "tu": "verras",
        "il/elle": "verra",
        "nous": "verrons",
        "vous": "verrez",
        "ils/elles": "verront"
      }
    }
  },

  // --- VERBE PRENDRE ---
  "prendre": {
    "indicatif": {
      "présent": {
        "je": "prends",
        "tu": "prends",
        "il/elle": "prend",
        "nous": "prenons",
        "vous": "prenez",
        "ils/elles": "prennent"
      },
      "passé composé": {
        "je": "ai pris",
        "tu": "as pris",
        "il/elle": "a pris",
        "nous": "avons pris",
        "vous": "avez pris",
        "ils/elles": "ont pris"
      },
      "imparfait": {
        "je": "prenais",
        "tu": "prenais",
        "il/elle": "prenait",
        "nous": "prenions",
        "vous": "preniez",
        "ils/elles": "prenaient"
      },
      "futur simple": {
        "je": "prendrai",
        "tu": "prendras",
        "il/elle": "prendra",
        "nous": "prendrons",
        "vous": "prendrez",
        "ils/elles": "prendront"
      }
    }
  },

  // --- VERBE SAVOIR ---
  "savoir": {
    "indicatif": {
      "présent": {
        "je": "sais",
        "tu": "sais",
        "il/elle": "sait",
        "nous": "savons",
        "vous": "savez",
        "ils/elles": "savent"
      },
      "passé composé": {
        "je": "ai su",
        "tu": "as su",
        "il/elle": "a su",
        "nous": "avons su",
        "vous": "avez su",
        "ils/elles": "ont su"
      },
      "imparfait": {
        "je": "savais",
        "tu": "savais",
        "il/elle": "savait",
        "nous": "savions",
        "vous": "saviez",
        "ils/elles": "savaient"
      },
      "futur simple": {
        "je": "saurai",
        "tu": "sauras",
        "il/elle": "saura",
        "nous": "saurons",
        "vous": "saurez",
        "ils/elles": "sauront"
      }
    }
  },

  // --- VERBE DEVOIR ---
  "devoir": {
    "indicatif": {
      "présent": {
        "je": "dois",
        "tu": "dois",
        "il/elle": "doit",
        "nous": "devons",
        "vous": "devez",
        "ils/elles": "doivent"
      },
      "passé composé": {
        "je": "ai dû",
        "tu": "as dû",
        "il/elle": "a dû",
        "nous": "avons dû",
        "vous": "avez dû",
        "ils/elles": "ont dû"
      },
      "imparfait": {
        "je": "devais",
        "tu": "devais",
        "il/elle": "devait",
        "nous": "devions",
        "vous": "deviez",
        "ils/elles": "devaient"
      },
      "futur simple": {
        "je": "devrai",
        "tu": "devras",
        "il/elle": "devra",
        "nous": "devrons",
        "vous": "devrez",
        "ils/elles": "devront"
      }
    }
  },

  // --- VERBE VENIR ---
  "venir": {
    "indicatif": {
      "présent": {
        "je": "viens",
        "tu": "viens",
        "il/elle": "vient",
        "nous": "venons",
        "vous": "venez",
        "ils/elles": "viennent"
      },
      "passé composé": {
        "je": "suis venu(e)",
        "tu": "es venu(e)",
        "il/elle": "est venu(e)",
        "nous": "sommes venu(e)s",
        "vous": "êtes venu(e)s",
        "ils/elles": "sont venu(e)s"
      },
      "imparfait": {
        "je": "venais",
        "tu": "venais",
        "il/elle": "venait",
        "nous": "venions",
        "vous": "veniez",
        "ils/elles": "venaient"
      },
      "futur simple": {
        "je": "viendrai",
        "tu": "viendras",
        "il/elle": "viendra",
        "nous": "viendrons",
        "vous": "viendrez",
        "ils/elles": "viendront"
      }
    }
  },

  // --- VERBE PARLER (1er groupe, régulier) ---
  "parler": {
    "indicatif": {
      "présent": {
        "je": "parle",
        "tu": "parles",
        "il/elle": "parle",
        "nous": "parlons",
        "vous": "parlez",
        "ils/elles": "parlent"
      },
      "passé composé": {
        "je": "ai parlé",
        "tu": "as parlé",
        "il/elle": "a parlé",
        "nous": "avons parlé",
        "vous": "avez parlé",
        "ils/elles": "ont parlé"
      },
      "imparfait": {
        "je": "parlais",
        "tu": "parlais",
        "il/elle": "parlait",
        "nous": "parlions",
        "vous": "parliez",
        "ils/elles": "parlaient"
      },
      "futur simple": {
        "je": "parlerai",
        "tu": "parleras",
        "il/elle": "parlera",
        "nous": "parlerons",
        "vous": "parlerez",
        "ils/elles": "parleront"
      }
    }
  },

  // --- VERBE PASSER ---
  "passer": {
    "indicatif": {
      "présent": {
        "je": "passe",
        "tu": "passes",
        "il/elle": "passe",
        "nous": "passons",
        "vous": "passez",
        "ils/elles": "passent"
      },
      "passé composé": {
        "je": "suis passé(e)",
        "tu": "es passé(e)",
        "il/elle": "est passé(e)",
        "nous": "sommes passé(e)s",
        "vous": "êtes passé(e)s",
        "ils/elles": "sont passé(e)s"
      },
      "imparfait": {
        "je": "passais",
        "tu": "passais",
        "il/elle": "passait",
        "nous": "passions",
        "vous": "passiez",
        "ils/elles": "passaient"
      },
      "futur simple": {
        "je": "passerai",
        "tu": "passeras",
        "il/elle": "passera",
        "nous": "passerons",
        "vous": "passerez",
        "ils/elles": "passeront"
      }
    }
  },

  // --- VERBE METTRE ---
  "mettre": {
    "indicatif": {
      "présent": {
        "je": "mets",
        "tu": "mets",
        "il/elle": "met",
        "nous": "mettons",
        "vous": "mettez",
        "ils/elles": "mettent"
      },
      "passé composé": {
        "je": "ai mis",
        "tu": "as mis",
        "il/elle": "a mis",
        "nous": "avons mis",
        "vous": "avez mis",
        "ils/elles": "ont mis"
      },
      "imparfait": {
        "je": "mettais",
        "tu": "mettais",
        "il/elle": "mettait",
        "nous": "mettions",
        "vous": "mettiez",
        "ils/elles": "mettaient"
      },
      "futur simple": {
        "je": "mettrai",
        "tu": "mettras",
        "il/elle": "mettra",
        "nous": "mettrons",
        "vous": "mettrez",
        "ils/elles": "mettront"
      }
    }
  },

  // --- VERBE AIMER ---
  "aimer": {
    "indicatif": {
      "présent": {
        "je": "aime",
        "tu": "aimes",
        "il/elle": "aime",
        "nous": "aimons",
        "vous": "aimez",
        "ils/elles": "aiment"
      },
      "passé composé": {
        "je": "ai aimé",
        "tu": "as aimé",
        "il/elle": "a aimé",
        "nous": "avons aimé",
        "vous": "avez aimé",
        "ils/elles": "ont aimé"
      },
      "imparfait": {
        "je": "aimais",
        "tu": "aimais",
        "il/elle": "aimait",
        "nous": "aimions",
        "vous": "aimiez",
        "ils/elles": "aimaient"
      },
      "futur simple": {
        "je": "aimerai",
        "tu": "aimeras",
        "il/elle": "aimera",
        "nous": "aimerons",
        "vous": "aimerez",
        "ils/elles": "aimeront"
      }
    }
  },

  // --- VERBE DONNER ---
  "donner": {
    "indicatif": {
      "présent": {
        "je": "donne",
        "tu": "donnes",
        "il/elle": "donne",
        "nous": "donnons",
        "vous": "donnez",
        "ils/elles": "donnent"
      },
      "passé composé": {
        "je": "ai donné",
        "tu": "as donné",
        "il/elle": "a donné",
        "nous": "avons donné",
        "vous": "avez donné",
        "ils/elles": "ont donné"
      },
      "imparfait": {
        "je": "donnais",
        "tu": "donnais",
        "il/elle": "donnait",
        "nous": "donnions",
        "vous": "donniez",
        "ils/elles": "donnaient"
      },
      "futur simple": {
        "je": "donnerai",
        "tu": "donneras",
        "il/elle": "donnera",
        "nous": "donnerons",
        "vous": "donnerez",
        "ils/elles": "donneront"
      }
    }
  },

  // --- VERBE DEMANDER ---
  "demander": {
    "indicatif": {
      "présent": {
        "je": "demande",
        "tu": "demandes",
        "il/elle": "demande",
        "nous": "demandons",
        "vous": "demandez",
        "ils/elles": "demandent"
      },
      "passé composé": {
        "je": "ai demandé",
        "tu": "as demandé",
        "il/elle": "a demandé",
        "nous": "avons demandé",
        "vous": "avez demandé",
        "ils/elles": "ont demandé"
      },
      "imparfait": {
        "je": "demandais",
        "tu": "demandais",
        "il/elle": "demandait",
        "nous": "demandions",
        "vous": "demandiez",
        "ils/elles": "demandaient"
      },
      "futur simple": {
        "je": "demanderai",
        "tu": "demanderas",
        "il/elle": "demandera",
        "nous": "demanderons",
        "vous": "demanderez",
        "ils/elles": "demanderont"
      }
    }
  },

  // --- VERBE TROUVER ---
  "trouver": {
    "indicatif": {
      "présent": {
        "je": "trouve",
        "tu": "trouves",
        "il/elle": "trouve",
        "nous": "trouvons",
        "vous": "trouvez",
        "ils/elles": "trouvent"
      },
      "passé composé": {
        "je": "ai trouvé",
        "tu": "as trouvé",
        "il/elle": "a trouvé",
        "nous": "avons trouvé",
        "vous": "avez trouvé",
        "ils/elles": "ont trouvé"
      },
      "imparfait": {
        "je": "trouvais",
        "tu": "trouvais",
        "il/elle": "trouvait",
        "nous": "trouvions",
        "vous": "trouviez",
        "ils/elles": "trouvaient"
      },
      "futur simple": {
        "je": "trouverai",
        "tu": "trouveras",
        "il/elle": "trouvera",
        "nous": "trouverons",
        "vous": "trouverez",
        "ils/elles": "trouveront"
      }
    }
  },

  // --- VERBE COMPRENDRE ---
  "comprendre": {
    "indicatif": {
      "présent": {
        "je": "comprends",
        "tu": "comprends",
        "il/elle": "comprend",
        "nous": "comprenons",
        "vous": "comprenez",
        "ils/elles": "comprennent"
      },
      "passé composé": {
        "je": "ai compris",
        "tu": "as compris",
        "il/elle": "a compris",
        "nous": "avons compris",
        "vous": "avez compris",
        "ils/elles": "ont compris"
      },
      "imparfait": {
        "je": "comprenais",
        "tu": "comprenais",
        "il/elle": "comprenait",
        "nous": "comprenions",
        "vous": "compreniez",
        "ils/elles": "comprenaient"
      },
      "futur simple": {
        "je": "comprendrai",
        "tu": "comprendras",
        "il/elle": "comprendra",
        "nous": "comprendrons",
        "vous": "comprendrez",
        "ils/elles": "comprendront"
      }
    }
  },

  // --- VERBE TENIR ---
  "tenir": {
    "indicatif": {
      "présent": {
        "je": "tiens",
        "tu": "tiens",
        "il/elle": "tient",
        "nous": "tenons",
        "vous": "tenez",
        "ils/elles": "tiennent"
      },
      "passé composé": {
        "je": "ai tenu",
        "tu": "as tenu",
        "il/elle": "a tenu",
        "nous": "avons tenu",
        "vous": "avez tenu",
        "ils/elles": "ont tenu"
      },
      "imparfait": {
        "je": "tenais",
        "tu": "tenais",
        "il/elle": "tenait",
        "nous": "tenions",
        "vous": "teniez",
        "ils/elles": "tenaient"
      },
      "futur simple": {
        "je": "tiendrai",
        "tu": "tiendras",
        "il/elle": "tiendra",
        "nous": "tiendrons",
        "vous": "tiendrez",
        "ils/elles": "tiendront"
      }
    }
  },

  // --- VERBE VIVRE ---
  "vivre": {
    "indicatif": {
      "présent": {
        "je": "vis",
        "tu": "vis",
        "il/elle": "vit",
        "nous": "vivons",
        "vous": "vivez",
        "ils/elles": "vivent"
      },
      "passé composé": {
        "je": "ai vécu",
        "tu": "as vécu",
        "il/elle": "a vécu",
        "nous": "avons vécu",
        "vous": "avez vécu",
        "ils/elles": "ont vécu"
      },
      "imparfait": {
        "je": "vivais",
        "tu": "vivais",
        "il/elle": "vivait",
        "nous": "vivions",
        "vous": "viviez",
        "ils/elles": "vivaient"
      },
      "futur simple": {
        "je": "vivrai",
        "tu": "vivras",
        "il/elle": "vivra",
        "nous": "vivrons",
        "vous": "vivrez",
        "ils/elles": "vivront"
      }
    }
  },

  // --- VERBE CROIRE ---
  "croire": {
    "indicatif": {
      "présent": {
        "je": "crois",
        "tu": "crois",
        "il/elle": "croit",
        "nous": "croyons",
        "vous": "croyez",
        "ils/elles": "croient"
      },
      "passé composé": {
        "je": "ai cru",
        "tu": "as cru",
        "il/elle": "a cru",
        "nous": "avons cru",
        "vous": "avez cru",
        "ils/elles": "ont cru"
      },
      "imparfait": {
        "je": "croyais",
        "tu": "croyais",
        "il/elle": "croyait",
        "nous": "croyions",
        "vous": "croyiez",
        "ils/elles": "croyaient"
      },
      "futur simple": {
        "je": "croirai",
        "tu": "croiras",
        "il/elle": "croira",
        "nous": "croirons",
        "vous": "croirez",
        "ils/elles": "croiront"
      }
    }
  },

  // --- VERBE FINIR ---
  "finir": {
    "indicatif": {
      "présent": {
        "je": "finis",
        "tu": "finis",
        "il/elle": "finit",
        "nous": "finissons",
        "vous": "finissez",
        "ils/elles": "finissent"
      },
      "passé composé": {
        "je": "ai fini",
        "tu": "as fini",
        "il/elle": "a fini",
        "nous": "avons fini",
        "vous": "avez fini",
        "ils/elles": "ont fini"
      },
      "imparfait": {
        "je": "finissais",
        "tu": "finissais",
        "il/elle": "finissait",
        "nous": "finissions",
        "vous": "finissiez",
        "ils/elles": "finissaient"
      },
      "futur simple": {
        "je": "finirai",
        "tu": "finiras",
        "il/elle": "finira",
        "nous": "finirons",
        "vous": "finirez",
        "ils/elles": "finiront"
      }
    }
  },

  // --- VERBE TRAVAILLER ---
  "travailler": {
    "indicatif": {
      "présent": {
        "je": "travaille",
        "tu": "travailles",
        "il/elle": "travaille",
        "nous": "travaillons",
        "vous": "travaillez",
        "ils/elles": "travaillent"
      },
      "passé composé": {
        "je": "ai travaillé",
        "tu": "as travaillé",
        "il/elle": "a travaillé",
        "nous": "avons travaillé",
        "vous": "avez travaillé",
        "ils/elles": "ont travaillé"
      },
      "imparfait": {
        "je": "travaillais",
        "tu": "travaillais",
        "il/elle": "travaillait",
        "nous": "travaillions",
        "vous": "travailliez",
        "ils/elles": "travaillaient"
      },
      "futur simple": {
        "je": "travaillerai",
        "tu": "travailleras",
        "il/elle": "travaillera",
        "nous": "travaillerons",
        "vous": "travaillerez",
        "ils/elles": "travailleront"
      }
    }
  },

  // --- VERBE JOUER ---
  "jouer": {
    "indicatif": {
      "présent": {
        "je": "joue",
        "tu": "joues",
        "il/elle": "joue",
        "nous": "jouons",
        "vous": "jouez",
        "ils/elles": "jouent"
      },
      "passé composé": {
        "je": "ai joué",
        "tu": "as joué",
        "il/elle": "a joué",
        "nous": "avons joué",
        "vous": "avez joué",
        "ils/elles": "ont joué"
      },
      "imparfait": {
        "je": "jouais",
        "tu": "jouais",
        "il/elle": "jouait",
        "nous": "jouions",
        "vous": "jouiez",
        "ils/elles": "jouaient"
      },
      "futur simple": {
        "je": "jouerai",
        "tu": "joueras",
        "il/elle": "jouera",
        "nous": "jouerons",
        "vous": "jouerez",
        "ils/elles": "joueront"
      }
    }
  },

  // --- VERBE MARCHER ---
  "marcher": {
    "indicatif": {
      "présent": {
        "je": "marche",
        "tu": "marches",
        "il/elle": "marche",
        "nous": "marchons",
        "vous": "marchez",
        "ils/elles": "marchent"
      },
      "passé composé": {
        "je": "ai marché",
        "tu": "as marché",
        "il/elle": "a marché",
        "nous": "avons marché",
        "vous": "avez marché",
        "ils/elles": "ont marché"
      },
      "imparfait": {
        "je": "marchais",
        "tu": "marchais",
        "il/elle": "marchait",
        "nous": "marchions",
        "vous": "marchiez",
        "ils/elles": "marchaient"
      },
      "futur simple": {
        "je": "marcherai",
        "tu": "marcheras",
        "il/elle": "marchera",
        "nous": "marcherons",
        "vous": "marcherez",
        "ils/elles": "marcheront"
      }
    }
  },

  // --- VERBE ATTENDRE ---
  "attendre": {
    "indicatif": {
      "présent": {
        "je": "attends",
        "tu": "attends",
        "il/elle": "attend",
        "nous": "attendons",
        "vous": "attendez",
        "ils/elles": "attendent"
      },
      "passé composé": {
        "je": "ai attendu",
        "tu": "as attendu",
        "il/elle": "a attendu",
        "nous": "avons attendu",
        "vous": "avez attendu",
        "ils/elles": "ont attendu"
      },
      "imparfait": {
        "je": "attendais",
        "tu": "attendais",
        "il/elle": "attendait",
        "nous": "attendions",
        "vous": "attendiez",
        "ils/elles": "attendaient"
      },
      "futur simple": {
        "je": "attendrai",
        "tu": "attendras",
        "il/elle": "attendra",
        "nous": "attendrons",
        "vous": "attendrez",
        "ils/elles": "attendront"
      }
    }
  },

  // --- VERBE LIRE ---
  "lire": {
    "indicatif": {
      "présent": {
        "je": "lis",
        "tu": "lis",
        "il/elle": "lit",
        "nous": "lisons",
        "vous": "lisez",
        "ils/elles": "lisent"
      },
      "passé composé": {
        "je": "ai lu",
        "tu": "as lu",
        "il/elle": "a lu",
        "nous": "avons lu",
        "vous": "avez lu",
        "ils/elles": "ont lu"
      },
      "imparfait": {
        "je": "lisais",
        "tu": "lisais",
        "il/elle": "lisait",
        "nous": "lisions",
        "vous": "lisiez",
        "ils/elles": "lisaient"
      },
      "futur simple": {
        "je": "lirai",
        "tu": "liras",
        "il/elle": "lira",
        "nous": "lirons",
        "vous": "lirez",
        "ils/elles": "liront"
      }
    }
  },

  // --- VERBE ÉCRIRE ---
  "écrire": {
    "indicatif": {
      "présent": {
        "je": "écris",
        "tu": "écris",
        "il/elle": "écrit",
        "nous": "écrivons",
        "vous": "écrivez",
        "ils/elles": "écrivent"
      },
      "passé composé": {
        "je": "ai écrit",
        "tu": "as écrit",
        "il/elle": "a écrit",
        "nous": "avons écrit",
        "vous": "avez écrit",
        "ils/elles": "ont écrit"
      },
      "imparfait": {
        "je": "écrivais",
        "tu": "écrivais",
        "il/elle": "écrivait",
        "nous": "écrivions",
        "vous": "écriviez",
        "ils/elles": "écrivaient"
      },
      "futur simple": {
        "je": "écrirai",
        "tu": "écriras",
        "il/elle": "écrira",
        "nous": "écrirons",
        "vous": "écrirez",
        "ils/elles": "écriront"
      }
    }
  },

  // --- VERBE APPRENDRE ---
  "apprendre": {
    "indicatif": {
      "présent": {
        "je": "apprends",
        "tu": "apprends",
        "il/elle": "apprend",
        "nous": "apprenons",
        "vous": "apprenez",
        "ils/elles": "apprennent"
      },
      "passé composé": {
        "je": "ai appris",
        "tu": "as appris",
        "il/elle": "a appris",
        "nous": "avons appris",
        "vous": "avez appris",
        "ils/elles": "ont appris"
      },
      "imparfait": {
        "je": "apprenais",
        "tu": "apprenais",
        "il/elle": "apprenait",
        "nous": "apprenions",
        "vous": "appreniez",
        "ils/elles": "apprenaient"
      },
      "futur simple": {
        "je": "apprendrai",
        "tu": "apprendras",
        "il/elle": "apprendra",
        "nous": "apprendrons",
        "vous": "apprendrez",
        "ils/elles": "apprendront"
      }
    }
  },

  // --- VERBE CONNAÎTRE ---
  "connaître": {
    "indicatif": {
      "présent": {
        "je": "connais",
        "tu": "connais",
        "il/elle": "connaît",
        "nous": "connaissons",
        "vous": "connaissez",
        "ils/elles": "connaissent"
      },
      "passé composé": {
        "je": "ai connu",
        "tu": "as connu",
        "il/elle": "a connu",
        "nous": "avons connu",
        "vous": "avez connu",
        "ils/elles": "ont connu"
      },
      "imparfait": {
        "je": "connaissais",
        "tu": "connaissais",
        "il/elle": "connaissait",
        "nous": "connaissions",
        "vous": "connaissiez",
        "ils/elles": "connaissaient"
      },
      "futur simple": {
        "je": "connaîtrai",
        "tu": "connaîtras",
        "il/elle": "connaîtra",
        "nous": "connaîtrons",
        "vous": "connaîtrez",
        "ils/elles": "connaîtront"
      }
    }
  },

  // --- VERBE ACHETER ---
  "acheter": {
    "indicatif": {
      "présent": {
        "je": "achète",
        "tu": "achètes",
        "il/elle": "achète",
        "nous": "achetons",
        "vous": "achetez",
        "ils/elles": "achètent"
      },
      "passé composé": {
        "je": "ai acheté",
        "tu": "as acheté",
        "il/elle": "a acheté",
        "nous": "avons acheté",
        "vous": "avez acheté",
        "ils/elles": "ont acheté"
      },
      "imparfait": {
        "je": "achetais",
        "tu": "achetais",
        "il/elle": "achetait",
        "nous": "achetions",
        "vous": "achetiez",
        "ils/elles": "achetaient"
      },
      "futur simple": {
        "je": "achèterai",
        "tu": "achèteras",
        "il/elle": "achètera",
        "nous": "achèterons",
        "vous": "achèterez",
        "ils/elles": "achèteront"
      }
    }
  },

  // --- VERBE MANGER ---
  "manger": {
    "indicatif": {
      "présent": {
        "je": "mange",
        "tu": "manges",
        "il/elle": "mange",
        "nous": "mangeons",
        "vous": "mangez",
        "ils/elles": "mangent"
      },
      "passé composé": {
        "je": "ai mangé",
        "tu": "as mangé",
        "il/elle": "a mangé",
        "nous": "avons mangé",
        "vous": "avez mangé",
        "ils/elles": "ont mangé"
      },
      "imparfait": {
        "je": "mangeais",
        "tu": "mangeais",
        "il/elle": "mangeait",
        "nous": "mangions",
        "vous": "mangiez",
        "ils/elles": "mangeaient"
      },
      "futur simple": {
        "je": "mangerai",
        "tu": "mangeras",
        "il/elle": "mangera",
        "nous": "mangerons",
        "vous": "mangerez",
        "ils/elles": "mangeront"
      }
    }
  },

  // --- VERBE OUVRIR ---
  "ouvrir": {
    "indicatif": {
      "présent": {
        "je": "ouvre",
        "tu": "ouvres",
        "il/elle": "ouvre",
        "nous": "ouvrons",
        "vous": "ouvrez",
        "ils/elles": "ouvrent"
      },
      "passé composé": {
        "je": "ai ouvert",
        "tu": "as ouvert",
        "il/elle": "a ouvert",
        "nous": "avons ouvert",
        "vous": "avez ouvert",
        "ils/elles": "ont ouvert"
      },
      "imparfait": {
        "je": "ouvrais",
        "tu": "ouvrais",
        "il/elle": "ouvrait",
        "nous": "ouvrions",
        "vous": "ouvriez",
        "ils/elles": "ouvraient"
      },
      "futur simple": {
        "je": "ouvrirai",
        "tu": "ouvriras",
        "il/elle": "ouvrira",
        "nous": "ouvrirons",
        "vous": "ouvrirez",
        "ils/elles": "ouvriront"
      }
    }
  },

  // --- VERBE APPELER ---
  "appeler": {
    "indicatif": {
      "présent": {
        "je": "appelle",
        "tu": "appelles",
        "il/elle": "appelle",
        "nous": "appelons",
        "vous": "appelez",
        "ils/elles": "appellent"
      },
      "passé composé": {
        "je": "ai appelé",
        "tu": "as appelé",
        "il/elle": "a appelé",
        "nous": "avons appelé",
        "vous": "avez appelé",
        "ils/elles": "ont appelé"
      },
      "imparfait": {
        "je": "appelais",
        "tu": "appelais",
        "il/elle": "appelait",
        "nous": "appelions",
        "vous": "appeliez",
        "ils/elles": "appelaient"
      },
      "futur simple": {
        "je": "appellerai",
        "tu": "appelleras",
        "il/elle": "appellera",
        "nous": "appellerons",
        "vous": "appellerez",
        "ils/elles": "appelleront"
      }
    }
  },

  // --- VERBE CHANGER ---
  "changer": {
    "indicatif": {
      "présent": {
        "je": "change",
        "tu": "changes",
        "il/elle": "change",
        "nous": "changeons",
        "vous": "changez",
        "ils/elles": "changent"
      },
      "passé composé": {
        "je": "ai changé",
        "tu": "as changé",
        "il/elle": "a changé",
        "nous": "avons changé",
        "vous": "avez changé",
        "ils/elles": "ont changé"
      },
      "imparfait": {
        "je": "changeais",
        "tu": "changeais",
        "il/elle": "changeait",
        "nous": "changions",
        "vous": "changiez",
        "ils/elles": "changeaient"
      },
      "futur simple": {
        "je": "changerai",
        "tu": "changeras",
        "il/elle": "changera",
        "nous": "changerons",
        "vous": "changerez",
        "ils/elles": "changeront"
      }
    }
  },

  // --- VERBE BOIRE ---
  "boire": {
    "indicatif": {
      "présent": {
        "je": "bois",
        "tu": "bois",
        "il/elle": "boit",
        "nous": "buvons",
        "vous": "buvez",
        "ils/elles": "boivent"
      },
      "passé composé": {
        "je": "ai bu",
        "tu": "as bu",
        "il/elle": "a bu",
        "nous": "avons bu",
        "vous": "avez bu",
        "ils/elles": "ont bu"
      },
      "imparfait": {
        "je": "buvais",
        "tu": "buvais",
        "il/elle": "buvait",
        "nous": "buvions",
        "vous": "buviez",
        "ils/elles": "buvaient"
      },
      "futur simple": {
        "je": "boirai",
        "tu": "boiras",
        "il/elle": "boira",
        "nous": "boirons",
        "vous": "boirez",
        "ils/elles": "boiront"
      }
    }
  },

  // --- VERBE SORTIR ---
  "sortir": {
    "indicatif": {
      "présent": {
        "je": "sors",
        "tu": "sors",
        "il/elle": "sort",
        "nous": "sortons",
        "vous": "sortez",
        "ils/elles": "sortent"
      },
      "passé composé": {
        "je": "suis sorti(e)",
        "tu": "es sorti(e)",
        "il/elle": "est sorti(e)",
        "nous": "sommes sorti(e)s",
        "vous": "êtes sorti(e)s",
        "ils/elles": "sont sorti(e)s"
      },
      "imparfait": {
        "je": "sortais",
        "tu": "sortais",
        "il/elle": "sortait",
        "nous": "sortions",
        "vous": "sortiez",
        "ils/elles": "sortaient"
      },
      "futur simple": {
        "je": "sortirai",
        "tu": "sortiras",
        "il/elle": "sortira",
        "nous": "sortirons",
        "vous": "sortirez",
        "ils/elles": "sortiront"
      }
    }
  },

  // --- VERBE PARTIR ---
  "partir": {
    "indicatif": {
      "présent": {
        "je": "pars",
        "tu": "pars",
        "il/elle": "part",
        "nous": "partons",
        "vous": "partez",
        "ils/elles": "partent"
      },
      "passé composé": {
        "je": "suis parti(e)",
        "tu": "es parti(e)",
        "il/elle": "est parti(e)",
        "nous": "sommes parti(e)s",
        "vous": "êtes parti(e)s",
        "ils/elles": "sont parti(e)s"
      },
      "imparfait": {
        "je": "partais",
        "tu": "partais",
        "il/elle": "partait",
        "nous": "partions",
        "vous": "partiez",
        "ils/elles": "partaient"
      },
      "futur simple": {
        "je": "partirai",
        "tu": "partiras",
        "il/elle": "partira",
        "nous": "partirons",
        "vous": "partirez",
        "ils/elles": "partiront"
      }
    }
  }
};

export default conjugaisons; 