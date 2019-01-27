import React from 'react';
import ReactDOM from 'react-dom';
import ReportQuery from './ReportQuery';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ReportQuery />, div);
  ReactDOM.unmountComponentAtNode(div);
});
