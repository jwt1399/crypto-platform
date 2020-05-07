const UP = 'UP',
DOWN = 'DOWN',
LEFT = 'LEFT',
RIGHT = 'RIGHT';

const board = {
  top: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm'],
  right: ['n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
  bottom: ['N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
  left: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'] };

const dim = board.top.length;

const mirrors = ["   LL  /L    ", "            L", "   /         ", "      L     L", "    L        ", "  /      /   ", "L  /      L  ", "     L       ", "L/           ", "/            ", "          L  ", "    L/       ", "   /       / "];

function processLetter(letter) {
  if (/\W/.test(letter)) {
    return letter;
  }
  let direction = getInitialDirection(letter),
  coords = getInitialCoordinates(letter),
  firstMove = true;

  do {
    if (firstMove) {
      coords = move(coords, direction);
      firstMove = false;
    } else {
      let row = mirrors[coords.y],
      mirror = row.split('')[coords.x];

      if (mirror === '/' || mirror === 'L') {
        direction = changeDirection(direction, mirror);
        coords = move(coords, direction);
      } else {
        coords = move(coords, direction);
      }
    }
  } while (reachedLetter(coords));

  return getProcessedLetter(coords);
}

function getInitialDirection(letter) {
  if (/[a-m]/.test(letter)) {
    return DOWN;
  }
  if (/[n-z]/.test(letter)) {
    return LEFT;
  }
  if (/[N-Z]/.test(letter)) {
    return UP;
  }
  if (/[A-M]/.test(letter)) {
    return RIGHT;
  }
}

function getInitialCoordinates(letter) {
  let x, y;
  for (let side in board) {
    let idx = board[side].indexOf(letter);
    if (!!~idx) {
      if (side === 'top') {
        x = idx;
        y = -1;
      } else if (side === 'right') {
        x = dim;
        y = idx;
      } else if (side === 'bottom') {
        x = idx;
        y = dim;
      } else {
        x = -1;
        y = idx;
      }
    }
  }
  return { x, y };
}

function move(coords, direction) {
  switch (direction) {
    case UP:
      return { x: coords.x, y: --coords.y };
    case DOWN:
      return { x: coords.x, y: ++coords.y };
    case RIGHT:
      return { x: ++coords.x, y: coords.y };
    case LEFT:
      return { x: --coords.x, y: coords.y };}

}

function reachedLetter(coords) {
  return !(coords.x === -1 ||
  coords.x === dim ||
  coords.y === -1 ||
  coords.y === dim);
}

function changeDirection(direction, mirror) {
  switch (direction) {
    case UP:
      return mirror === '/' ? RIGHT : LEFT;
    case DOWN:
      return mirror === '/' ? LEFT : RIGHT;
    case RIGHT:
      return mirror === '/' ? UP : DOWN;
    case LEFT:
      return mirror === '/' ? DOWN : UP;}

}

function getProcessedLetter(coords) {
  if (coords.y === 13) {
    return board.bottom[coords.x];
  } else if (coords.y === -1) {
    return board.top[coords.x];
  } else if (coords.x === 13) {
    return board.right[coords.y];
  } else {
    return board.left[coords.y];
  }
}

function processString(input) {
  return input.split('').
  map(processLetter).
  join('');
}

const process = document.getElementById('process');
const input = document.getElementById('input');
const output = document.getElementById('output');

process.onclick = function () {
  const userInput = input.value.trim();

  if (userInput.length > 0) {
    output.innerHTML = processString(userInput);
  }
};

function createUIGrid() {
  const grid = document.getElementById('grid');
  grid.appendChild(createLetterRow(board.top));

  mirrors.forEach((row, idx) => {
    const newRow = document.createElement('tr');
    const startLetter = document.createElement('td');
    const endLetter = document.createElement('td');

    startLetter.innerHTML = board.left[idx];
    newRow.appendChild(startLetter);

    row.split('').forEach(block => {
      const newBlock = document.createElement('td');
      newBlock.innerHTML = block === 'L' ? '\\' : block;
      newRow.appendChild(newBlock);
    });

    endLetter.innerHTML = board.right[idx];
    newRow.appendChild(endLetter);

    grid.appendChild(newRow);
  });

  grid.appendChild(createLetterRow(board.bottom));
}

function createLetterRow(arr) {
  const newRow = document.createElement('tr');
  newRow.appendChild(document.createElement('td'));
  arr.forEach(letter => {
    const newItem = document.createElement('td');
    newItem.innerHTML = letter;
    newRow.appendChild(newItem);
  });
  newRow.appendChild(document.createElement('td'));
  return newRow;
}
createUIGrid();