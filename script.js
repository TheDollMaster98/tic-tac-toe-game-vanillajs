// Anno corrente
document.addEventListener("DOMContentLoaded", function () {
  // Ottieni l'elemento con l'ID "currentYear"
  const currentYearElement = document.getElementById("currentYear");
  // Ottieni l'anno corrente
  const currentYear = new Date().getFullYear();
  // Inserisci l'anno corrente nell'elemento
  currentYearElement.textContent = currentYear;
});

// Cambio il nome del copyright
document.addEventListener("DOMContentLoaded", function () {
  const companyNameElement = document.getElementById("companyName");
  companyNameElement.textContent = "The DollMaster";
});

// Prendo gli elementi HTML
document.addEventListener("DOMContentLoaded", () => {
  const board = document.getElementById("game-board");
  const resultDisplay = document.getElementById("result");
  const continueButton = document.getElementById("continueButton");
  const resetButton = document.getElementById("resetButton");
  const scoreXDisplay = document.getElementById("scoreX");
  const scoreODisplay = document.getElementById("scoreO");
  const playerXNameInput = document.getElementById("playerX");
  const playerONameInput = document.getElementById("playerO");
  const setNamesButton = document.getElementById("setNamesButton");

  // Variabili iniziali
  let cells = [];
  let currentPlayer = "X";
  let winner = null;
  let scoreX = 0;
  let scoreO = 0;

  // Crea la griglia di gioco:
  function createGameBoard() {
    for (let i = 0; i < 9; i++) {
      // Div che contiene la cella
      const cell = document.createElement("div");
      // Aggiungo la classe css per creare la singola cella
      // Lo uso per aggiungere il css della X / O.
      cell.classList.add("cell");
      // Salvo l'indice numerico convertito in stringa sulla griglia
      // Lo uso per memorizzare l'indice della cella all'interno di un array
      // e come riferimento
      cell.dataset.index = i.toString();
      // Aggiungo il div nell'array
      cells.push(cell);
      // Aggiungo cell in versione HTML dentro l'HTML di board
      // in modo da usare un singolo div
      board.appendChild(cell);
      // Aggiungo il click alla cella
      cell.addEventListener("click", () => handleCellClick(i));
    }
  }

  // Gestisce il click su una cella di gioco
  function handleCellClick(index) {
    if (cells[index].textContent || winner) return;

    cells[index].textContent = currentPlayer;
    cells[index].classList.add(currentPlayer.toLowerCase());

    if (checkWin()) {
      winner = currentPlayer;

      if (winner === "X") {
        winner = playerXNameInput.value || "X";
        scoreX++;
      } else {
        winner = playerONameInput.value || "O";
        scoreO++;
      }

      document.getElementById("result").textContent = `${winner} ha vinto!`;

      updateScores();
      showContinueButton();
    } else if (cells.every((cell) => cell.textContent)) {
      winner = "Nessuno";
      document.getElementById("result").textContent =
        "Il gioco è finito in pareggio!";
      showContinueButton();
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  }

  // Verifica se qualcuno ha vinto
  function checkWin() {
    // Creo la matrice 3 x 3, sarà la nostra griglia di gioco
    const winPatterns = [
      [0, 1, 2], // prima riga →
      [3, 4, 5], // seconda riga →
      [6, 7, 8], // terza riga →
      [0, 3, 6], // prima colonna ↓
      [1, 4, 7], // seconda colonna ↓
      [2, 5, 8], // terza colonna ↓
      [0, 4, 8], // prima diagonale ➘
      [2, 4, 6], // seconda diagonale ➚
    ];
    // Controllo se contengono il giusto valore
    for (const pattern of winPatterns) {
      // Prendo i 3 indici vincenti
      const [a, b, c] = pattern;
      // Controllo se contengono lo stesso testo X / O
      // dicendo che se l'elemento della cella A, è uguale a B ed è uguale a C
      // ritorna true per la vittoria
      if (
        cells[a].textContent &&
        cells[a].textContent === cells[b].textContent &&
        cells[a].textContent === cells[c].textContent
      ) {
        return true;
      }
    }

    return false;
  }

  // Aggiorna i punteggi dei giocatori
  function updateScores() {
    if (!playerXNameInput.value) {
      // In caso il nome del giocatore X sia vuoto, gestisci questa situazione
    }

    scoreXDisplay.textContent = `${
      playerXNameInput.value || "Giocatore X"
    }: ${scoreX}`;
    scoreODisplay.textContent = `${
      playerONameInput.value || "Giocatore O"
    }: ${scoreO}`;
  }

  // Mostra il pulsante "Continua"
  function showContinueButton() {
    continueButton.classList.remove("disabled");
    continueButton.addEventListener("click", () => {
      startNewGame();
      // Resetta il risultato
      document.getElementById("result").textContent = "";
    });
  }

  // Nasconde il pulsante "Continua"
  function hideContinueButton() {
    continueButton.classList.add("disabled");
  }

  // Inizia una nuova partita
  function startNewGame() {
    cells.forEach((cell) => {
      cell.textContent = "";
      cell.classList.remove("x", "o");
    });

    resultDisplay.textContent = "";
    currentPlayer = "X";
    winner = null;
    hideContinueButton();
  }

  continueButton.addEventListener("click", startNewGame);
  // Gestisce il clic sul pulsante "Reset":
  resetButton.addEventListener("click", () => {
    scoreX = 0;
    scoreO = 0;
    playerXNameInput.value = null;
    playerONameInput.value = null;
    updateScores();
    startNewGame();
  });

  // Imposta i nomi dei giocatori:
  setNamesButton.addEventListener("click", () => {
    scoreX = 0;
    scoreO = 0;
    updateScores();
    startNewGame();
  });

  // Chiama la funzione per creare la griglia di gioco
  createGameBoard();
});
