# Generatore CV Europass

Un'applicazione web moderna per creare e personalizzare il tuo curriculum vitae in formato **Europass** direttamente nel browser, con anteprima in tempo reale e esportazione in PDF.

## ✨ Funzionalità Principali

- **Form intuitivo e organizzato**: 6 tab per compilare tutte le sezioni del CV (dati personali, esperienze, istruzione, lingue, competenze, certificazioni)
- **Anteprima live Europass**: Visualizza in tempo reale come appare il tuo CV nel formato ufficiale Europass
- **Foto profilo**: Carica e posiziona la tua foto nel sidebar del CV
- **Gestione lingue con CEFR**: Specifica il livello di conoscenza per ogni lingua usando la scala CEFR (da A1 a C2) con tabella interattiva
- **Competenze digitali e personali**: Aggiungi competenze con livelli (Base, Intermedio, Avanzato)
- **Firma e data**: Includi il luogo, la data e una riga tratteggiata per la firma autografa
- **Clausola GDPR**: Aggiungi automaticamente la dichiarazione di consenso al trattamento dei dati personali, con testo modificabile
- **6 palette cromatiche**: Scegli tra 6 temi (Europass Blu, Antracite, Verde Acqua, Borgogna, Foresta, Notte) per personalizzare l'aspetto del CV
- **Esportazione PDF**: Scarica il CV completo in PDF ad alta qualità in formato A4

## 🚀 Come Iniziare

### Requisiti
- Node.js 18+ e pnpm (o npm/yarn)

### Installazione

1. **Clona il repository** 
   ```bash
   git clone <repository-url>
   cd cv-generator
   ```

2. **Installa le dipendenze**
   ```bash
   pnpm install
   ```

3. **Avvia il server di sviluppo**
   ```bash
   pnpm dev
   ```

4. **Apri il browser** e accedi a `http://localhost:3000`

## 📖 Come Usare

### Compilare il CV

1. **Tab "Dati Personali"**: Inserisci nome, cognome, contatti, indirizzo e carica la tua foto
2. **Tab "Esperienze"**: Aggiungi le tue esperienze lavorative con date, ruolo, azienda e descrizione
3. **Tab "Istruzione"**: Specifica i tuoi titoli di studio, istituto e date
4. **Tab "Lingue"**: Seleziona le lingue straniere e indica il tuo livello (A1–C2) per ogni competenza
5. **Tab "Competenze"**: Aggiungi competenze personali e digitali con i relativi livelli
6. **Tab "Altro"**: Inserisci profilo professionale, certificazioni, patente, hobby, firma/data e GDPR

### Personalizzazione

- **Tema colore**: Clicca sul pulsante del tema (pallino colorato) nell'header per scegliere una delle 6 palette
- **GDPR**: Attiva/disattiva la clausola GDPR o modifica il testo predefinito
- **Anteprima**: Il pannello destro mostra l'anteprima in tempo reale; su mobile puoi alternare tra form e anteprima

### Esportazione

1. Riempi il form con i tuoi dati
2. Clicca il pulsante **"Esporta PDF"** in alto a destra
3. Il file verrà scaricato come `CV_Europass_[Cognome]_[Nome].pdf`

## 🏗️ Struttura del Progetto

```
/app
  ├── page.tsx                    # Pagina principale (layout del form + anteprima)
  ├── layout.tsx                  # Root layout
  └── globals.css                 # Stili globali (design tokens)

/components
  ├── cv-form/
  │   ├── dati-personali-form.tsx    # Form dati personali
  │   ├── esperienze-form.tsx        # Form esperienze lavorative
  │   ├── istruzione-form.tsx        # Form istruzione
  │   ├── lingue-form.tsx            # Form lingue con grid CEFR
  │   ├── competenze-form.tsx        # Form competenze
  │   ├── certificazioni-form.tsx    # Form certificazioni, hobby, firma, GDPR
  │   └── tema-picker.tsx            # Selettore di tema
  └── cv-preview/
      └── europass-preview.tsx       # Anteprima Europass in tempo reale

/lib
  └── cv-types.ts                 # TypeScript types per CV, temi, dati GDPR

/hooks
  └── use-pdf-export.ts           # Hook per l'esportazione in PDF

/public                           # Assets statici (favicon, ecc.)
```

