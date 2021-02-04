import React, { useEffect, useState } from "react";
import Alert from "react-s-alert";
import queryString from "query-string";
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
} from "react-bootstrap";
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
} from "../../api/index";
const validationSchema = yup.object().shape({
  book_name: yup
    .string()
    .required("Book name is required")
    .matches("^[a-zA-Z0-9 ]*$", "Publisher name not valid"),
  author: yup.string().required("Author is required"),
  book_type: yup.string().required("Book type is required"),
  publisher: yup.string().required("Book publisher is required"),
  description: yup.string().required("Book description is required"),
  image: yup.array().required("Book image is required"),
  file: yup.string().required("Book file is required"),
});
export const BooksComponent = () => {
  const initialValues = {
    book_name: "",
    author: "",
    book_type: "",
    publisher: "",
    description: "",
    images: [],
    file: "",
  };
  const [books, setBooks] = useState([]);
  const [publishers, setPublisher] = useState([]);
  const [bookTypes, setBookType] = useState([]);
  const [authors, setAuthor] = useState([]);
  const [reload, setReload] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 5,
    searchKey: "",
  });
  const [images, setImages] = useState({
    images: "",
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
      if (result.status === 200) {
        setBooks(result.data.data.data);
        setPaginationInfo({
          ...paginationInfo,
          currentPage: result.data.data.currentPage,
          totalItems: result.data.data.totalItems,
          itemsCountPerPage: parseInt(pagination.limit),
        });
      }
    } catch (error) {
      //   return Alert.error(
      //     `<div role="alert">${error.response.data.message}</div>`,
      //     {
      //       html: true,
      //       position: "top-right",
      //       effect: "slide",
      //     }
      //   );
    }
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination, reload]);
  const [publisherDetail, setPublisherDetails] = useState({});
  const [showCreated, setShowCreated] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
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
      // if (
      //   bookTypes.length === 0 ||
      //   authors.length === 0 ||
      //   publishers.length === 0
      // ) {
      //   const author = await getAllAuthor();
      //   const publisher = await getAllPublisher();
      //   const bookType = await getAllBookTypes();
      //   setAuthor(author.data.data);
      //   setPublisher(publisher.data.data);
      //   setBookType(bookType.data.data);
      // }
      setShowCreated(true);
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
  const handleCloseDetails = () => {
    setShowDetails(false);
  };
  // const handleShowDetails = async (id) => {
  //   try {
  //     const result = await getBookDetail(id);
  //     if (result.status === 200) {
  //       setPublisherDetails(result.data.data);
  //       setShowDetails(true);
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
  const handleDelete = async (id) => {
    // try {
    //   const result = await deletetPublisher(id);
    //   if (result.status === 200) {
    //     setReload(!reload);
    //     return Alert.success(
    //       `<div role="alert">
    //                ${result.data.message}
    //               </div>`,
    //       {
    //         html: true,
    //         position: "top-right",
    //         effect: "slide",
    //       }
    //     );
    //   }
    // } catch (error) {
    //   return Alert.error(
    //     `<div role="alert">
    //             ${error.response.data.message}</div>`,
    //     {
    //       html: true,
    //       position: "top-right",
    //       effect: "slide",
    //     }
    //   );
    // }
  };
  // const confirmDelete = (id) => {
  //   // eslint-disable-next-line no-restricted-globals
  //   const result = confirm("Do you want to delete?");
  //   if (result === true) {
  //     handleDelete(id);
  //   }
  // };
  const uploadImages = async (files) => {
    const formData = new FormData();
    for (const file of files) {
      formData.append("images", file);
    }
    const result = await uploadImages(formData);
    console.log(result);
  };
  const uploadFile = async (file) => {
    setImages({ images: file });
    const formData = new FormData();
    // formData.append("doc", file);
    // const result = await uploadFile(formData);
    // console.log(result);
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
                    placeholder="Search by publisher name"
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
                      <th>Description</th>
                      <th>status</th>
                      <th style={{ width: "20%" }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {publisher.map((publisher) => (
                      <tr key={publisher._id}>
                        <td>{publisher._id}</td>
                        <td>{publisher.publisherName}</td>
                        <td>{publisher.address}</td>
                        <td className="py-2">
                          <Button size="sm" variant="info" className="m-2">
                            <i
                              className="fa fa-eye"
                              aria-hidden="true"
                              onClick={() => {
                                handleShowDetails(publisher._id);
                              }}
                            >
                              Details
                            </i>
                          </Button>
                          <Button size="sm" variant="primary" className="m-2">
                            <i
                              className="fa fa-pencil-square"
                              aria-hidden="true"
                              onClick={() => {
                                handleShowEdit(publisher._id);
                              }}
                            >
                              Edit
                            </i>
                          </Button>

                          <Button size="sm" variant="danger" className="ml-2">
                            <i
                              className="fa fa-trash"
                              aria-hidden="true"
                              onClick={() => {
                                confirmDelete(publisher._id);
                              }}
                            >
                              Delete
                            </i>
                          </Button>
                        </td>
                      </tr>
                    ))} */}
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
              initialValues={initialValues}
              onSubmit={async (values) => {
                //     try {
                //       const result = await createPublisher(values);
                //       if (result.status === 200) {
                //         handleCloseCreate();
                //         setReload(!reload);
                //         return Alert.success(
                //           `<div role="alert">
                //                                  ${result.data.message}
                //                                 </div>`,
                //           {
                //             html: true,
                //             position: "top-right",
                //             effect: "slide",
                //           }
                //         );
                //       }
                //     } catch (error) {
                //       handleCloseCreate();
                //       return Alert.error(
                //         `<div role="alert">
                //                                 ${error.response.data.message}
                //                                 </div>`,
                //         {
                //           html: true,
                //           position: "top-right",
                //           effect: "slide",
                //         }
                //       );
                //     }
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
                          onChange={props.handleChange}
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
                      <Form.Label column lg={1.7}>
                        Book Type
                      </Form.Label>
                      <Col>
                        <Form.Control
                          lg={4}
                          type="text"
                          id="book_type"
                          name="book_type"
                          placeholder="Enter book type"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          isInvalid={
                            props.touched.book_type && props.errors.book_type
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {props.touched.book_type && props.errors.book_type}
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Row>
                  </Form.Group>
                  <Form.Group>
                    <Form.Row>
                      <Form.Label column lg={3.5}>
                        Author
                      </Form.Label>
                      <Col>
                        <Form.Control
                          lg={3}
                          type="text"
                          id="author"
                          name="author"
                          placeholder="Enter author name"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          isInvalid={
                            props.touched.author && props.errors.author
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {props.touched.author && props.errors.author}
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Row>
                  </Form.Group>
                  <Form.Group>
                    <Form.Row>
                      <Form.Label column lg={3.5}>
                        Publisher
                      </Form.Label>
                      <Col>
                        <Form.Control
                          lg={3}
                          type="text"
                          id="publisher"
                          name="publisher"
                          placeholder="Enter publisher name"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          isInvalid={
                            props.touched.publisher && props.errors.publisher
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {props.touched.publisher && props.errors.publisher}
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Row>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Images</Form.Label>
                    <Form.File
                      id="images"
                      name="images"
                      multiple
                      accept="image/png, image/jpeg"
                      onChange={(e) => {
                        uploadImages(e.target.files);
                      }}
                    />
                    <CardGroup className="mt-3">
                      {/* {images.map((item) => (
                        <Card style={{ width: "18rem" }} className="mb-3 ml-3">
                          <i
                            className="fa fa-times-circle"
                            aria-hidden="true"
                            style={{ float: "right" }}
                          ></i>
                          <Card.Img
                            variant="top"
                            src={item}
                            style={{ width: "100%", height: "100%" }}
                          />
                        </Card>
                      ))} */}
                    </CardGroup>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>File</Form.Label>
                    <Form.File
                      id="file"
                      label="Choose a PDF file"
                      accept=".pdf"
                      onChange={(e) => {
                        uploadFile(e.target.files[0]);
                      }}
                    />
                  </Form.Group>
                  <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                  </Form.Group>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseCreate}>
                      Close
                    </Button>
                    <Button variant="success" type="submit">
                      Created
                    </Button>
                  </Modal.Footer>
                </Form>
              )}
            </Formik>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Book Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="card-body card-block">
            <Formik
              initialValues={publisherDetail}
              onSubmit={async (values) => {
                // try {
                //   const result = await updatePublisher(values._id, values);
                //   if (result.status === 200) {
                //     handleCloseEdit();
                //     setReload(!reload);
                //     return Alert.success(
                //       `<div role="alert">
                //                             ${result.data.message}
                //                             </div>`,
                //       {
                //         html: true,
                //         position: "top-right",
                //         effect: "slide",
                //       }
                //     );
                //   }
                // } catch (error) {
                //   handleCloseEdit();
                //   return Alert.error(
                //     `<div role="alert">
                //                             ${error.response.data.message}
                //                             </div>`,
                //     {
                //       html: true,
                //       position: "top-right",
                //       effect: "slide",
                //     }
                //   );
                // }
              }}
              validationSchema={validationSchema}
            >
              {(props) => (
                <form className="form-horizontal" onSubmit={props.handleSubmit}>
                  <div className="row form-group">
                    <div className="col col-md-3">
                      <label
                        htmlFor="author-name-input"
                        className=" form-control-label"
                      >
                        Publisher Name
                      </label>
                    </div>
                    <div className="col-12 col-md-9">
                      <Form.Control
                        type="text"
                        id="publisherName"
                        name="publisherName"
                        placeholder="Enter publisher name"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.publisherName}
                        isInvalid={
                          props.touched.publisherName &&
                          props.errors.publisherName
                        }
                      />
                      <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                    </div>
                    <small style={{ color: "#ff4d4d" }}>
                      {props.touched.publisherName &&
                        props.errors.publisherName}
                    </small>
                  </div>
                  <div className="row form-group">
                    <div className="col col-md-3">
                      <label
                        htmlFor="author-name-input"
                        className=" form-control-label"
                      >
                        Address
                      </label>
                    </div>
                    <div className="col-12 col-md-9">
                      <Form.Control
                        type="text"
                        id="address"
                        name="address"
                        placeholder="Enter address"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.address}
                        isInvalid={
                          props.touched.address && props.errors.address
                        }
                      />
                      <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                    </div>
                    <small style={{ color: "#ff4d4d" }}>
                      {props.touched.address && props.errors.address}
                    </small>
                  </div>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEdit}>
                      Close
                    </Button>
                    <Button variant="success" type="submit">
                      Save
                    </Button>
                  </Modal.Footer>
                </form>
              )}
            </Formik>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={showDetails} onHide={handleCloseDetails}>
        <Modal.Header closeButton>
          <Modal.Title>Publisher Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
          <Container>
            <Row>
              <Col xs={6} md={4}>
                ID
              </Col>
              <Col xs={12} md={8}>
                {publisherDetail._id}
              </Col>
            </Row>

            <Row>
              <Col xs={6} md={4}>
                Publisher Name
              </Col>
              <Col xs={12} md={8}>
                {publisherDetail.publisherName}
              </Col>
            </Row>
            <Row>
              <Col xs={6} md={4}>
                Address
              </Col>
              <Col xs={12} md={8}>
                {publisherDetail.address}
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDetails}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
