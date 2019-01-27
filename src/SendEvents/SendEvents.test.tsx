import React from 'react';
import ReactDOM from 'react-dom';
import SendEvents from './SendEvents';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SendEvents />, div);
  ReactDOM.unmountComponentAtNode(div);
});
