# Come aggiungere una serata al sito SPRITZZAMI

Guida per chi non ha mai toccato codice. Servono solo 2 cose:
**una cartella con le foto** + **4 righe in un file**.

---

## Passo 1 — Metti le foto nella cartella giusta

1. Apri la cartella del sito, poi vai in:
   `src` → `assets` → `events`
2. Dentro `events` crea una **nuova cartella** con un nome semplice,
   tutto minuscolo, senza spazi e senza accenti.
   Esempi buoni: `ferragosto-2026`, `spritz-al-parco`, `serata-garage`
   Esempi NO: `Festa d'Agosto`, `serata 15/07`, `Spritz al Parco`
3. Trascina dentro questa cartella **tutte le foto della serata**
   (formato `.jpg`, `.png` o `.webp` — vanno bene anche quelle del telefono).
4. Scegli la foto più bella e **rinominala `cover.jpg`** —
   sarà la copertina che si vede nella mappa e nella lista.
   (Se te lo dimentichi, il sito usa in automatico la prima foto
   della cartella — niente panico.)

**Bonus:** le foto nella galleria appaiono in ordine alfabetico
per nome file. Se vuoi decidere l'ordine, rinominale tipo
`01.jpg`, `02.jpg`, `03.jpg`…

Fatto. Non serve altro per le foto.

---

## Passo 2 — Registra la serata nel file degli eventi

1. Apri il file `src/data/events.json` con un qualsiasi editor di testo
   (va benissimo Blocco Note, o VS Code se ce l'hai).
2. Vedrai una lista di serate tra parentesi quadre `[ ]`.
   Ogni serata è un blocco tra graffe `{ }`.
3. Copia questo blocco, incollalo in cima alla lista (subito dopo la `[`)
   e compila i campi:

```json
{
  "slug": "ferragosto-2026",
  "title": "Ferragosto sul Naviglio",
  "venue": "Darsena del Naviglio",
  "city": "Milano",
  "date": "2026-08-15",
  "coords": [45.4518, 9.1735],
  "description": "Due righe sulla serata, come le scriveresti a un amico.",
  "driveUrl": "https://drive.google.com/drive/folders/INCOLLA-ID-QUI"
},
```

### Cosa significa ogni campo

| Campo | Cosa scriverci |
|---|---|
| `slug` | Il **nome esatto della cartella** delle foto (quello del Passo 1). Deve essere identico, lettera per lettera. |
| `title` | Il nome della serata, come vuoi che appaia sul sito. |
| `venue` | Il nome del locale o del posto. |
| `city` | La città (di solito `Milano`). |
| `date` | La data in formato `ANNO-MESE-GIORNO`. Occhio: `15 agosto 2026` si scrive `2026-08-15`. |
| `coords` | Le coordinate del posto — vedi Passo 3. |
| `description` | Una o due frasi sulla serata. |
| `driveUrl` | Facoltativo: link alla cartella Drive della serata. Se lo inserisci, nel popup sulla mappa compare il pulsante “Apri cartella Drive”. |

### Regole d'oro per non rompere il file

- Ogni parola va **tra virgolette** `"` (tranne le coordinate).
- Ogni blocco `{ }` finisce con una **virgola** `,` — tranne l'ultimo della lista.
- Non cancellare le parentesi quadre `[` all'inizio e `]` alla fine.

### Come copiare il link di Google Drive

1. Apri la cartella della serata su Google Drive e premi **Condividi**.
2. In “Accesso generale” scegli **Chiunque abbia il link** e lascia il ruolo
   **Visualizzatore**. Così chi apre il sito può vedere la cartella senza
   poter modificare i file.
3. Premi **Copia link** e incollalo al posto dell'indirizzo di esempio in
   `driveUrl`. Se non vuoi condividere una cartella, elimina la riga
   `driveUrl` dall'evento.

Con “Chiunque abbia il link”, la cartella è accessibile a chiunque riceva
quel link: condividi solo foto che vuoi rendere visibili.

---

## Passo 3 — Trova le coordinate del locale

1. Vai su **maps.google.com** e cerca il locale.
2. Fai **tasto destro** sul puntino esatto → nel menu che si apre,
   in cima vedi due numeri tipo `45.4518, 9.1735`.
3. Cliccali: vengono copiati. Incollali in `coords` tra parentesi
   quadre: `"coords": [45.4518, 9.1735],`

---

## Come funziona la data (è automatico)

- **Data nel futuro** → la serata appare sulla mappa E in
  "Prossime serate" col badge PRESTO.
- **Data nel passato** → appare sulla mappa e nell'archivio,
  e cliccando si apre la galleria con le foto.

Quindi: quando annunci una serata la metti con data futura;
dopo la serata carichi le foto nella stessa cartella — appena
passa la data, il sito la tratta da solo come serata passata.

---

## Passo 4 — Vedi il risultato

Se hai il progetto sul computer:

```bash
npm run dev
```

e apri `http://localhost:5173` — le modifiche si vedono subito
(salva il file `events.json` e ricarica la pagina).

Per mettere online la versione aggiornata:

```bash
npm run build
```

e carica la cartella `dist/` dove è ospitato il sito
(oppure, se il sito è collegato a GitHub/Netlify/Vercel,
basta fare push delle modifiche e si pubblica da solo).

---

## Cambiare email, Instagram o altri contatti

Apri `src/config.ts` — ci sono tre righe da modificare:
`email`, `instagramUrl`, `city`. Salva e basta.

---

## Se qualcosa non va

- **La serata non appare sulla mappa** → controlla che `slug` sia
  identico al nome della cartella e che le coordinate siano due
  numeri con il punto (`45.4518`, non `45,4518`).
- **Le foto non si vedono** → controlla che siano dentro
  `src/assets/events/<slug>/` e che i nomi file non abbiano
  caratteri strani. La copertina deve chiamarsi `cover.jpg`.
- **Il sito non parte più / pagina bianca** → quasi sicuramente
  manca una virgola o una graffa in `events.json`. Ricontrolla
  l'ultimo blocco che hai aggiunto.
- **Hai dubbi** → manda uno screenshot del file `events.json`
  a chi ti ha fatto il sito.
