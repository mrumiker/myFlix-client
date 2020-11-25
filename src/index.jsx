import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';

//Main Component
class myFlixApplication extends React.Component {
  render() {
    return (
      <div className="my-flix">
        <div>Happy Thanksgiving! 🦃</div>
      </div>
    );
  }
}

//Finds the root
const container = document.getElementsByClassName('app-container')[0];

//Tells React to render app in root DOM element
ReactDOM.render(React.createElement(myFlixApplication), container);