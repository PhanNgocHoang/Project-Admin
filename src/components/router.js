import React from 'react';
import {Route, Switch} from 'react-router-dom'
import { BooksComponent } from './books/books'
import { AuthorComponent  } from './author/author'
import { Dashboard } from './dashbroad/dashboard'
import TypeBookComponent from './typesbook/typesbook'
import {PublisherComponent} from './publisher/publishers'
import {FormBooksComponent} from './books/formbook'
import {FormAuthorComponent} from './author/formauthor'

export const AdminRouteComponent = () => {
    return (
        <div>
            <Switch>
                 <Route path="/books/create" component={FormBooksComponent} />
                 <Route path="/authors/create" component={FormAuthorComponent} />
                 <Route path="/books" component={BooksComponent} />
                 <Route path="/authors" component={AuthorComponent} />
                 <Route path="/typesbook" component={TypeBookComponent} />
                 <Route path="/publishers" component={PublisherComponent} />
                 <Route path="/" component={Dashboard}/>
            </Switch>
        </div>
    )
}