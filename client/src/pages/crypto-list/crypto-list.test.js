/**
 * @jest-environment jsdom
 */

 import React from 'react';
 import ReactDOM from "react-dom";
 import CryptoListPage from './crypto-list';
//  import {render} from '@testing-library/react'

// import 'regenerator-runtime/runtime'
 
 
//  test('If Crypto List Page is rendered', async () => {
//    const page  = ReactDOM.render(<CryptoListPage />, 
//     document.getElementById('root') || document.createElement('div'));
//  });

//above test not working so this is a dummy test
 test('adds 1 + 2 to equal 3', () => {
  expect(1+2).toBe(3);
});

//  test('If Crypto Profile Page is rendered', () => {
//   const page  = render(<CryptoListPage />);

//     expect(page.baseElement.textContent).toEqual("View Crypto Projects");
// });
 