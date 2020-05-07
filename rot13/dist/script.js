const αβ = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

const rotateChars = charsToRotate => char => {
  const index = αβ.indexOf(char.toLowerCase());
  let newChar = '';
  if (index !== -1) {
    const newIndex = index + charsToRotate >= αβ.length ? Math.abs(αβ.length - index - charsToRotate) : index + charsToRotate;
    newChar = αβ[newIndex];
    newChar = char === char.toUpperCase() ? newChar.toUpperCase() : newChar;
  } else {
    newChar = char;
  }
  return newChar;
};

const rot13 = message => typeof message === 'string' ? message.split('').map(rotateChars(13)).join('') : null;
/* encryption end*/


const pre = document.getElementsByClassName('pre')[0];
const post = document.getElementsByClassName('post')[0];
const table = document.getElementsByClassName('tables__table')[0];

const renderMessage = message => {
  const createNewTableEl = (content, className) => {
    const el = document.createElement('li');
    el.classList = `tables__table__item tables__table__item--${className}`;
    el.innerHTML = content;
    return el;
  };

  const messageArray = message.split('');
  const encryptedArray = rot13(message).split('');

  pre.value = message;
  post.value = encryptedArray.join('');

  table.innerHTML = '';
  const displayArray = messageArray.flatMap((item, i) => [item, encryptedArray[i]]);
  const postEls = displayArray.map((char, i) => createNewTableEl(char, i % 2 == 0 ? 'pre' : 'post'));
  postEls.forEach(el => table.appendChild(el));
};

document.getElementsByClassName('preToPost__button')[0].
addEventListener('click', () => renderMessage(pre.value));

renderMessage('Hello World!');