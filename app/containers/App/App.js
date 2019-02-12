/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';
import AlertDialogSlide from 'components/AlertDialogSlide';
import CatNav from 'components/CatNav';
import './style.scss';

const App = () => (
  <div className="app-wrapper">
  	<AlertDialogSlide/>
    <CatNav/>
    <Switch>
{/*      <Route exact path="/" component={HomePage} />
      <Route path="/features" component={FeaturePage} />
      <Route path="" component={NotFoundPage} />*/}
    </Switch>
  </div>
);

export default App;
