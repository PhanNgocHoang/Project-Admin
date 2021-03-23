import React, { useEffect, useState } from "react";
import { Row, Container, Col } from "react-bootstrap";
import { getBookDetail } from "../../api/index";
import Iframe from "react-iframe";
export const BookDetails = (props) => {
  const bookId = props.match.params.bookId;
  const [bookDetails, setBookDetails] = useState();
  useEffect(() => {
    getBookDetail(bookId).then((response) => {
      setBookDetails(response.data.data);
    });
  }, [bookId]);
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
                    <Container>
                      <Row style={{ marginBottom: 10 }}>
                        <Col>Book Type</Col>
                        <Col>{bookDetails.book_type.type_name}</Col>
                      </Row>
                      <Row style={{ marginBottom: 10 }}>
                        <Col>Author</Col>
                        {bookDetails.authors.map((item) => (
                          <Col key={item._id}>{item.authorName}</Col>
                        ))}
                      </Row>
                      <Row style={{ marginBottom: 10 }}>
                        <Col>Publisher</Col>
                        <Col>{bookDetails.publisher.publisherName}</Col>
                      </Row>
                      <Row style={{ marginBottom: 10 }}>
                        <Col>Price</Col>
                        <Col>{bookDetails.price}</Col>
                      </Row>

                      <Row style={{ marginBottom: 10 }}>
                        <Col>File</Col>
                        <Col style={{ width: 100, height: 500 }}>
                          <Iframe
                            url={bookDetails.file}
                            width="100%"
                            height="100%"
                          />
                        </Col>
                      </Row>
                      <Row style={{ marginBottom: 10 }}>
                        <Col>Image</Col>
                        <Col>
                          <img
                            src={bookDetails.images}
                            style={{ width: 200 }}
                          />
                        </Col>
                      </Row>
                    </Container>
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
