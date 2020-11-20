import React from 'react';
import {Switch, Route} from 'react-router-dom'
import {PageIndex} from './page/page.index'
import {LoginPage} from './page/page.login'
function App() {
  return (
    <div>
      <Switch>
        <Route path="/login" component={LoginPage}/>
          <Route path="/" component={PageIndex}/>
        </Switch>
    </div>
  );
}

export default App;
