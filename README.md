# Using Playwright

Prezentare + demo-uri pentru cursul „Using Playwright".
Playwright este o bibliotecă gratuită de la Microsoft cu care controlezi un browser din cod: teste automate, scripturi și, de curând, agenți AI.

## Ce găsești aici

| Ce | Unde |
|---|---|
| Prezentarea (16 slide-uri, se deschide în browser) | [`using-playwright.html`](using-playwright.html) |
| Aceeași prezentare ca PowerPoint, cu speaker notes | [`using-playwright.pptx`](using-playwright.pptx) |
| Demo-urile (4 teste care rulează live) | [`demo/`](demo) |
| Scriptul explicat, slide cu slide | [`SCRIPT-EXPLICAT.md`](SCRIPT-EXPLICAT.md) |

## 1. Vezi prezentarea

**Online (GitHub Pages):** `https://stancosmin28.github.io/playwrite-project/`
Linkul merge după ce activezi Pages: *Settings → Pages → Branch: `main`, folder `/ (root)` → Save*. Durează aproximativ un minut.

**Local:** deschide `using-playwright.html` în Chrome, Edge sau Safari. Nu are nevoie de instalare. Cere internet doar pentru fonturi, iar fără el folosește fonturile din sistem.

**Taste în prezentare:**

| Tastă | Ce face |
|---|---|
| `→` / `Space` / click | slide-ul următor |
| `←` | slide-ul anterior |
| `F` | ecran complet |
| `O` sau `Esc` | privire de ansamblu cu toate slide-urile |
| `P` | fereastră de prezentator: notițe, cronometru, slide-ul următor |
| `T` | temă luminoasă / întunecată |
| `?` | arată sau ascunde lista de taste |

## 2. Rulează demo-urile

### Ce îți trebuie

- **Node.js 18 sau mai nou** (verifică cu `node -v`). Dacă nu îl ai: <https://nodejs.org>
- Conexiune la internet. Testele deschid site-uri reale: `demo.playwright.dev` și `github.com`.

Testat cu Node 22 și Playwright 1.64.

### Instalare (o singură dată)

```bash
git clone https://github.com/StanCosmin28/playwrite-project.git
cd playwrite-project/demo
npm ci
npx playwright install chromium
```

`npx playwright install chromium` descarcă browserul pe care îl controlează Playwright (aproximativ 150 MB). Pe Linux, dacă lipsesc biblioteci de sistem, folosește `npx playwright install --with-deps chromium`.

> **Important:** toate comenzile de mai jos se rulează **din folderul `demo/`**, nu din rădăcina repo-ului. Din alt folder, `npx` nu găsește Playwright și apare eroarea „Playwright Test did not expect test() to be called here".

### Rularea tuturor testelor

```bash
npx playwright test
```

Rezultat așteptat: `4 passed`, în aproximativ 3 secunde. Testele rulează fără fereastră de browser, în fundal.

### Demo 1: UI mode (cel mai vizual)

```bash
npm run ui
```

Se deschide o fereastră cu lista testelor.

1. Dă click pe ▶ lângă `1-todo.spec.ts`.
2. Dă click pe un pas din lista din stânga (de exemplu `fill`). Pagina din mijloc se întoarce exact în momentul acelui pas, ca la o înregistrare video.
3. Deschide tab-urile **Network** și **Console** ca să vezi ce s-a întâmplat în spate.

Ce demonstrează: nu ghicești de ce pică un test, vezi pagina în fiecare moment.

### Demo 2: Codegen (codul se scrie singur)

```bash
npm run codegen
```

Se deschid două ferestre: un browser pe TodoMVC și inspectorul Playwright.

1. În browser, scrie `Buy milk` în căsuță și apasă Enter.
2. Bifează task-ul.
3. În inspector, codul apare singur, linie cu linie. Îl poți copia într-un fișier de test.

Ce demonstrează: nu scrii testul de la zero, îl înregistrezi.

### Demo 3: Ce vede un AI pe o pagină

```bash
npx playwright test 3-ai-view
```

Testul deschide pagina de GitHub a proiectului Playwright și compară două lucruri:

- codul HTML brut al paginii (`page.content()`), de aproximativ 430.000 de caractere;
- descrierea semantică pentru AI (`page.ariaSnapshot({ mode: 'ai' })`), de aproximativ 53.000 de caractere.

Se afișează în terminal, plus primele 15 rânduri din descriere, cu `[ref=eN]` pe fiecare element. Raportul este de aproximativ **8×** mai puțin text. Numerele variază puțin de la o rulare la alta, pentru că GitHub își schimbă pagina.

Dacă GitHub răspunde greu, deschide `demo/tests/3-ai-view.spec.ts`, înlocuiește adresa din `page.goto` cu `https://www.bbc.com/news` și rulează din nou.

### Demo 4: Mock de API

```bash
npx playwright test 2-mock
```

Testul interceptează cererea site-ului către server și răspunde el cu două fructe inventate, „Mango" și „Playwright Kiwi". Site-ul le afișează ca și cum ar veni de la server.

### Vezi testele rulând în browser (headed)

```bash
npx playwright test --headed
```

Browserul se deschide și vezi cum se mișcă singur. Testele sunt foarte rapide (aproximativ o secundă fiecare), așa că pentru a vedea pașii pe îndelete folosește UI mode (Demo 1).

### Raportul HTML și trace-urile

După orice rulare:

```bash
npm run report
```

Se deschide un raport în browser. Dă click pe un test, apoi pe **Traces**, ca să vezi înregistrarea completă, cu pagina, rețeaua și consola la fiecare pas. Configurația din `playwright.config.ts` salvează trace la fiecare test, special pentru demo.

## 3. Cum sunt făcute testele

| Fișier | Ce testează |
|---|---|
| [`demo/tests/1-todo.spec.ts`](demo/tests/1-todo.spec.ts) | Adaugă două task-uri pe TodoMVC, bifează unul, verifică numărătoarea și filtrul „Completed". |
| [`demo/tests/2-mock.spec.ts`](demo/tests/2-mock.spec.ts) | Mock de API cu `page.route`, apoi verifică că datele false apar pe pagină. |
| [`demo/tests/3-ai-view.spec.ts`](demo/tests/3-ai-view.spec.ts) | Compară HTML-ul brut cu ARIA snapshot-ul, apoi verifică structura semantică cu `toMatchAriaSnapshot`. |

Configurația este în [`demo/playwright.config.ts`](demo/playwright.config.ts). Acolo sunt comentate și rândurile pentru Firefox, WebKit și telefon (iPhone 15 Pro). Dacă le decomentezi, rulează testele pe toate. Pentru Firefox și WebKit rulează întâi `npx playwright install firefox webkit`.

## Probleme frecvente

| Problemă | Soluție |
|---|---|
| `Playwright Test did not expect test() to be called here` | Ești în folderul greșit. Fă `cd demo` și rulează din nou. |
| `Executable doesn't exist ...` | Lipsește browserul. Rulează `npx playwright install chromium`. |
| Un test pică cu timeout pe `github.com` sau `demo.playwright.dev` | Verifică internetul. Pentru GitHub, folosește adresa de rezervă BBC, descrisă mai sus. |
| `npm ci` se plânge de lipsa `package-lock.json` | Rulează din `demo/`, acolo este fișierul. |

## Licență și surse

Demo-urile folosesc site-urile oficiale de test ale Playwright (`demo.playwright.dev`). Playwright este open source, licență Apache 2.0: <https://playwright.dev>
