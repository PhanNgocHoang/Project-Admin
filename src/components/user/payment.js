import React, { useEffect, useState } from "react";
import Alert from "react-s-alert";
import queryString from "query-string";
import { Table } from "react-bootstrap";
import Paginations from "react-js-pagination";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";
import moment from "moment";
import { PaymentHistory } from "../../api/index";
export const PaymentComponent = (props) => {
  const userId = props.match.params.userId;
  const [payments, setPayments] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 5,
  });
  const [paginationInfo, setPaginationInfo] = useState({
    currentPage: 1,
    totalItems: 0,
    itemsCountPerPage: 5,
  });
  const getData = async () => {
    try {
      const paramsString = queryString.stringify(pagination);
      const result = await PaymentHistory(userId, paramsString);
      setPayments(result.data.data);
      setPaginationInfo({
        ...paginationInfo,
        currentPage: result.data.page,
        totalItems: result.data.totalItems,
        itemsCountPerPage: parseInt(pagination.limit),
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
  }, [pagination]);
  const getMore = (number) => {
    setPagination({ ...pagination, limit: number });
  };
  const handlePageChange = (pageNumber) => {
    setPagination({ ...pagination, page: pageNumber });
  };
  return (
    <div className="content">
      <Alert stack={{ limit: 3 }} />
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <strong className="card-title">
                  Payment History:{" "}
                  {payments.length > 0 ? payments[0].userId.displayName : ""}
                </strong>
              </div>
              <div className="card-body">
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
                      <th>Payment ID</th>
                      <th>Amount</th>
                      <th>Currency</th>
                      <th>Payee Email</th>
                      <th>Payment At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((payment) => (
                      <tr key={payment._id}>
                        <td>{payment._id}</td>
                        <td>{payment.paymentId}</td>
                        <td>{payment.amount}</td>
                        <td>{payment.currency}</td>
                        <td>{payment.payeeEmail}</td>
                        <td>
                          {moment(payment.createdAt).format("YYYY-MM-DD HH:MM")}
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
