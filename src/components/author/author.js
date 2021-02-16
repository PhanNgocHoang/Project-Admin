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
} from "react-bootstrap";
import Paginations from "react-js-pagination";
import { Formik } from "formik";
import * as yup from "yup";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";
import moment from "moment";
import {
  createAuthor,
  getAuthor,
  updateAuthor,
  deletetAuthor,
  getAuthorDetails,
} from "../../api/index";
const validationSchema = yup.object().shape({
  authorName: yup
    .string()
    .required("Author name is required")
    .matches("^[a-zA-Z0-9 ]*$", "Publisher name not valid"),
  dob: yup.date().required("Day of birth is required"),
});

export const AuthorComponent = () => {
  const initialValues = {
    authorName: "",
    dob: "",
  };
  const [authors, setAuthors] = useState([]);
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
      const result = await getAuthor(paramsString);
      if (result.status === 200) {
        setAuthors(result.data.data.data);
        setPaginationInfo({
          ...paginationInfo,
          currentPage: result.data.data.currentPage,
          totalItems: result.data.data.totalItems,
          itemsCountPerPage: parseInt(pagination.limit),
        });
      }
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
  const [authorDetail, setAuthorDetails] = useState({});
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
  const handleShowEdit = async (id) => {
    try {
      const result = await getAuthorDetails(id);
      if (result.status === 200) {
        setAuthorDetails(result.data.data);
        setShowEdit(true);
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
  };
  const handleCloseEdit = () => {
    setShowEdit(false);
  };
  const handleCloseCreate = () => {
    setShowCreated(false);
  };
  const handleShowCreate = () => {
    setShowCreated(true);
  };
  const handleCloseDetails = () => {
    setShowDetails(false);
  };
  const handleShowDetails = async (id) => {
    try {
      const result = await getAuthorDetails(id);
      if (result.status === 200) {
        setAuthorDetails(result.data.data);
        setShowDetails(true);
      }
    } catch (error) {
      return Alert.error(
        `<div role="alert"><i class="fa fa-times-circle" aria-hidden="true"></i> ${error.response.data.message}</div>`,
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
      const result = await deletetAuthor(id);
      if (result.status === 200) {
        setReload(!reload);
        return Alert.success(
          `<div role="alert">
             <i class="fa fa-check-circle" aria-hidden="true"></i> ${result.data.message}
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
                <i class="fa fa-times-circle" aria-hidden="true"></i> ${error.response.data.message}</div>`,
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
  return (
    <div className="content">
      <Alert stack={{ limit: 3 }} />
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <strong className="card-title">Author</strong>
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
                    placeholder="Search by author name"
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
                      <th>Author Name</th>
                      <th>Day Of Birth</th>
                      <th style={{ width: "20%" }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {authors.map((author) => (
                      <tr key={author._id}>
                        <td>{author._id}</td>
                        <td>{author.authorName}</td>
                        <td>{moment(author.dob).format("YYYY-MM-DD")}</td>
                        <td className="py-2">
                          <Button size="sm" variant="info" className="m-2">
                            <i
                              className="fa fa-eye"
                              aria-hidden="true"
                              onClick={() => {
                                handleShowDetails(author._id);
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
                                handleShowEdit(author._id);
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
                                confirmDelete(author._id);
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
      <Modal show={showCreated} onHide={handleCloseCreate}>
        <Modal.Header closeButton>
          <Modal.Title>Create Author</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="card-body card-block">
            <Formik
              initialValues={initialValues}
              onSubmit={async (values) => {
                try {
                  const result = await createAuthor(values);
                  if (result.status === 200) {
                    handleCloseCreate();
                    setReload(!reload);
                    return Alert.success(
                      `<div role="alert">
                          <i class="fa fa-check-circle" aria-hidden="true"> ${result.data.message}
                                            </div>`,
                      {
                        html: true,
                        position: "top-right",
                        effect: "slide",
                      }
                    );
                  }
                } catch (error) {
                  handleCloseCreate();
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
                        id="authorName"
                        name="authorName"
                        placeholder="Enter author name"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        isInvalid={
                          props.touched.authorName && props.errors.authorName
                        }
                      />
                      <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                    </div>
                    <small style={{ color: "#ff4d4d" }}>
                      {props.touched.authorName && props.errors.authorName}
                    </small>
                  </div>
                  <div className="row form-group">
                    <div className="col col-md-3">
                      <label
                        htmlFor="author-name-input"
                        className=" form-control-label"
                      >
                        Day Of Birth
                      </label>
                    </div>
                    <div className="col-12 col-md-9">
                      <Form.Control
                        type="date"
                        id="dob"
                        name="dob"
                        placeholder="Enter address"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        isInvalid={props.touched.dob && props.errors.dob}
                      />
                      <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                    </div>
                    <small style={{ color: "#ff4d4d" }}>
                      {props.touched.dob && props.errors.dob}
                    </small>
                  </div>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseCreate}>
                      Close
                    </Button>
                    <Button variant="success" type="submit">
                      Created
                    </Button>
                  </Modal.Footer>
                </form>
              )}
            </Formik>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Author</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="card-body card-block">
            <Formik
              initialValues={authorDetail}
              onSubmit={async (values) => {
                try {
                  const result = await updateAuthor(values._id, values);
                  if (result.status === 200) {
                    handleCloseEdit();
                    setReload(!reload);
                    return Alert.success(
                      `<div role="alert">
                       <i class="fa fa-check-circle" aria-hidden="true"> ${result.data.message}
                                            </div>`,
                      {
                        html: true,
                        position: "top-right",
                        effect: "slide",
                      }
                    );
                  }
                } catch (error) {
                  handleCloseEdit();
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
              }}
              validationSchema={validationSchema}
            >
              {(props) => (
                <form className="form-horizontal" onSubmit={props.handleSubmit}>
                  <div className="row form-group">
                    <div className="col col-md-4">
                      <label
                        htmlFor="author-name-input"
                        className=" form-control-label"
                      >
                        Publisher Name
                      </label>
                    </div>
                    <div className="col-12 col-md-8">
                      <Form.Control
                        type="text"
                        id="authorName"
                        name="authorName"
                        placeholder="Enter author name"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.authorName}
                        isInvalid={
                          props.touched.authorName && props.errors.authorName
                        }
                      />
                      <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                    </div>
                    <small style={{ color: "#ff4d4d" }}>
                      {props.touched.authorName && props.errors.authorName}
                    </small>
                  </div>
                  <div className="row form-group">
                    <div className="col col-md-4">
                      <label
                        htmlFor="author-name-input"
                        className=" form-control-label"
                      >
                        Day Of Birth
                      </label>
                    </div>
                    <div className="col-12 col-md-8">
                      <label>
                        {moment(props.values.dob).format("YYYY-MM-DD")}
                      </label>
                    </div>
                  </div>
                  <div className="row form-group">
                    <div className="col col-md-4">
                      <label
                        htmlFor="author-name-input"
                        className=" form-control-label"
                      >
                        Day Of Birth
                      </label>
                    </div>
                    <div className="col-12 col-md-8">
                      <Form.Control
                        type="date"
                        id="dob"
                        name="dob"
                        placeholder="Enter address"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={moment(props.values.dob).format("YYYY-MM-DD")}
                        isInvalid={props.touched.dob && props.errors.dob}
                      />
                      <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                    </div>
                    <small style={{ color: "#ff4d4d" }}>
                      {props.touched.dob && props.errors.dob}
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
          <Modal.Title>Author Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
          <Container>
            <Row>
              <Col xs={6} md={4}>
                ID
              </Col>
              <Col xs={12} md={8}>
                {authorDetail._id}
              </Col>
            </Row>

            <Row>
              <Col xs={6} md={4}>
                Author Name
              </Col>
              <Col xs={12} md={8}>
                {authorDetail.authorName}
              </Col>
            </Row>
            <Row>
              <Col xs={6} md={4}>
                Day Of Birth
              </Col>
              <Col xs={12} md={8}>
                {moment(authorDetail.dob).format("YYYY-MM-DD")}
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
