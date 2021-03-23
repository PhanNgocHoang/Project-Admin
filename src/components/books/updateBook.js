import React, { useEffect, useState } from "react";
import {
  Row,
  Container,
  Col,
  Form,
  Button,
  Modal,
  Card,
  CardGroup,
  Image,
} from "react-bootstrap";
import {
  getBookDetail,
  getAllAuthor,
  getAllBookTypes,
  getAllPublisher,
} from "../../api/index";
import * as types from "../../constants/actionTypes";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Iframe from "react-iframe";
import * as yup from "yup";
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
export const UpdateBook = (props) => {
  const { register, handleSubmit, watch, errors } = useForm();
  const dispatch = useDispatch();
  const bookTypes = useSelector((state) => {
    return state.bookType.data;
  });
  const publishers = useSelector((state) => {
    return state.publishers.data;
  });
  const authors = useSelector((state) => {
    return state.authors.data;
  });
  const bookId = props.match.params.bookId;
  const [bookDetails, setBookDetails] = useState();
  const getData = async () => {
    const author = await getAllAuthor();
    const publisher = await getAllPublisher();
    const bookType = await getAllBookTypes();
    dispatch({ type: types.BOOK_TYPE, payload: bookType.data.data });
    dispatch({ type: types.BOOK_AUTHOR, payload: author.data.data });
    dispatch({ type: types.BOOK_PUBLISHER, payload: publisher.data.data });
  };
  useEffect(() => {
    getBookDetail(bookId).then((response) => {
      setBookDetails(response.data.data);
    });
    getData();
  }, [bookId]);
  const onSubmit = async () => {};
  return (
    <div className="content">
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              {bookDetails ? (
                <div>
                  <div className="card-header">
                    <strong className="card-title">
                      {bookDetails.book_name}
                    </strong>
                  </div>
                  <div className="card-body">
                    <Form className="form-horizontal" onSubmit={handleSubmit}>
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
                              ref={register}
                              placeholder="Enter book name"
                              defaultValue={bookDetails.book_name}
                            />
                            {/* <Form.Control.Feedback type="invalid">
                            
                            </Form.Control.Feedback> */}
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
                              defaultValue={bookDetails.price}
                            />
                            <Form.Control.Feedback type="invalid">
                              {/* {prop.touched.price && prop.errors.price} */}
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
                                defaultValue={type._id}
                                name="book_type"
                                key={type._id}
                                checked={
                                  type._id === bookDetails.book_type._id
                                    ? true
                                    : false
                                }
                              />
                            ))}
                          </Col>
                          <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
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
                                checked={
                                  bookDetails.authors.some(
                                    (item) => item._id === author._id
                                  )
                                    ? true
                                    : false
                                }
                                className="ml-4"
                                // onChange={(e) => {
                                //   const value = e.target.checked
                                //     ? author._id
                                //     : null;
                                //   if (value === null) {
                                //     const authors = prop.initialValues.authors;
                                //     const index = authors.findIndex(
                                //       (item) => item === e.target.value
                                //     );
                                //     prop.values.authors.splice(index, 1);
                                //   } else {
                                //     prop.values.authors.push(author._id);
                                //   }
                                // }}
                                defaultValue={author._id}
                              />
                            ))}
                          </Col>
                          <Form.Control.Feedback></Form.Control.Feedback>
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
                                defaultValue={publisher._id}
                                name="publisher"
                                key={publisher._id}
                                checked={
                                  publisher._id == bookDetails.publisher._id
                                    ? true
                                    : false
                                }
                              />
                            ))}
                          </Col>
                          <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                        </Form.Row>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={5}
                          name="description"
                          id="description"
                          defaultValue={bookDetails.description}
                          //   onChange={(event) => {
                          //     initialValues.description = event.target.value;
                          //   }}
                        />
                        <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Images</Form.Label>
                        <Form.File
                          accept="image/png, image/jpeg"
                          //   onChange={async (event) => {
                          //     try {
                          //       const formData = new FormData();
                          //       formData.append(
                          //         "image",
                          //         event.target.files[0]
                          //       );
                          //       if (event.target.files[0] !== undefined) {
                          //         setUploadStatus(true);
                          //         const response = await uploadImages(
                          //           formData
                          //         );
                          //         setBookImage(response.data.url);
                          //         setUploadStatus(false);
                          //         return (prop.values.images =
                          //           response.data.url);
                          //       }
                          //     } catch (error) {
                          //       return Alert.error(
                          //         `<div role="alert"> <i class="fa fa-times-circle" aria-hidden="true"></i> ${error.response.data.message}</div>`,
                          //         {
                          //           html: true,
                          //           position: "top-right",
                          //           effect: "slide",
                          //         }
                          //       );
                          //     }
                          //   }}
                          name="images"

                          //   disabled={uploadStatus}
                        />
                        <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                        {bookDetails.images ? (
                          <CardGroup className="mt-3">
                            <Card
                              style={{ width: "18rem" }}
                              className="mb-3 ml-3"
                            >
                              <Card.Img
                                variant="top"
                                src={bookDetails.images}
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
                          //   onChange={(event) => {
                          //     const url = uploadDoc(event.target.files[0]);
                          //     return (prop.values.file = url);
                          //   }}
                          //   isInvalid={prop.touched.file && prop.errors.file}
                          //   disabled={uploadStatus}
                        />
                        <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                        {bookDetails.file ? (
                          <CardGroup className="mt-3">
                            <Card
                              style={{ width: "18rem", height: "50rem" }}
                              className="mb-3 ml-3"
                            >
                              <Iframe
                                url={bookDetails.file}
                                width="100%"
                                height="100%"
                              />
                            </Card>
                          </CardGroup>
                        ) : null}
                      </Form.Group>
                      <Button
                        variant="success"
                        type="submit"
                        //   disabled={uploadStatus}
                      >
                        Created
                      </Button>
                    </Form>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
