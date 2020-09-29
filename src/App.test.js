import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import App from './App';
import ReactDOM from 'react-dom';

// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
it('renders without crashing',()=>{
  const div = document.createElement('div');
  ReactDOM.render(<App />, div)
})

test("renders the correct content", ()=>{
  const { getByText } = render(<App />);
  getByText("Task time tracking app")
})

test("modal opens on 'Add Task' button click", ()=>{
  const {getByText} = render(<App />)
  fireEvent.click(getByText('+ Add Task'))
  getByText('CLOSE')
})

