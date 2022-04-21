/**
 * @jest-environment jsdom
 */

 import React from 'react';
 import ReactDOM from "react-dom";
 import CryptoListPage from './crypto-list';
 import {render} from '@testing-library/react'
 
 
//  test('If Crypto List Page is rendered', () => {
//    const page  = ReactDOM.render(<CryptoListPage />, 
//      document.getElementById('root') || document.createElement('div'));
//  })

 test('If Crypto Profile Page is rendered', () => {
  const page  = render(<CryptoListPage />);
  expect(page.baseElement.textContent).toEqual("View Crypto Projects");
});
 