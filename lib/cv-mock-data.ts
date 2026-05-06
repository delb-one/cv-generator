import type { CVData } from "./cv-types";
import { GDPR_DEFAULT_TEXT } from "./cv-types";

export const mockCVData: CVData = {
  datiPersonali: {
    nome: "Luca",
    cognome: "Ferrari",
    dataNascita: "03/11/1990",
    luogoNascita: "Bologna, Italia",
    nazionalita: "Italiana",
    indirizzo: "Via Giuseppe Mazzini 12, 40137 Bologna (BO)",
    telefono: "+39 331 7829451",
    email: "luca.ferrari.dev@gmail.com",
    linkedin: "linkedin.com/in/luca-ferrari-dev",
    github: "github.com/lucaferrari-dev",
    sitoWeb: "lucaferrari.dev",
    foto: null,
    fotoOffsetX: 0,
    fotoOffsetY: 0,
  },

  profiloProfessionale:
    "Backend Developer con 6+ anni di esperienza nello sviluppo di API scalabili e sistemi distribuiti. Specializzato in Node.js, microservizi e architetture cloud (AWS). Forte attenzione alla sicurezza, performance e manutenibilità del codice. Esperienza nella progettazione di sistemi ad alta disponibilità e nella gestione di pipeline CI/CD.",

  esperienze: [
    {
      id: "exp1",
      ruolo: "Backend Developer",
      azienda: "Reply S.p.A.",
      citta: "Milano (MI)",
      dataInizio: "01/03/2023",
      dataFine: "",
      inCorso: true,
      descrizione:
        "Sviluppo e manutenzione di microservizi in Node.js e TypeScript. Implementazione di API REST e GraphQL. Deploy su AWS (Lambda, ECS).",
    },
    {
      id: "exp2",
      ruolo: "Software Engineer",
      azienda: "Alten Italia",
      citta: "Torino (TO)",
      dataInizio: "05/01/2021",
      dataFine: "28/02/2023",
      inCorso: false,
      descrizione:
        "Progettazione backend per applicazioni enterprise. Integrazione con database PostgreSQL e MongoDB. Introduzione pipeline CI/CD con GitLab.",
    },
    {
      id: "exp3",
      ruolo: "Junior Developer",
      azienda: "Deloitte Digital",
      citta: "Bologna (BO)",
      dataInizio: "01/09/2019",
      dataFine: "31/12/2020",
      inCorso: false,
      descrizione:
        "Supporto allo sviluppo di applicazioni web full stack. Collaborazione in team Agile (Scrum).",
    },
  ],

  istruzione: [
    {
      id: "edu1",
      titolo: "Laurea Magistrale in Informatica",
      istituto: "Università di Bologna",
      citta: "Bologna",
      annoInizio: "2015",
      annoFine: "2018",
      voto: "110/110 e Lode",
      descrizione:
        "Specializzazione in sistemi distribuiti e sicurezza informatica. Tesi su architetture a microservizi.",
    },
    {
      id: "edu2",
      titolo: "Laurea Triennale in Informatica",
      istituto: "Università di Bologna",
      citta: "Bologna",
      annoInizio: "2012",
      annoFine: "2015",
      voto: "102/110",
      descrizione: "",
    },
  ],

  competenzeDigitali: [
    {
      id: "skill1",
      nome: "Node.js, TypeScript",
      livello: "Avanzato",
    },
    {
      id: "skill2",
      nome: "Microservizi, REST, GraphQL",
      livello: "Avanzato",
    },
    {
      id: "skill3",
      nome: "AWS (Lambda, S3, ECS, DynamoDB)",
      livello: "Avanzato",
    },
    {
      id: "skill4",
      nome: "Docker, Kubernetes",
      livello: "Intermedio",
    },
    {
      id: "skill5",
      nome: "PostgreSQL, MongoDB",
      livello: "Avanzato",
    },
    {
      id: "skill6",
      nome: "CI/CD, GitLab, GitHub Actions",
      livello: "Intermedio",
    },
    {
      id: "skill7",
      nome: "Python",
      livello: "Base",
    },
  ],

  competenzePersonali:
    "Ottime capacità analitiche e problem solving. Abituato a lavorare in team Agile e a gestire progetti complessi. Attitudine al miglioramento continuo e alla condivisione delle conoscenze. Precisione e attenzione alla qualità del codice.",

  linguaMadre: "Italiano",

  altrelingue: [
    {
      id: "lang1",
      lingua: "Inglese",
      ascolto: "C1",
      lettura: "C1",
      interazione: "B2",
      produzione: "B2",
      scrittura: "B2",
    },
    {
      id: "lang2",
      lingua: "Spagnolo",
      ascolto: "B1",
      lettura: "B1",
      interazione: "A2",
      produzione: "A2",
      scrittura: "A2",
    },
  ],

  certificazioni: [
    {
      id: "cert1",
      nome: "AWS Certified Developer – Associate",
      ente: "Amazon Web Services",
      anno: "2024",
    },
    {
      id: "cert2",
      nome: "Docker Certified Associate",
      ente: "Docker Inc.",
      anno: "2023",
    },
  ],

  patente: ["B"],

  hobby:
    "Appassionato di tecnologia e sistemi distribuiti. Nel tempo libero contribuisco a progetti open source e sviluppo side-project. Mi piace correre e fare trekking in montagna. Interesse per la cybersecurity e la divulgazione tech.",

  firma: {
    luogo: "Bologna",
    data: "2025-01-10",
    includiGDPR: true,
    testoGDPR: GDPR_DEFAULT_TEXT,
  },

  temaId: "modern",
};
