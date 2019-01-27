import React from 'react';
import ReactDOM from 'react-dom';
import SendEventForm from './SendEventForm';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SendEventForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});
