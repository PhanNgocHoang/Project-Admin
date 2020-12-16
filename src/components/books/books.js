import React from 'react';
import {NavLink} from 'react-router-dom'
export const BooksComponent = () => {
    
    const ArrayBook = [
        { id:1,title: "Northanger Abbey", author: "Austen, Jane", year_written: 1814, edition: "Penguin", price: 18.2 },
        { id:2,title: "War and Peace", author: "Tolstoy, Leo", year_written: 1865, edition: "Penguin", price: 12.7 },
        { id:3,title: "Anna Karenina", author: "Tolstoy, Leo", year_written: 1875, edition: "Penguin", price: 13.5 },
        { id:4,title: "Mrs. Dalloway", author: "Woolf, Virginia", year_written: 1925, edition: "Harcourt Brace", price: 25 },
        { id:5,title: "The Hours", author: "Cunnningham, Michael", year_written: 1999, edition: "Harcourt Brace", price: 12.35 },
        { id:6,title: "Huckleberry Finn", author: "Twain, Mark", year_written: 1865, edition: "Penguin", price: 5.76 },
        { id:7,title: "Bleak House", author: "Dickens, Charles", year_written: 1870, edition: "Random House", price: 5.75 },
        { id:8,title: "Tom Sawyer", author: "Twain, Mark", year_written: 1862, edition: "Random House", price: 7.75 },
        { id:9,title: "A Room of One's Own", author: "Woolf, Virginia", year_written: 1922, edition: "Penguin", price: 29 },
        { id:10,title: "Harry Potter", author: "Rowling, J.K.", year_written: 2000, edition: "Harcourt Brace", price: 19.95 },
        { id:11,title: "One Hundred Years of Solitude", author: "Marquez", year_written: 1967, edition: "Harper  Perennial", price: 14.00 },
        { id:12,title: "Hamlet, Prince of Denmark", author: "Shakespeare", year_written: 1603, edition: "Signet  Classics", price: 7.95 },
        { id:13,title: "Lord of the Rings", author: "Tolkien, J.R.", year_written: 1937, edition: "Penguin", price: 27.45 },
    ]
    return (
        <div className="content">
            <div className="animated fadeIn">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <strong className="card-title">Books</strong>
                               <NavLink to="/books/create"> <button className="btn btn-success" style={{float: 'right'}}><i className="fa fa-plus-circle" aria-hidden="true"></i>Create</button></NavLink>
                            </div>
                            <div className="card-body">
                                <table id="bootstrap-data-table" className="table table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>Author</th>
                                            <th>Year written</th>
                                            <th>Edition</th>
                                            <th>Price</th>
                                            <td></td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {ArrayBook.map(book => (
                                         <tr key={book.id}>
                                            <td>{book.title}</td>
                                            <td>{book.author}</td>
                                            <td>{book.year_written}</td>
                                            <td>{book.edition}</td>
                                            <td>{book.price}</td>
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