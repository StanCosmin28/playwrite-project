# Playwright, explicat simplu (script pentru colegi)

La fiecare slide: ce e lucrul respectiv, în cuvinte simple, apoi de ce contează. Se citește de sus în jos, fără întrebări către public.

---

## 1. Titlu

Azi vorbim despre **Playwright**. E o bibliotecă gratuită de la Microsoft cu care **controlezi un browser din cod**: deschizi pagini, dai click, completezi formulare și verifici ce apare. Cu ea faci teste automate pentru site-uri, scripturi care fac lucruri pe web și, de curând, o folosesc și agenții AI. Cum scrie și pe slide, e automatizare de încredere pentru browser, de la teste end-to-end până la agenți AI care folosesc web-ul. Jos vedeți comanda de instalare și cele trei browsere pe care merge. Povestea are trei părți: ce problemă rezolvă, cum o folosești și cum a ajuns să fie folosită de AI.

## 2. Problema

Testele automate au o reputație proastă din trei motive.

- **Timpul.** Testul e un robot, iar robotul e mai rapid decât pagina. Apasă un buton care încă nu s-a încărcat și pică. Oamenii pun `sleep(3000)`, adică „stai trei secunde și speră”, și asta nu e o soluție.
- **Selectorii.** Un selector e felul în care robotul găsește un element. Dacă îl găsește după poziția din cod („al treilea div”), se schimbă designul și testul pică, deși site-ul merge.
- **Starea.** Testele se încurcă între ele. Unul rămâne logat, iar următorul pică din cauza asta.

Playwright a fost făcut ca să rezolve toate trei.

## 3. Ce este Playwright

Pe slide sunt patru cifre. **3 motoare de browser**: Chromium (Chrome și Edge), Firefox și WebKit (motorul Safari), cu browserul ascuns (headless) sau vizibil. **4 limbaje**: TypeScript/JavaScript, Python, Java și .NET. **Apache 2.0** = open source, făcut de Microsoft, gratuit și fără dependență de un furnizor. **1 pachet** care include runner-ul de teste, verificările, rapoartele, trace-urile și codegen, deci nu lipești zece unelte între ele. Jos scrie că a fost creat de inginerii care făcuseră înainte **Puppeteer** la Google.

## 4. Cum funcționează

Titlul slide-ului e „o linie deschisă, nu un telefon la fiecare click”. Sus e **WebDriver clasic** (modelul vechi, folosit de Selenium): cere, așteaptă, primește răspunsul. Fiecare comandă e un apel HTTP separat, iar ca să afle ce s-a schimbat, testul trebuie să întrebe din nou. Jos e **Playwright**: o singură conexiune persistentă. Comenzile merg într-o direcție, iar evenimentele vin înapoi singure, deci Playwright știe când se încarcă pagina, când navighezi sau când se termină o cerere. Nu ghicește. Pe lângă asta, vorbește cu fiecare browser în protocolul lui nativ (la Chromium, CDP). De aici vine o mare parte din stabilitatea lui.

## 5. Fiecare test primește un browser curat

Sunt trei noțiuni, una în alta:

- **Browser** = procesul de Chrome/Firefox/WebKit, pornit o singură dată pentru că e scump de pornit (~1 secundă).
- **Context** = un profil nou, ca o fereastră incognito, cu cookies și storage proprii. Se creează în milisecunde.
- **Page** = un tab, în interiorul contextului.

Fiecare test primește un context nou, deci testele nu se influențează între ele și pot rula **în paralel**. Asta rezolvă problema stării.

## 6. Cum începi

Titlul zice „de la zero la primul test în 60 de secunde”. `npm init playwright@latest` pune configurarea, un test de exemplu și un workflow de GitHub Actions. Apoi folosești cam patru comenzi:

- `npx playwright test` rulează toate testele, fără browser vizibil și în paralel,
- `--ui` deschide UI mode: vezi testele, te muți înapoi în timp prin ele și alegi un locator,
- `codegen <url>` **scrie testul în locul tău** în timp ce tu dai click pe site,
- `show-report` îți arată raportul HTML, cu trace pentru fiecare test picat.

Jos scrie că, dacă preferi editorul, extensia Playwright pentru VS Code rulează, depanează și înregistrează teste direct din bara laterală.

## 7. Cum arată un test

Orice test are trei pași: **mergi, găsești, verifici**. `page.goto` deschide pagina. `getByPlaceholder('What needs to be done?')` găsește căsuța după textul care se vede în ea, exact cum ai descrie-o unui coleg. `expect(...)` verifică rezultatul („mă aștept ca în listă să apară task-ul”). Iar `await` înseamnă doar „termină pasul ăsta înainte să treci la următorul”. În tot testul nu e niciun sleep.

## 8. Auto-waiting

Aici se rezolvă problema timpului. **Auto-waiting** = Playwright așteaptă singur ca elementul să fie gata. Înainte de un click verifică patru lucruri: elementul **se vede** (visible), **stă pe loc** (stable, nu e într-o animație), **e activ** (enabled, nu e gri) și **ar primi click-ul** (nu e acoperit de altceva, de exemplu de un pop-up). Dacă nu e gata, mai încearcă. La verificările cu `expect` face la fel, până la 5 secunde. Deci nu mai ai nevoie de sleep.

## 9. Locatori: găsește elementele ca un om

