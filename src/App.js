import React, { useState } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { PageIndex } from "./page/page.index";
import { LoginPage } from "./page/page.login";
import { AuthUserCtx } from "./context/auth";
function App() {
  const [authUser, setAuthUser] = useState(null);
  const authUserCtxValue = {
    authUser: authUser,
    setAuthUser: setAuthUser,
  };
  return (
    <div>
      <BrowserRouter>
        <AuthUserCtx.Provider value={authUserCtxValue}>
          <Switch>
            <Route path="/login" component={LoginPage} />
            <Route path="/" component={PageIndex} />
          </Switch>
        </AuthUserCtx.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
