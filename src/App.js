import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import { PageIndex } from './page/page.index'
import { LoginPage } from './page/page.login'
function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/" component={PageIndex} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
