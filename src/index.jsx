import React from 'react';
import ReactDOM from 'react-dom';

import { MainView } from './components/main-view/main-view';

import './index.scss';

//Main Component
class myFlixApplication extends React.Component {
  render() {
    return <MainView />;
  }
}

//Finds the root
const container = document.getElementsByClassName('app-container')[0];

//Tells React to render app in root DOM element
ReactDOM.render(React.createElement(myFlixApplication), container);