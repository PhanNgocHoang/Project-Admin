import React from "react";
import { Route, Switch } from "react-router-dom";
import { BooksComponent } from "./books/books";
import { AuthorComponent } from "./author/author";
import { Dashboard } from "./dashbroad/dashboard";
import { TypeBookComponent } from "./typesbook/typesbook";
import { PublisherComponent } from "./publisher/publishers";

export const AdminRouteComponent = () => {
  return (
    <div>
      <Switch>
        <Route path="/books" component={BooksComponent} />
        <Route path="/authors" component={AuthorComponent} />
        <Route path="/booktypes" component={TypeBookComponent} />
        <Route path="/publishers" component={PublisherComponent} />
        <Route path="/" component={Dashboard} />
      </Switch>
    </div>
  );
};
