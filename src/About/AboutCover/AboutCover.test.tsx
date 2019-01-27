import React from 'react';
import ReactDOM from 'react-dom';
import AboutCover from './AboutCover';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AboutCover />, div);
  ReactDOM.unmountComponentAtNode(div);
});
