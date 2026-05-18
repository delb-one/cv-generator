export interface DatiPersonali {
  nome: string;
  cognome: string;
  dataNascita: string;
  luogoNascita: string;
  nazionalita: string;
  indirizzo: string;
  telefono: string;
  email: string;
  linkedin: string;
  github: string;
  sitoWeb: string;
  foto: string | null; // base64 data URL
  fotoOffsetX: number; // percentage offset for positioning (-50 to 50)
  fotoOffsetY: number; // percentage offset for positioning (-50 to 50)
}

export interface EsperienzaLavorativa {
  id: string;
  ruolo: string;
  azienda: string;
  citta: string;
  dataInizio: string;
  dataFine: string;
  inCorso: boolean;
  descrizione: string;
}

export interface Istruzione {
  id: string;
  titolo: string;
  istituto: string;
  citta: string;
  annoInizio: string;
  annoFine: string;
  voto: string;
  descrizione: string;
}

export type LivelloCEFR = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export interface Lingua {
  id: string;
  lingua: string;
  ascolto: LivelloCEFR;
  lettura: LivelloCEFR;
  interazione: LivelloCEFR;
  produzione: LivelloCEFR;
  scrittura: LivelloCEFR;
}

export type LivelloSkill = "Base" | "Intermedio" | "Avanzato";

export interface CompetenzaDigitale {
  id: string;
  nome: string;
  livello: LivelloSkill;
}

export interface Certificazione {
  id: string;
  nome: string;
  ente: string;
  anno: string;
}

export type CategoriaPatente =
  | "AM"
  | "A1"
  | "A2"
  | "A"
  | "B1"
  | "B"
  | "BE"
  | "C1"
  | "C"
  | "D1"
  | "D";

export interface CVTheme {
  id: string;
  nome: string;
  sidebar: string; // sidebar background
  accent: string; // headings, dates, links in main area
  accentLight: string; // light tint for table headers, badges bg
  cefrDark: string; // CEFR dark fill (C1/C2)
  timelineLine: string; // vertical timeline line
}

export const CV_THEMES: CVTheme[] = [
  {
    id: "europass",
    nome: "Europass Blu",
    sidebar: "#003399",
    accent: "#003399",
    accentLight: "#e3ecff",
    cefrDark: "#1a5fb4",
    timelineLine: "#d0d8e8",
  },
  {
    id: "slate",
    nome: "Antracite",
    sidebar: "#2d3748",
    accent: "#2d3748",
    accentLight: "#edf2f7",
    cefrDark: "#4a5568",
    timelineLine: "#cbd5e0",
  },
  {
    id: "teal",
    nome: "Verde Acqua",
    sidebar: "#0d7377",
    accent: "#0d7377",
    accentLight: "#e0f5f5",
    cefrDark: "#14a085",
    timelineLine: "#b2dfdb",
  },
  {
    id: "burgundy",
    nome: "Borgogna",
    sidebar: "#6d1a36",
    accent: "#6d1a36",
    accentLight: "#fce4ec",
    cefrDark: "#ad1457",
    timelineLine: "#f8bbd0",
  },
  {
    id: "forest",
    nome: "Foresta",
    sidebar: "#2e5339",
    accent: "#2e5339",
    accentLight: "#e8f5e9",
    cefrDark: "#388e3c",
    timelineLine: "#c8e6c9",
  },
  {
    id: "midnight",
    nome: "Notte",
    sidebar: "#1a1a2e",
    accent: "#4f46e5",
    accentLight: "#ede9fe",
    cefrDark: "#4338ca",
    timelineLine: "#ddd6fe",
  },
  {
  id: "minimal-light",
  nome: "Minimal Light",
  sidebar: "#f3f4f6",
  accent: "#6b7280",
  accentLight: "#f9fafb",
  cefrDark: "#4b5563",
  timelineLine: "#d1d5db",
},
{
  id: "soft-gray",
  nome: "Soft Gray",
  sidebar: "#e5e7eb",
  accent: "#9ca3af",
  accentLight: "#f3f4f6",
  cefrDark: "#6b7280",
  timelineLine: "#d6d9de",
},
{
  id: "stone",
  nome: "Stone",
  sidebar: "#ececec",
  accent: "#78716c",
  accentLight: "#fafaf9",
  cefrDark: "#57534e",
  timelineLine: "#d6d3d1",
},
];

export interface FirmaData {
  luogo: string;
  data: string;
  includiGDPR: boolean;
  testoGDPR: string;
}

export interface CVData {
  datiPersonali: DatiPersonali;
  profiloProfessionale: string;
  esperienze: EsperienzaLavorativa[];
  istruzione: Istruzione[];
  competenzeDigitali: CompetenzaDigitale[];
  competenzePersonali: string;
  linguaMadre: string;
  altrelingue: Lingua[];
  certificazioni: Certificazione[];
  patente: CategoriaPatente[];
  hobby: string;
  firma: FirmaData;
  temaId: string;
}

export const GDPR_DEFAULT_TEXT =
  "Autorizzo il trattamento dei dati personali contenuti nel mio curriculum vitae in base all'art. 13 del D. Lgs. 196/2003 e all'art. 13 del Regolamento UE 2016/679 relativo alla protezione delle persone fisiche con riguardo al trattamento dei dati personali nonché alla libera circolazione di tali dati.";

export const defaultCVData: CVData = {
  datiPersonali: {
    nome: "",
    cognome: "",
    dataNascita: "",
    luogoNascita: "",
    nazionalita: "",
    indirizzo: "",
    telefono: "",
    email: "",
    linkedin: "",
    github: "",
    sitoWeb: "",
    foto: null,
    fotoOffsetX: 0,
    fotoOffsetY: 0,
  },
  profiloProfessionale: "",
  esperienze: [],
  istruzione: [],
  competenzeDigitali: [],
  competenzePersonali: "",
  linguaMadre: "",
  altrelingue: [],
  certificazioni: [],
  patente: [],
  hobby: "",
  firma: {
    luogo: "",
    data: "",
    includiGDPR: true,
    testoGDPR: GDPR_DEFAULT_TEXT,
  },
  temaId: "europass",
};
