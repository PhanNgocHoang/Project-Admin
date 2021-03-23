import React, { useEffect, useState } from "react";
import Alert from "react-s-alert";
import queryString from "query-string";
import Iframe from "react-iframe";
import { NavLink } from "react-router-dom";
import {
  Table,
  Button,
  Modal,
  Form,
  Container,
  Row,
  Col,
  Card,
  CardGroup,
  Image,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Paginations from "react-js-pagination";
import { Formik } from "formik";
import * as yup from "yup";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";
import {
  getAllAuthor,
  getAllBookTypes,
  getAllPublisher,
  getBooks,
  createBook,
  getBookDetail,
  uploadImages,
  uploadFile,
  deleteBook,
} from "../../api/index";
import * as types from "../../constants/actionTypes";
const validationSchema = yup.object().shape({
  book_name: yup.string().required("Book name is required"),
  authors: yup.lazy((val) =>
    Array.isArray(val) ? yup.array().of(yup.string()) : yup.string()
  ),
  book_type: yup.string().required("Book type is required"),
  publisher: yup.string().required("Book publisher is required"),
  images: yup.string().required("Book image is required"),
  file: yup.string().required("Book file is required"),
  description: yup.string().required("Book description is required"),
  price: yup.number().required("Book price is required"),
});
export const BooksComponent = () => {
  const dispatch = useDispatch();
  const [books, setBooks] = useState([]);
  const [bookDetails, setBookDetails] = useState({
    _id: "",
    book_name: "",
    authors: [{}],
    book_type: "",
    publisher: "",
    images: "",
    file: "",
    description: "",
  });
  const initialValues = {
    book_name: "",
    authors: [],
    book_type: "",
    publisher: "",
    images: "",
    file: "",
    description: "",
    price: "",
  };
  const bookTypes = useSelector((state) => {
    return state.bookType.data;
  });
  const publishers = useSelector((state) => {
    return state.publishers.data;
  });
  const authors = useSelector((state) => {
    return state.authors.data;
  });
  const [bookImage, setBookImage] = useState();
  const [bookFile, setBookFile] = useState();
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
      return Alert.error(
        `<div role="alert">${error.response.data.message}</div>`,
        {
          html: true,
          position: "top-right",
          effect: "slide",
        }
      );
    }
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination, reload]);
  const [showCreated, setShowCreated] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(false);
  const getMore = (number) => {
    setPagination({ ...pagination, limit: number });
  };
  const handlePageChange = (pageNumber) => {
    setPagination({ ...pagination, page: pageNumber });
  };
  const handleSearch = (value) => {
    setPagination({ ...pagination, searchKey: value });
  };
  // const handleShowEdit = async (id) => {
  //   try {
  //     const result = await getBookDetail(id);
  //     if (result.status === 200) {
  //       setPublisherDetails(result.data.data);
  //       setShowEdit(true);
  //     }
  //   } catch (error) {
  //     return Alert.error(
  //       `<div role="alert">${error.response.data.message}</div>`,
  //       {
  //         html: true,
  //         position: "top-right",
  //         effect: "slide",
  //       }
  //     );
  //   }
  // };
  const handleCloseEdit = () => {
    setShowEdit(false);
  };
  const handleCloseCreate = () => {
    setShowCreated(false);
  };
  const handleShowCreate = async () => {
    try {
      const author = await getAllAuthor();
      const publisher = await getAllPublisher();
      const bookType = await getAllBookTypes();
      dispatch({ type: types.BOOK_TYPE, payload: bookType.data.data });
      dispatch({ type: types.BOOK_AUTHOR, payload: author.data.data });
      dispatch({ type: types.BOOK_PUBLISHER, payload: publisher.data.data });
      setShowCreated(true);
    } catch (error) {
      return Alert.error(`<div role="alert">${error}</div>`, {
        html: true,
        position: "top-right",
        effect: "slide",
      });
    }
  };
  const handleCloseDetails = () => {
    setShowDetails(false);
  };
  const handleShowDetails = async (id) => {
    try {
      const result = await getBookDetail(id);
      setBookDetails({
        _id: result.data.data._id,
        book_name: result.data.data.book_name,
        authors: result.data.data.authors,
        book_type: result.data.data.book_type,
        publisher: result.data.data.publisher,
        images: result.data.data.images,
        file: result.data.data.file,
        description: result.data.data.description,
      });
      setShowDetails(true);
    } catch (error) {
      return Alert.error(
        `<div role="alert">${error.response.data.message}</div>`,
        {
          html: true,
          position: "top-right",
          effect: "slide",
        }
      );
    }
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
      return Alert.error(
        `<div role="alert">
                ${error.response.data.message}</div>`,
        {
          html: true,
          position: "top-right",
          effect: "slide",
        }
      );
    }
  };
  const confirmDelete = (id) => {
    // eslint-disable-next-line no-restricted-globals
    const result = confirm("Do you want to delete?");
    if (result === true) {
      handleDelete(id);
    }
  };
  const uploadDoc = async (file) => {
    setUploadStatus(true);
    const formData = new FormData();
    formData.append("doc", file);
    const result = await uploadFile(formData);
    initialValues.file = result.data.url;
    setUploadStatus(false);
    return result.data.url;
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
                <button
                  className="btn btn-success"
                  style={{ float: "right" }}
                  onClick={handleShowCreate}
                >
                  <i className="fa fa-plus-circle" aria-hidden="true"></i>Create
                </button>
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
      <Modal show={showCreated} onHide={handleCloseCreate} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Create Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="card-body card-block">
            <Formik
              enableReinitialize={true}
              initialValues={initialValues}
              onSubmit={async (values) => {
                try {
                  const result = await createBook(values);
                  if (result.status === 200) {
                    handleCloseCreate();
                    setReload(!reload);
                    setBookImage("");
                    setBookFile("");
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
                  return Alert.error(
                    `<div role="alert">
                                          ${error.response.data.message}
                                          </div>`,
                    {
                      html: true,
                      position: "top-right",
                      effect: "slide",
                    }
                  );
                }
              }}
              validationSchema={validationSchema}
            >
              {(props) => (
                <Form className="form-horizontal" onSubmit={props.handleSubmit}>
                  <Form.Group>
                    <Form.Row>
                      <Form.Label column lg={3.5}>
                        Book Name
                      </Form.Label>
                      <Col>
                        <Form.Control
                          lg={4}
                          type="text"
                          id="book_name"
                          name="book_name"
                          placeholder="Enter book name"
                          onChange={(event) => {
                            props.values.book_name = event.target.value;
                          }}
                          onBlur={props.handleBlur}
                          isInvalid={
                            props.touched.book_name && props.errors.book_name
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {props.touched.book_name && props.errors.book_name}
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Row>
                  </Form.Group>
                  <Form.Group>
                    <Form.Row>
                      <Form.Label column lg={3.5}>
                        Book Price
                      </Form.Label>
                      <Col>
                        <Form.Control
                          lg={4}
                          type="text"
                          id="price"
                          name="price"
                          placeholder="Enter book price"
                          onChange={(event) => {
                            props.values.price = event.target.value;
                          }}
                          onBlur={props.handleBlur}
                          isInvalid={props.touched.price && props.errors.price}
                        />
                        <Form.Control.Feedback type="invalid">
                          {props.touched.price && props.errors.price}
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Row>
                  </Form.Group>
                  <Form.Group>
                    <Form.Row>
                      <Form.Label column lg={1.7}>
                        Book Type
                      </Form.Label>
                      <Col>
                        {bookTypes.map((type) => (
                          <Form.Check
                            type="radio"
                            label={type.type_name}
                            value={type._id}
                            name="book_type"
                            key={type._id}
                            onChange={(event) => {
                              props.values.book_type = event.target.value;
                            }}
                            onBlur={props.handleBlur}
                            isInvalid={
                              props.touched.book_type && props.errors.book_type
                            }
                          />
                        ))}
                      </Col>
                      <Form.Control.Feedback type="invalid">
                        {props.touched.book_type && props.errors.book_type}
                      </Form.Control.Feedback>
                    </Form.Row>
                  </Form.Group>
                  <hr />
                  <Form.Group>
                    <Form.Row>
                      <Form.Label column lg={1.7}>
                        Author
                      </Form.Label>
                      <Col>
                        {authors.map((author) => (
                          <Form.Check
                            key={author._id}
                            label={author.authorName}
                            type="checkbox"
                            name="authors"
                            className="ml-4"
                            onChange={(e) => {
                              const value = e.target.checked
                                ? author._id
                                : null;
                              if (value === null) {
                                const authors = props.initialValues.authors;
                                const index = authors.findIndex(
                                  (item) => item === e.target.value
                                );
                                props.values.authors.splice(index, 1);
                              } else {
                                props.values.authors.push(author._id);
                              }
                            }}
                            value={author._id}
                            onBlur={props.author}
                            isInvalid={
                              props.touched.authors && props.errors.authors
                            }
                          />
                        ))}
                      </Col>
                      <Form.Control.Feedback>
                        {props.touched.author && props.errors.author}
                      </Form.Control.Feedback>
                    </Form.Row>
                  </Form.Group>
                  <hr />
                  <Form.Group>
                    <Form.Row>
                      <Form.Label column lg={3.5}>
                        Publisher
                      </Form.Label>
                      <Col>
                        {publishers.map((publisher) => (
                          <Form.Check
                            type="radio"
                            label={publisher.publisherName}
                            value={publisher._id}
                            name="publisher"
                            key={publisher._id}
                            onChange={(event) => {
                              props.values.publisher = event.target.value;
                            }}
                            onBlur={props.handleBlur}
                            isInvalid={
                              props.touched.publisher && props.errors.publisher
                            }
                          />
                        ))}
                      </Col>
                      <Form.Control.Feedback type="invalid">
                        {props.touched.publisher && props.errors.publisher}
                      </Form.Control.Feedback>
                    </Form.Row>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      name="description"
                      id="description"
                      onChange={(event) => {
                        initialValues.description = event.target.value;
                      }}
                      onBlur={props.handleBlur}
                      isInvalid={
                        props.touched.description && props.errors.description
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {props.touched.description && props.errors.description}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Images</Form.Label>
                    <Form.File
                      accept="image/png, image/jpeg"
                      onChange={async (event) => {
                        try {
                          const formData = new FormData();
                          formData.append("image", event.target.files[0]);
                          if (event.target.files[0] !== undefined) {
                            setUploadStatus(true);
                            const response = await uploadImages(formData);
                            setBookImage(response.data.url);
                            setUploadStatus(false);
                            return (props.values.images = response.data.url);
                          }
                        } catch (error) {
                          return Alert.error(
                            `<div role="alert"> <i class="fa fa-times-circle" aria-hidden="true"></i> ${error.response.data.message}</div>`,
                            {
                              html: true,
                              position: "top-right",
                              effect: "slide",
                            }
                          );
                        }
                      }}
                      name="images"
                      isInvalid={props.touched.images && props.errors.images}
                      disabled={uploadStatus}
                    />
                    <Form.Control.Feedback type="invalid">
                      {props.touched.images && props.errors.images}
                    </Form.Control.Feedback>
                    {bookImage ? (
                      <CardGroup className="mt-3">
                        <Card style={{ width: "18rem" }} className="mb-3 ml-3">
                          <Card.Img
                            variant="top"
                            src={bookImage}
                            style={{ width: "30%", height: "100%" }}
                          />
                        </Card>
                      </CardGroup>
                    ) : null}
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>File</Form.Label>
                    <Form.File
                      name="file"
                      label="Choose a PDF file or audio file"
                      accept=".pdf,audio/*"
                      onChange={(event) => {
                        const url = uploadDoc(event.target.files[0]);
                        return (props.values.file = url);
                      }}
                      isInvalid={props.touched.file && props.errors.file}
                      disabled={uploadStatus}
                    />
                    <Form.Control.Feedback type="invalid">
                      {props.touched.file && props.errors.file}
                    </Form.Control.Feedback>
                    {bookFile ? (
                      <CardGroup className="mt-3">
                        <Card style={{ width: "18rem" }} className="mb-3 ml-3">
                          <Iframe url={bookFile} />
                        </Card>
                      </CardGroup>
                    ) : null}
                  </Form.Group>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseCreate}>
                      Close
                    </Button>
                    <Button
                      variant="success"
                      type="submit"
                      disabled={uploadStatus}
                    >
                      Created
                    </Button>
                  </Modal.Footer>
                </Form>
              )}
            </Formik>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
