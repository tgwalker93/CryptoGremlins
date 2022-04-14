/**
 * @jest-environment jsdom
 */

import React from 'react';
import ReactDOM from "react-dom";
import CryptoProfilePage from './crypto-profile';
import { BrowserRouter as Router} from "react-router-dom";


test('If Crypto Profile Page is rendered', () => {
  const page  = ReactDOM.render(
    <Router>
      <CryptoProfilePage params={ {id: 'btc'} }/>
    </Router>, 
    document.getElementById('root') || document.createElement('div'));

    expect(page).toEqual(null);
});

