import React, { useEffect, useState } from "react";
import Alert from "react-s-alert";
import queryString from "query-string";
import { Table, Button } from "react-bootstrap";
import Paginations from "react-js-pagination";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";
import moment from "moment";
import { getBorrows, expiredOrder } from "../../api/index";
export const BorrowComponent = () => {
  const [orders, setOrder] = useState([]);
  const [reload, setReload] = useState(true);
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
      const result = await getBorrows(paramsString);
      setOrder(result.data.orders);
      setPaginationInfo({
        ...paginationInfo,
        currentPage: result.data.currentPage,
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
  const handleExpired = async (orderId) => {
    try {
      const response = await expiredOrder({ orderId: orderId });
      setReload(!reload);
      return Alert.success(`<div role="alert">${response.data.message}</div>`, {
        html: true,
        position: "top-right",
        effect: "slide",
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
  return (
    <div className="content">
      <Alert stack={{ limit: 3 }} />
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <strong className="card-title">Borrows</strong>
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
                    placeholder="Search by email"
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
                      <th>Display Name</th>
                      <th>Email</th>
                      <th>Total Date</th>
                      <th>Price</th>
                      <th>Started At</th>
                      <th>End At</th>
                      <th>Status</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.userId.displayName}</td>
                        <td>{order.userId.email}</td>
                        <td>{order.totalDate}</td>
                        <td>{order.price}</td>
                        <td>
                          {moment(order.startedAt).format("YYYY-MM-DD HH:MM")}
                        </td>
                        <td>
                          {moment(order.endAt).format("YYYY-MM-DD HH:MM")}
                        </td>
                        <td>
                          {order.status === true ? (
                            <span style={{ color: "green" }}>Can red</span>
                          ) : (
                            <span style={{ color: "red" }}>Expired</span>
                          )}
                        </td>
                        <td>
                          {order.status === true ? (
                            <Button
                              variant="danger"
                              onClick={() => {
                                handleExpired(order._id);
                              }}
                            >
                              Expired
                            </Button>
                          ) : (
                            ""
                          )}
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
