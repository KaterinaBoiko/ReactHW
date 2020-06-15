import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import * as serviceWorker from './serviceWorker';

const presidentStrings = ["Эндрю Джексон", "Мартин Ван Бюрен", "Уильям Гаррисон"];
const presidentObjects = [
  {
    firstName: "Джон",
    lastName: "Тайлер",
    presidentIndex: 10
  },
  {
    firstName: "Джеймс Нокс",
    lastName: "Полк",
    presidentIndex: 11
  },
  {
    firstName: "Закари",
    lastName: "Тейлор",
    presidentIndex: 12
  },
  {
    firstName: "Миллард",
    lastName: "Филлмор",
    presidentIndex: 13
  },
  {
    firstName: "Франклин",
    lastName: "Пирс",
    presidentIndex: 14
  }
]

ReactDOM.render(
  <React.StrictMode>
    <ul>
      <li>Джордж Вашингтон</li>
      <li>Джон Адамс</li>
      <li>Томас Джефферсон</li>
    </ul>
    <ol start="4">
      <li>Джеймс Мэдисон</li>
      <li>Джеймс Монро</li>
      <li>Джон Куинси Адамс</li>
    </ol>
    <ul>
      {
        presidentStrings.map((president) =>
          <li key={president}>{president}</li>)
      }
    </ul>
    <ul>
      {
        presidentObjects
          .filter((president) =>
            president.presidentIndex % 2 !== 0)
          .map((president) =>
            <li key={president.presidentIndex}>{formatOutput(president)}</li>)
      }
    </ul>
  </React.StrictMode>,
  document.getElementById('root')
);

function formatOutput({ firstName, lastName, presidentIndex }) {
  return `${lastName}, ${firstName}, ${presidentIndex}-й`;
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