**Locator** = felul în care găsești un element pe pagină. Varianta fragilă caută după „adresa” din cod și se strică la orice schimbare de design. Varianta bună spune `getByRole('button', { name: 'Sign in' })`, adică „butonul care se numește Sign in”. Pe slide, în stânga, sunt cele două variante: **fragil** (un selector CSS lung, care se strică la orice schimbare de layout) și **rezistent** (`getByRole`, care supraviețuiește redesign-urilor și arată ce percep utilizatorii și cititoarele de ecran). În dreapta e ordinea recomandată: `getByRole` (buton, link, titlu), apoi `getByLabel` (câmpuri de formular), `getByText` sau `getByPlaceholder` (text vizibil), `getByTestId` (un atribut `data-testid` pus special pentru teste), iar CSS sau XPath doar ca ultimă soluție. Bonus: ce găsește Playwright după rol și nume găsește și un cititor de ecran, deci testele te împing spre un site mai accesibil. Jos, mai scrie că locatorii intră automat în Shadow DOM-ul deschis, fără sintaxă specială.

## 10. Șase superputeri

Mai are câteva lucruri care par aproape trișat.

- **Mock API** = site-ul cere date de la server, iar Playwright răspunde el cu ce date vrei tu. Testezi fără server sau simulezi o eroare.
- **Login o singură dată** = te loghezi o dată, salvezi sesiunea, iar toate testele pornesc deja logate.
- Restul pe scurt: se preface că e telefon sau alt oraș, compară screenshot-uri (vede greșeli vizuale), rulează în paralel și pe toate browserele.

## 11. Când pică un test

Titlul zice „time travel, nu ghicit”. **Trace** = înregistrarea completă a testului (fișierul `trace.zip`), ca o cutie neagră de avion. Are patru tab-uri: Actions, Network, Console și Source. În stânga sunt pașii cu timpul fiecăruia: `goto /checkout`, `fill` pe câmpul Card, iar ultimul, `click` pe buton, e cel picat, cu „timeout”. În mijloc se vede pagina în acel moment: butonul „Confirm order” e acoperit de un banner „We use cookies”. Eroarea de jos spune exact asta: bannerul de cookies interceptează click-ul. Înregistrarea se deschide cu `npx playwright show-trace trace.zip` sau o tragi pe trace.playwright.dev. Nu mai ghicești, vezi.

## 12. Demo live

Trei lucruri. **UI mode:** rulez testele și dau click pe un pas ca să văd cum arăta pagina atunci. **Codegen:** dau click pe site și codul se scrie singur. Și un test care arată **ce vede un AI** pe o pagină, două numere pe care le explic imediat.

## 13. Same engine. New driver.

Același motor, alt șofer. Tot ce am văzut (click-uri sigure, găsit elemente după nume, descrierea curată a paginii) e exact ce îi trebuie unui **agent AI**. Un agent AI = un AI care nu doar vorbește, ci **face lucruri**: intră pe site-uri, apasă, completează formulare. Până acum scriau oamenii scripturile, acum browserul îl poate conduce și un AI. Așa descrie și site-ul oficial: automatizare pentru testare, scripturi și agenți AI.

## 14. Ce vede un AI

Ca să folosească un site, un AI are nevoie de o descriere a paginii. Titlul slide-ului: „AI-ul are nevoie de sens, nu de HTML”. În stânga e ce întoarce `page.content()`, adică codul brut al paginii de GitHub: tot blocul acela e o singură iconiță, iar pagina are **427.350 de caractere**, în mare parte zgomot. AI-ul plătește pentru fiecare caracter, deci e scump și lent. În dreapta e ce întoarce `page.ariaSnapshot({ mode: 'ai' })`: doar **ce e pe pagină și cum se numește** (navigație, buton de căutare, link „Code”, titluri), în **51.117 caractere**. E aceeași listă pe care o folosesc cititoarele de ecran, cu **de aproximativ opt ori mai puțin text** și fără zgomot. Fiecare element are un **ref** (de exemplu `ref=e84`), ca AI-ul să poată spune „apasă pe e84”. Cifrele sunt măsurate pe github.com/microsoft/playwright, cu testul din demo.

## 15. Cum lucrează un agent AI

Titlul slide-ului: „bucla agentului: observă, gândește, acționează”. Are patru pași, scriși pe cerc: **1. Observe**, cu `browser_snapshot` (primește descrierea paginii), **2. Think**, unde modelul alege pasul următor, **3. Act**, cu `browser_click(ref=e84)` („apasă pe e84”), și **4. Execute**, unde Playwright așteaptă automat și apoi face click, cu verificările de la auto-waiting. Apoi o ia de la capăt. **MCP** = standardul prin care un AI se conectează la unelte ca Playwright, un fel de priză universală. `npx playwright mcp` îi dă unui AI acces la un browser, iar `init-agents` pregătește trei asistenți: unul planifică testele, unul le scrie, unul le repară. Sunt ajutoare, tot un om trebuie să verifice.

## 16. Ce să rețineți

Trei idei: **lasă Playwright să aștepte** (fără sleep), **caută elementele ca un om** (după rol și nume, nu după cod) și **când pică ceva, deschide înregistrarea** (trace). Aceleași lucruri care fac testele stabile fac posibil și ca un AI să folosească internetul. Mulțumesc! Dacă aveți întrebări, sunt aici.

---

## Cuvintele de știut (într-o frază)

| Cuvânt | Pe scurt |
|---|---|
| **E2E (end-to-end)** | Verifici aplicația exact cum ar folosi-o un om. |
| **Locator** | Felul în care găsești un element pe pagină. |
| **Auto-waiting** | Playwright așteaptă singur ca elementul să fie gata. |
| **Context** | Un profil curat, ca o fereastră incognito. |
| **Trace** | Înregistrarea testului, ca o cutie neagră de avion. |
| **Agent AI** | Un AI care face lucruri, nu doar vorbește. |
| **MCP** | Priza universală prin care un AI se conectează la unelte. |
