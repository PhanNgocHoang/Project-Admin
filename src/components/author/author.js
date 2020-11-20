import React from 'react';
import { NavLink } from 'react-router-dom'


export const AuthorComponent = () => {
    const ArrayBook = [
        {id:1, author: "Austen, Jane" },
        {id:2,author: "Tolstoy, Leo" },
        {id:3, author: "Tolstoy, Leo" },
        {id:4, author: "Woolf, Virginia" },
        {id:5, author: "Cunnningham, Michael" },
        {id:6, author: "Twain, Mark" },
        {id:7, author: "Dickens, Charles" },
        {id:8, author: "Twain, Mark" },
        {id:9, author: "Woolf, Virginia" },
        {id:10, author: "Rowling, J.K." },
        {id:11, author: "Marquez" },
        {id:12, author: "Shakespeare" },
        {id:13, author: "Tolkien, J.R." },
    ]
    return (
        <div className="content">
            <div className="animated fadeIn">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <strong className="card-title">Authors</strong>
                                <NavLink to="/authors/create"><button className="btn btn-success" style={{ float: 'right' }}><i className="fa fa-plus-circle" aria-hidden="true"></i>Create</button></NavLink>
                            </div>
                            <div className="card-body">
                                <table id="bootstrap-data-table" className="table table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Author Name</th>
                                            <td></td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ArrayBook.map(book => (
                                            <tr key={book.id}>
                                                <td style={{ width: '70%' }}>{book.author}</td>
                                                <td>
                                                    <button className="btn btn-info m-1"><i className="fa fa-info" aria-hidden="true"></i> Detail</button>
                                                    <button className="btn btn-primary m-1"><i className="fa fa-pencil-square" aria-hidden="true"></i> Edit</button>
                                                    <button className="btn btn-danger m-1"><i className="fa fa-trash" aria-hidden="true"></i> Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}