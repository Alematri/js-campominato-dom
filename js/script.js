// Variabili globali
const container = document.querySelector('.container-cs'); // Selezioniamo il container delle celle
const levelSelect = document.getElementById('level'); // Selezioniamo il menu a discesa per la difficoltà
const playButton = document.getElementById('play'); // Selezioniamo il pulsante "Play"
let numCells, numRows, numBombs, bombPositions, cellsClicked; // Variabili per il gioco

// Aggiungiamo un event listener al pulsante "Play" che avvierà il gioco
playButton.addEventListener('click', startGame);

// Funzione per iniziare il gioco
function startGame() {
    const selectedLevel = parseInt(levelSelect.value); // Otteniamo il livello di difficoltà selezionato come un numero intero

    // Impostazioni in base alla difficoltà selezionata
    if (selectedLevel === 1) {
        numCells = 100;
        numRows = 10;
        numBombs = 16;
    } else if (selectedLevel === 2) {
        numCells = 81;
        numRows = 9;
        numBombs = 16;
    } else if (selectedLevel === 3) {
        numCells = 49;
        numRows = 7;
        numBombs = 16;
    }

    bombPositions = generateBombPositions(numCells, numBombs); // Generiamo le posizioni delle bombe
    cellsClicked = 0; // Inizializziamo il conteggio delle celle cliccate a 0

    reset(); // Reimpostiamo il gioco
    init(); // Inizializziamo il gioco
}

// Funzione per generare posizioni casuali per le bombe
function generateBombPositions(totalCells, totalBombs) {
    const bombPositions = [];

    while (bombPositions.length < totalBombs) {
        const randomPosition = Math.floor(Math.random() * totalCells) + 1;
        if (!bombPositions.includes(randomPosition)) {
            bombPositions.push(randomPosition);
        }
    }

    return bombPositions;
}

// Funzione per inizializzare il gioco
function init() {
    for (let i = 1; i <= numCells; i++) {
        const square = createSquare(i);

        square.addEventListener('click', handleClick); // Aggiungiamo un event listener per il clic su ogni cella

        container.appendChild(square); // Aggiungiamo la cella al container
    }
}

// Funzione per creare una cella
function createSquare(i) {
    const newSquare = document.createElement('div'); // Creiamo un elemento div per la cella
    newSquare.className = 'square'; // Assegnamo la classe CSS .square
    newSquare.squareID = i; // Assegnamo un identificatore univoco alla cella
    return newSquare;
}

// Funzione per ripristinare il gioco
function reset() {
    container.innerHTML = ''; // Rimuoviamo tutte le celle dal container
}

// Funzione per terminare il gioco
function endGame(isWin) {
  // Blocciamo la griglia rimuovendo l'event listener per il clic su ogni cella
  const squares = document.querySelectorAll('.square');
  squares.forEach(square => square.removeEventListener('click', handleClick));

  // Calcoliamo il numero di caselle cliccate prima di colpire una bomba
  const clicksBeforeBomb = cellsClicked - 1; // Sottraiamo 1 perché la bomba è stata colpita

  // Se non hai vinto, mostriamo tutte le bombe e il numero di clic precedenti alla bomba
  if (!isWin) {
      bombPositions.forEach(position => {
          const square = document.querySelector(`.square[squareID="${position}"]`);
          if (square) {
              square.style.backgroundColor = 'yellow';
          }
      });

      alert(`Hai perso! Hai totalizzato ${clicksBeforeBomb +1} punti.`);
  } else {
      alert('Hai vinto!');
  }
}

// Funzione per gestire il clic su una cella
function handleClick() {
    const squareID = this.squareID;

    if (bombPositions.includes(squareID)) {
        // Hai cliccato su una bomba, il gioco finisce
        this.style.backgroundColor = 'red';
        endGame(false);
        return; // Termina la funzione per evitare ulteriori azioni
    }

    // Non è una bomba, continua il gioco
    this.classList.add('clicked');
    cellsClicked++;

    if (cellsClicked === numCells - numBombs) {
        // Hai vinto, hai cliccato su tutte le celle non bombe
        endGame(true);
    }
}

