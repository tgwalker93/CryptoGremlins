/**
 * @jest-environment jsdom
 */

 import React from 'react';
 import ReactDOM from "react-dom";
 import CryptoListPage from './crypto-list';
 
 
 test('If Crypto List Page is rendered', () => {
   const page  = ReactDOM.render(<CryptoListPage />, 
     document.getElementById('root') || document.createElement('div'));
 })
 