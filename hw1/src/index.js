import React from 'react';
import ReactDOM from 'react-dom';
import Form from './Form';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { presidentNames, presidents, styleList, serverData } from './variables';

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
    <ul style={styleList}>
      {
        presidentNames.map((president) =>
          <li key={president}>{president}</li>)
      }
    </ul>
    <ul>
      {
        presidents
          .filter((president) =>
            president.presidentIndex % 2 !== 0)
          .map((president) =>
            <li key={president.presidentIndex}>{formatOutput(president)}</li>)
      }
    </ul>
    <ul>
      {
        serverData
          .sort((a, b) => (a.date > b.date ? 1 : -1))
          .map(event => {
            let styleOpacity;
            if (Date.parse(event.date) < Date.now())
              styleOpacity = {
                opacity: "50%"
              };

            return (<li key={event.id} style={styleOpacity}>
              <a href={`https://www.facebook.com/events/${event.id}/`} target="_blank" rel="noopener noreferrer">{event.title}</a>
              <p>{formatDate(event.date)}</p>
              <p>{event.place}</p>
            </li>);
          })
      }
    </ul>
    <Form />
  </React.StrictMode>,
  document.getElementById('root')
);

function formatOutput({ firstName, lastName, presidentIndex }) {
  return `${lastName}, ${firstName}, ${presidentIndex}-й`;
}

function formatDate(dateStr) {
  const date = new Date(Date.parse(dateStr));
  let timeOfDay;
  if (date.getHours() >= 21 || date.getHours() < 5)
    timeOfDay = 'Ночь';
  else if (date.getHours() >= 5 && date.getHours() < 11)
    timeOfDay = 'Утро';
  else if (date.getHours() >= 11 && date.getHours() < 17)
    timeOfDay = 'День';
  else timeOfDay = 'Вечер';

  return `${timeOfDay}, ${new Intl.DateTimeFormat('en-GB', {
    year: 'numeric', month: 'numeric', day: 'numeric',
    hour: 'numeric', minute: 'numeric', second: 'numeric',
    hour12: false
  }).format(date)}`;
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
