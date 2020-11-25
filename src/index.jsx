import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';

//Main Component
class myFlixApplication extends React.Component {
  render() {
    return (
      <div classname="my-flix">
        <div>Good evening</div>
      </div>
    );
  }
}

//Finds the root
const container = document.getElementsByClassName('app-container')[0];

//Tells React to render app in root DOM element
ReactDOM.render(React.createElement(myFlixApplication), container);