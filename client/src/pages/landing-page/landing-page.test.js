/**
 * @jest-environment jsdom
 */

import React from 'react';
import ReactDOM from "react-dom";
import LandingPage from './landing-page';


test('If Landing Page is rendered', () => {
  const page  = ReactDOM.render(<LandingPage />, 
    document.getElementById('root') || document.createElement('div'));
})


test('adds 1 + 2 to equal 3', () => {
    expect(1+2).toBe(3);
  });