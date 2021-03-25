import React, { useEffect, useState } from "react";
import { Col, Form, Button, Card, CardGroup } from "react-bootstrap";
import {
  getAllAuthor,
  getAllBookTypes,
  getAllPublisher,
  uploadImages,
  uploadFile,
  createBook,
} from "../../api/index";
import { yupResolver } from "@hookform/resolvers/yup";
import Alert from "react-s-alert";
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
export const CreateBookComponent = () => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "all",
    shouldFocusError: true,
  });
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
  const [bookImage, setBookImage] = useState("");
  const [doc, setDoc] = useState();
  const [uploadStatus, setUploadStatus] = useState(false);
  const getData = async () => {
    const author = await getAllAuthor();
    const publisher = await getAllPublisher();
    const bookType = await getAllBookTypes();
    dispatch({ type: types.BOOK_TYPE, payload: bookType.data.data });
    dispatch({ type: types.BOOK_AUTHOR, payload: author.data.data });
    dispatch({ type: types.BOOK_PUBLISHER, payload: publisher.data.data });
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onSubmit = async (data) => {
    setUploadStatus(true);
    data.images = bookImage;
    data.file = doc.url;
    data.fileType = doc.fileType;
    try {
      const response = await createBook(data);
      setUploadStatus(false);
      Alert.success(`<div role="alert">${response.data.message}</div>`, {
        html: true,
        position: "top-right",
        effect: "slide",
      });
      window.location.href = "/books/add";
    } catch (error) {
      setUploadStatus(false);
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
  const uploadDoc = async (file) => {
    if (file !== undefined) {
      try {
        setUploadStatus(true);
        const formData = new FormData();
        formData.append("doc", file);
        const result = await uploadFile(formData);
        setDoc(result.data);
        return setUploadStatus(false);
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
    }
  };
  return (
    <div className="content">
      <Alert stack={{ limit: 3 }} />
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div>
                <div className="card-header">
                  <strong className="card-title">New Book</strong>
                </div>
                <div className="card-body">
                  <Form
                    className="form-horizontal"
                    onSubmit={handleSubmit(onSubmit)}
                  >
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
                            isInvalid={errors.book_name}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.book_name?.message}
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
                            ref={register}
                            placeholder="Enter book price"
                            isInvalid={errors.price}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.price?.message}
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
                              ref={register}
                              name="book_type"
                              key={type._id}
                              defaultValue={type._id}
                              isInvalid={errors.book_type}
                            />
                          ))}
                        </Col>
                        <Form.Control.Feedback type="invalid">
                          {errors.book_type?.message}
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
                              ref={register}
                              id={author._id}
                              defaultValue={author._id}
                              className="ml-4"
                              isInvalid={errors.authors}
                            />
                          ))}
                        </Col>
                        <Form.Control.Feedback>
                          {errors.authors?.message}
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
                              ref={register}
                              label={publisher.publisherName}
                              name="publisher"
                              key={publisher._id}
                              defaultValue={publisher._id}
                              isInvalid={errors.publisher}
                            />
                          ))}
                        </Col>
                        <Form.Control.Feedback type="invalid">
                          {errors.publisher?.message}
                        </Form.Control.Feedback>
                      </Form.Row>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        ref={register}
                        name="description"
                        isInvalid={errors.description}
                        id="description"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.description?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Image</Form.Label>
                      <Form.File
                        accept="image/png, image/jpeg"
                        ref={register}
                        isInvalid={errors.images}
                        onChange={async (event) => {
                          try {
                            const formData = new FormData();
                            formData.append("image", event.target.files[0]);
                            if (event.target.files[0] !== undefined) {
                              setUploadStatus(true);
                              const response = await uploadImages(formData);
                              setBookImage(response.data.url);
                              return setUploadStatus(false);
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
                        disabled={uploadStatus}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.images?.message}
                      </Form.Control.Feedback>
                      {bookImage ? (
                        <CardGroup className="mt-3">
                          <Card
                            style={{ width: "18rem" }}
                            className="mb-3 ml-3"
                          >
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
                        ref={register}
                        isInvalid={errors.file}
                        label="Choose a PDF file or audio file"
                        accept=".pdf,audio/*"
                        onChange={async (event) => {
                          await uploadDoc(event.target.files[0]);
                        }}
                        disabled={uploadStatus}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.file?.message}
                      </Form.Control.Feedback>
                      {doc ? (
                        <CardGroup className="mt-3">
                          <Card
                            style={{ width: "18rem", height: "50rem" }}
                            className="mb-3 ml-3"
                          >
                            <Iframe url={doc.url} width="100%" height="100%" />
                          </Card>
                        </CardGroup>
                      ) : null}
                    </Form.Group>
                    <Button
                      variant="success"
                      type="submit"
                      disabled={uploadStatus}
                    >
                      {uploadStatus ? "Creating....." : " Create"}
                    </Button>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
