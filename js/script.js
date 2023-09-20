// Variabili globali

 // Selezioniamo il container delle celle
const container = document.querySelector('.container-cs');
// Selezioniamo il menu a discesa per la difficoltà
const levelSelect = document.getElementById('level'); 
// Selezioniamo il pulsante "Play"
const playButton = document.getElementById('play');
// Variabili per il gioco
let numCells, numRows, numBombs, bombPositions, cellsClicked; 

// Aggiungiamo un event listener al pulsante "Play" che avvierà il gioco
playButton.addEventListener('click', startGame);

// Funzione per iniziare il gioco
function startGame() {
     // Facciamo comparire il container delle celle
    container.classList.remove('d-none');
     // Otteniamo il livello di difficoltà selezionato come un numero intero
    const selectedLevel = parseInt(levelSelect.value);

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

     // Generiamo le posizioni delle bombe
    bombPositions = generateBombPositions(numCells, numBombs);
     // Inizializziamo il conteggio delle celle cliccate a 0
    cellsClicked = 0;

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
         // Aggiungiamo un event listener per il clic su ogni cella
        square.addEventListener('click', handleClick);
         // Aggiungiamo la cella al container
        container.appendChild(square);
    }
}

// Funzione per creare una cella
function createSquare(i) {
    // Creiamo un elemento div per la cella
    const newSquare = document.createElement('div');
    // Assegnamo la classe CSS .square
    newSquare.className = 'square'; 
    // Assegnamo un identificatore univoco alla cella
    newSquare.squareID = i; 
    return newSquare;
}

// Funzione per ripristinare il gioco
function reset() {
    // Rimuoviamo tutte le celle dal container
    container.innerHTML = ''; 
}

// Funzione per terminare il gioco
function endGame(isWin) {
  // Blocciamo la griglia rimuovendo l'event listener per il clic su ogni cella
  const squares = document.querySelectorAll('.square');
  squares.forEach(square => square.removeEventListener('click', handleClick));

  const clicksBeforeBomb = cellsClicked;

  if (!isWin) {
    // Trova e colora di rosso tutte le celle contenenti bombe
    squares.forEach(square => {
      if (bombPositions.includes(square.squareID)) {
        square.classList.add('bomb');
        }
    });

      alert(`Hai perso! Hai totalizzato ${clicksBeforeBomb} punti.`);
  } else {
      alert('Hai vinto!');
  }
}

// Funzione per gestire il clic su una cella
function handleClick() {
    const squareID = this.squareID;

    if (bombPositions.includes(squareID)) {
        // Hai cliccato su una bomba, il gioco finisce
        this.classList.add('bomb');
        endGame(false);
        // Termina la funzione per evitare ulteriori azioni
        return; 
    }

    // Non è una bomba, continua il gioco
    this.classList.add('clicked');
    cellsClicked++;

    if (cellsClicked === numCells - numBombs) {
        // Hai vinto, hai cliccato su tutte le celle non bombe
        endGame(true);
    }
}