## 🛠️ Tecnologie Utilizzate

- **Next.js 16** — Framework React moderno con App Router
- **React 19** — Libreria UI
- **TypeScript** — Type safety
- **Tailwind CSS v4** — Utility-first CSS
- **shadcn/ui** — Componenti UI accessibili
- **html2canvas + jsPDF** — Generazione e download PDF
- **Lucide Icons** — Icone SVG
- **nanoid** — Generazione ID univoci

## 📝 Note Importanti

- **Privacy**: Tutti i dati del CV sono salvati solo nel browser (localStorage/state), nessun server
- **Formato Europass**: L'anteprima segue il layout ufficiale Europass con sidebar blu (o tema scelto) e main area bianca
- **Responsive**: Il design è ottimizzato per desktop e tablet; su mobile il form e l'anteprima si alternano
- **Multilingue**: L'interfaccia è in italiano; è possibile estendere il supporto per altre lingue

## 🎨 Palette Cromatiche Disponibili

| Tema | Colore Sidebar | Uso Consigliato |
|------|---|---|
| Europass Blu | `#003399` | Formato ufficiale, conservatore |
| Antracite | `#2d3748` | Professionale, moderno |
| Verde Acqua | `#0d7377` | Creativo, fresco |
| Borgogna | `#6d1a36` | Elegante, sofisticato |
| Foresta | `#2e5339` | Naturale, serio |
| Notte | `#1a1a2e` | Moderno, audace |

## 📄 Sezioni del CV

1. **Dati Personali**: Nome, cognome, data e luogo di nascita, nazionalità, contatti, foto
2. **Profilo Professionale**: Breve descrizione del tuo profilo
3. **Esperienza Professionale**: Ruolo, azienda, date, descrizione (con flag "In corso")
4. **Istruzione e Formazione**: Titolo, istituto, date, materia
5. **Lingue Straniere**: Con valutazione CEFR per 6 competenze (ascolto, lettura, interazione, produzione orale, scrittura)
6. **Competenze Personali**: Descrizione in testo libero
7. **Competenze Digitali**: Con livelli (Base, Intermedio, Avanzato)
8. **Certificazioni e Corsi**: Titolo, organizzazione, data
9. **Patente**: Selezione categorie
10. **Hobby e Interessi**: Testo libero
11. **Firma e Data**: Con riga tratteggiata per firma autografa
12. **Dichiarazione GDPR**: Clausola di consenso al trattamento dati (opzionale)

## 🚢 Deployment

L'app è pronta per il deployment su **Vercel**:

1. Connetti il repository GitHub
2. Vercel rileverà automaticamente Next.js
3. Configura le variabili d'ambiente (se necessarie)
4. Deploy con un click

Oppure usa altri provider (Netlify, GitHub Pages, ecc.) con `pnpm build` e `pnpm start`.

## 📦 Dipendenze Principali

```json
{
  "next": "^16.0.0",
  "react": "^19.0.0",
  "typescript": "^5.0.0",
  "tailwindcss": "^4.0.0",
  "nanoid": "^5.0.0",
  "html2canvas": "^1.4.1",
  "jspdf": "^2.5.2"
}
```

## 🤝 Contributi

Hai suggerimenti o vuoi aggiungere funzionalità? Apri una issue o una pull request!

Alcune idee di miglioramento:
- [ ] Supporto per più lingue dell'interfaccia
- [ ] Salvataggio automatico in cloud (Firebase, Supabase, ecc.)
- [ ] Modelli di CV alternativi (cronologico, funzionale, ibrido)
- [ ] Preview in tempo reale con scroll sincronizzato
- [ ] Importazione da file JSON/PDF esistenti



