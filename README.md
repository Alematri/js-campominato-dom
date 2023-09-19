Campo Minato
===
## Consegna
Consegna
Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco (attenzione: non bisogna copiare tutta la cartella dell’esercizio ma solo l’index.html, e le cartelle js/ css/ con i relativi script e fogli di stile, per evitare problemi con l’inizializzazione di git).
Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe. Attenzione: nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.
In seguito l’utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina. Altrimenti la cella cliccata si colora di azzurro e l’utente può continuare a cliccare sulle altre celle.
La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba, fare visulaizzare tutte le bombe in gliglia e congelare la griglia.
BONUS:
Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
- difficoltà 1 ⇒ 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
- difficoltà 2 ⇒ 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
- difficoltà 3 ⇒ 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;
===
## Procedimento Consegna

**1** Definizione delle variabili globali:

container delle celle (container)
menu a discesa per la difficoltà (levelSelect)
pulsante "Play" (playButton)
Let per gli stati del gioco (numCells, numRows, numBombs, bombPositions, cellsClicked).

**2** Aggiungere un event listener al pulsante "Play"

**3** Funzione startGame per iniziare il gioco quando viene clickato il pulsante Play. Lettura del livello di difficoltà selezionato.

**4** Funzione generateBombPositions per generare posizioni casuali per le bombe:

Utilizzare un ciclo while per aggiungere posizioni casuali non duplicate all'array bombPositions fino a quando il numero desiderato di bombe (totalBombs) è stato raggiunto.

**5** Funzione init per inizializzare il gioco:

Utilizza un ciclo for per creare e aggiungere le celle al container (container). Per ogni cella, viene aggiunto un event listener per gestire il clic (click) sulla cella utilizzando la funzione handleClick.

**6** Funzione createSquare per creare le celle:

createSquare crea una cella del campo minato come un elemento <div>. Assegna la classe CSS "square" e un identificatore univoco (squareID) a ciascuna cella.

**7** Funzione reset per ripristinare il gioco:

reset rimuove tutte le celle dal container (container), reimpostando così il campo minato allo stato iniziale.

**8** Funzione endGame per terminare il gioco:

const squares = document.querySelectorAll('.square'); seleziona tutte le celle con la classe CSS ".square".
squares.forEach(square => square.removeEventListener('click', handleClick)); rimuove l'event listener per il clic da ciascuna cella, impedendo ulteriori interazioni con il campo minato.
const clicksBeforeBomb = cellsClicked; calcola il numero di celle cliccate prima di colpire una bomba.
Se il gioco è stato perso, viene mostrato un messaggio di avviso con il numero di clic precedenti alla bomba e le bombe vengono evidenziate in rosso. L'alert include il messaggio "Hai perso!" seguito dal numero di punti ottenuti.
Se il gioco è stato vinto, viene mostrato un messaggio di vittoria con l'alert "Hai vinto!".

**9** Funzione handleClick per gestire il clic su una cella:

const squareID = this.squareID; ottiene l'identificatore univoco della cella cliccata.
Se l'identificatore della cella cliccata è presente nell'array bombPositions, significa che hai cliccato su una bomba:
La cella viene colorata di rosso (this.style.backgroundColor = 'red';).
Viene chiamata la funzione endGame(false) per dichiarare la sconfitta.
La funzione termina con return per evitare ulteriori azioni.
Se la cella cliccata non è una bomba:
La classe CSS "clicked" viene aggiunta alla cella (this.classList.add('clicked')) per evidenziare che è stata cliccata.
Incrementa il conteggio delle celle cliccate (cellsClicked).
Se hai cliccato su tutte le celle non bombe (il numero di celle cliccate è uguale al numero di celle totali meno il numero di bombe), viene chiamata la funzione endGame(true) per dichiarare la vittoria.

**TO DO**
Bonus:
Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
- difficoltà 1 ⇒ 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
- difficoltà 2 ⇒ 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
- difficoltà 3 ⇒ 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;

Update grafici:
- Spostare gli allert del risultato in un div in modo da comparire nella pagina.
- Nascondere il container, finche non viene premuto il pulsante Play, al suo posto inserire della grafica.
- Sistemare il responsive della pagina.
- Scegliere colori un pò meno tristi.
