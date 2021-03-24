import React from "react";
import { Route, Switch } from "react-router-dom";
import { BooksComponent } from "./books/books";
import { AuthorComponent } from "./author/author";
import { Dashboard } from "./dashbroad/dashboard";
import { TypeBookComponent } from "./typesbook/typesbook";
import { PublisherComponent } from "./publisher/publishers";
import { UserComponent } from "./user/user";
import { BorrowComponent } from "./user/order";
import { BookDetails } from "./books/bookDetails";
import { UpdateBook } from "./books/updateBook";
import { CreateBookComponent } from "./books/create";

export const AdminRouteComponent = () => {
  return (
    <div>
      <Switch>
        <Route path="/books/update/:bookId" component={UpdateBook} />
        <Route path="/books/add" component={CreateBookComponent} />
        <Route path="/books/:bookId" component={BookDetails} />
        <Route path="/borrows" component={BorrowComponent} />
        <Route path="/users" component={UserComponent} />
        <Route path="/books" component={BooksComponent} />
        <Route path="/authors" component={AuthorComponent} />
        <Route path="/booktypes" component={TypeBookComponent} />
        <Route path="/publishers" component={PublisherComponent} />
        <Route path="/" component={Dashboard} />
      </Switch>
    </div>
  );
};
