import React, { useEffect, useState } from "react";
import Alert from "react-s-alert";
import queryString from "query-string";
import { Table, Button } from "react-bootstrap";
import Paginations from "react-js-pagination";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";
import moment from "moment";
import { getUsers } from "../../api/index";
import { NavLink } from "react-router-dom";
export const UserComponent = () => {
  const [users, setUser] = useState([]);
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
      const result = await getUsers(paramsString);
      console.log(result);

      setUser(result.data.data);
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
  }, [pagination]);
  const getMore = (number) => {
    setPagination({ ...pagination, limit: number });
  };
  const handlePageChange = (pageNumber) => {
    setPagination({ ...pagination, page: pageNumber });
  };
  const handleSearch = (value) => {
    setPagination({ ...pagination, searchKey: value });
  };
  return (
    <div className="content">
      <Alert stack={{ limit: 3 }} />
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <strong className="card-title">Users</strong>
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
                      <th>Total eCoins</th>
                      <th>Join Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user._id}>
                        <td>{user._id}</td>
                        <td>{user.displayName}</td>
                        <td>{user.email}</td>
                        <td>{user.wallet}</td>
                        <td>{moment(user.createdAt).format("YYYY-MM-DD")}</td>
                        <td>
                          {" "}
                          {user.status == true ? (
                            <span style={{ color: "green" }}>Active</span>
                          ) : (
                            <span style={{ color: "red" }}>Block</span>
                          )}
                        </td>
                        <td className="py-2">
                          <NavLink to={`/payment/${user._id}`}>
                            <Button size="sm" variant="info" className="m-2">
                              <i
                                className="fa fa-credit-card"
                                aria-hidden="true"
                              >
                                Payment
                              </i>
                            </Button>
                          </NavLink>
                          {user.status === false ? (
                            <Button size="sm" variant="primary" className="m-2">
                              <i className="fa fa-unlock" aria-hidden="true">
                                UnBlock
                              </i>
                            </Button>
                          ) : (
                            <Button size="sm" variant="danger" className="ml-2">
                              <i className="fa-lock" aria-hidden="true">
                                Block
                              </i>
                            </Button>
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
