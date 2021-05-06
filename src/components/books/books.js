import React, { useEffect, useState } from "react";
import queryString from "query-string";
import { NavLink } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import Paginations from "react-js-pagination";
import Alert from "react-s-alert";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";
import { getBooks, deleteBook } from "../../api/index";
export const BooksComponent = () => {
  const [books, setBooks] = useState([]);
  const [reload, setReload] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 5,
    searchKey: "",
  });
  const [paginationInfo, setPaginationInfo] = useState({
    currentPage: 1,
    totalItems: 0,
    itemsCountPerPage: 5,
  });
  const getData = async () => {
    try {
      const paramsString = queryString.stringify(pagination);
      const result = await getBooks(paramsString);
      setBooks(result.data.data.data);
      setPaginationInfo({
        ...paginationInfo,
        currentPage: result.data.data.currentPage,
        totalItems: result.data.data.totalItems,
      });
    } catch (error) {
      if (error.response.data.message) {
        return Alert.error(
          `<div role="alert">
                    <i class="fa fa-times-circle" aria-hidden="true"></i> ${error.response.data.message}
                                            </div>`,
          {
            html: true,
            position: "top-right",
            effect: "slide",
          }
        );
      }
    }
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination, reload]);
  const getMore = (number) => {
    setPagination({ ...pagination, limit: number });
  };
  const handlePageChange = (pageNumber) => {
    setPagination({ ...pagination, page: pageNumber });
  };
  const handleSearch = (value) => {
    setPagination({ ...pagination, searchKey: value });
  };
  const handleDelete = async (id) => {
    try {
      const result = await deleteBook(id);
      if (result.status === 200) {
        setReload(!reload);
        return Alert.success(
          `<div role="alert">
                   ${result.data.message}
                  </div>`,
          {
            html: true,
            position: "top-right",
            effect: "slide",
          }
        );
      }
    } catch (error) {
      if (error.response.data.message) {
        return Alert.error(
          `<div role="alert">
                    <i class="fa fa-times-circle" aria-hidden="true"></i> ${error.response.data.message}
                                            </div>`,
          {
            html: true,
            position: "top-right",
            effect: "slide",
          }
        );
      }
    }
  };
  const confirmDelete = (id) => {
    // eslint-disable-next-line no-restricted-globals
    const result = confirm("Do you want to delete?");
    if (result === true) {
      handleDelete(id);
    }
  };
  return (
    <div className="content">
      <Alert stack={{ limit: 3 }} />
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <strong className="card-title">Books</strong>
                <NavLink to={`/books/add`}>
                  <button
                    className="btn btn-success"
                    style={{ float: "right" }}
                  >
                    <i className="fa fa-plus-circle" aria-hidden="true"></i>
                    Create
                  </button>
                </NavLink>
              </div>
              <div className="card-body">
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fa fa-search" aria-hidden="true"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by book name"
                    onChange={(e) => {
                      handleSearch(e.target.value);
                    }}
                  />
                </div>
                <div className="d-flex justify-content-end">
                  <label htmlFor="numberItem" className="mr-2">
                    Number item{" "}
                  </label>
                  <input
                    name="numberItem"
                    id="numberItem"
                    value={pagination.limit}
                    onChange={(e) => {
                      getMore(e.target.value);
                    }}
                  />
                </div>
                <Table hover className="mt-3 table table-bordered">
                  <thead>
                    <tr>
                      <th style={{ width: "20%" }}>ID</th>
                      <th>Book name</th>
                      <th>Book Type</th>
                      <th>Author</th>
                      <th>Publisher</th>
                      <th>status</th>
                      <th style={{ width: "20%" }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {books.map((book) => (
                      <tr key={book.book_name}>
                        <td>{book._id}</td>
                        <td>{book.book_name}</td>
                        <td>{book.book_type.type_name}</td>
                        <td>
                          {book.authors.map((item) => (
                            <p
                              key={item.authorName}
                              style={{ textOverflow: "ellipsis" }}
                            >
                              {item.authorName}
                            </p>
                          ))}
                        </td>
                        <td>{book.publisher.publisherName}</td>
                        <td>{book.status === true ? "Active" : "DeActive"}</td>
                        <td className="py-2">
                          <NavLink to={`/books/${book._id}`}>
                            <Button size="sm" variant="info" className="m-2">
                              <i className="fa fa-eye" aria-hidden="true">
                                Details
                              </i>
                            </Button>
                          </NavLink>
                          <NavLink to={`/books/update/${book._id}`}>
                            <Button size="sm" variant="primary" className="m-2">
                              <i
                                className="fa fa-pencil-square"
                                aria-hidden="true"
                              >
                                Edit
                              </i>
                            </Button>
                          </NavLink>
                          <Button size="sm" variant="danger" className="ml-2">
                            <i
                              className="fa fa-trash"
                              aria-hidden="true"
                              onClick={() => {
                                confirmDelete(book._id);
                              }}
                            >
                              Delete
                            </i>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Paginations
                  activePage={paginationInfo.currentPage}
                  itemsCountPerPage={paginationInfo.itemsCountPerPage}
                  totalItemsCount={paginationInfo.totalItems}
                  pageRangeDisplayed={5}
                  onChange={handlePageChange}
                  itemClass="page-item"
                  linkClass="page-link"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
