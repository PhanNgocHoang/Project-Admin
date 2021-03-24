import React, { useEffect, useState } from "react";
import { getDashboard } from "../../api/index";
import moment from "moment";
export const Dashboard = () => {
  const [dashboard, setDashboard] = useState();
  const getData = async () => {
    const response = await getDashboard();
    setDashboard(response.data);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="content">
      {/* Animated */}
      <div className="animated fadeIn">
        {/* Widgets  */}
        {dashboard ? (
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="card">
                <div className="card-body">
                  <div className="stat-widget-five">
                    <div className="stat-icon dib flat-color-1">
                      <i className="pe-7s-cash" />
                    </div>
                    <div className="stat-content">
                      <div className="text-left dib">
                        <div className="stat-text">
                          $
                          <span className="count">
                            {dashboard.borrow.totalBorrowPrice}
                          </span>
                        </div>
                        <div className="stat-heading">Revenue</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card">
                <div className="card-body">
                  <div className="stat-widget-five">
                    <div className="stat-icon dib flat-color-2">
                      <i className="pe-7s-repeat" />
                    </div>
                    <div className="stat-content">
                      <div className="text-left dib">
                        <div className="stat-text">
                          <span className="count">
                            {dashboard.borrow.totalBorrow}
                          </span>
                        </div>
                        <div className="stat-heading">Borrows</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card">
                <div className="card-body">
                  <div className="stat-widget-five">
                    <div className="stat-icon dib flat-color-3">
                      <i className="pe-7s-timer" />
                    </div>
                    <div className="stat-content">
                      <div className="text-left dib">
                        <div className="stat-text">
                          <span className="count">
                            {dashboard.borrow.totalBorrowTime}
                          </span>
                        </div>
                        <div className="stat-heading">Times borrow: Day</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card">
                <div className="card-body">
                  <div className="stat-widget-five">
                    <div className="stat-icon dib flat-color-4">
                      <i className="pe-7s-users" />
                    </div>
                    <div className="stat-content">
                      <div className="text-left dib">
                        <div className="stat-text">
                          <span className="count">
                            {dashboard.totalUserJoin}
                          </span>
                        </div>
                        <div className="stat-heading">Users</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card">
                <div className="card-body">
                  <div className="stat-widget-five">
                    <div className="stat-icon dib flat-color-4">
                      <i className="pe-7s-credit" />
                    </div>
                    <div className="stat-content">
                      <div className="text-left dib">
                        <div className="stat-text">
                          <span className="count">
                            {dashboard.totalTransactionAmount.totalTransaction}
                          </span>
                        </div>
                        <div className="stat-heading">Transactions</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card">
                <div className="card-body">
                  <div className="stat-widget-five">
                    <div className="stat-icon dib flat-color-1">
                      <i className="pe-7s-piggy" />
                    </div>
                    <div className="stat-content">
                      <div className="text-left dib">
                        <div className="stat-text">
                          <span className="count">
                            {dashboard.totalTransactionAmount.totalMoney}
                          </span>
                        </div>
                        <div className="stat-heading">Transactions amount</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card">
                <div className="card-body">
                  <div className="stat-widget-five">
                    <div className="stat-icon dib flat-color-2">
                      <i className="pe-7s-bookmarks" />
                    </div>
                    <div className="stat-content">
                      <div className="text-left dib">
                        <div className="stat-text">
                          <span className="count">{dashboard.totalBook}</span>
                        </div>
                        <div className="stat-heading">Books</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card">
                <div className="card-body">
                  <div className="stat-widget-five">
                    <div className="stat-icon dib flat-color-3">
                      <i className="pe-7s-id" />
                    </div>
                    <div className="stat-content">
                      <div className="text-left dib">
                        <div className="stat-text">
                          <span className="count">{dashboard.totalAuthor}</span>
                        </div>
                        <div className="stat-heading">Authors</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card">
                <div className="card-body">
                  <div className="stat-widget-five">
                    <div className="stat-icon dib flat-color-4">
                      <i className="pe-7s-portfolio" />
                    </div>
                    <div className="stat-content">
                      <div className="text-left dib">
                        <div className="stat-text">
                          <span className="count">
                            {dashboard.totalPublishers}
                          </span>
                        </div>
                        <div className="stat-heading">Publishers</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card">
                <div className="card-body">
                  <div className="stat-widget-five">
                    <div className="stat-icon dib flat-color-2">
                      <i className="pe-7s-notebook" />
                    </div>
                    <div className="stat-content">
                      <div className="text-left dib">
                        <div className="stat-text">
                          <span className="count">
                            {dashboard.totalBookType}
                          </span>
                        </div>
                        <div className="stat-heading">Book type</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        {/* /Widgets */}
      </div>
      {/*  /Traffic */}
      <div className="clearfix" />
      {/* Orders */}
      <div className="orders">
        <div className="row">
          <div className="col-xl-4">
            <div className="row">
              <div className="col-lg-6 col-xl-12">
                <div className="card bg-flat-color-3  ">
                  <div className="card-body">
                    <h4 className="card-title m-0  white-color ">
                      {moment().format("dddd, MMMM Do YYYY")}
                    </h4>
                  </div>
                  <div className="card-body">
                    <div id="flotLine5" className="flot-line" />
                  </div>
                </div>
              </div>
            </div>
          </div>{" "}
          {/* /.col-md-4 */}
        </div>
      </div>
      {/* /.orders */}
    </div>
  );
};
