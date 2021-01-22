import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom'
import queryString from 'query-string'
import { Table, Button, Modal} from 'react-bootstrap'
import { connect } from 'react-redux'
import Paginations from 'react-js-pagination'
function TypeBookComponent(props) {
    const [typeBook, setTypeBook] = useState([])
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 5,
    })
    const [paginationInfo, setPaginationInfo] = useState({
        currentPage: 1,
        totalItems:0,
        itemsCountPerPage: 5

    })
        useEffect(() => {
        const paramsString = queryString.stringify(pagination)
        axios.get(`https://e-libraryapi.herokuapp.com/typebook?${paramsString}`).then((response) => {
            // eslint-disable-next-line no-cond-assign
            if (response.status = 200) {
                setTypeBook(response.data.data.data)
                setPaginationInfo({...paginationInfo, currentPage:response.data.data.currentPage, totalItems: response.data.data.totalItems, itemsCountPerPage: parseInt(pagination.limit) })
            }
        }).catch((err) => {
            console.log(err)
        })
    }, [pagination])
    const getDetails = (id) => {
        axios.get(`https://e-libraryapi.herokuapp.com/typebook/${id}`).then((response)=>{
            if (response.status = 200) {
                console.log(response.data)
                
            }
        })
    }
    const deletetTypeBook = (id) => {
        console.log(id)
    }
    const editTypeBook = (id) => {
        console.log(id)
    }
    const getMore = (number) => {

        setPagination({ ...pagination, limit: number })
    }
    const handlePageChange = (pageNumber) => {
        setPagination({ ...pagination, page: pageNumber})
    }
    const handleSearch = (value) => {

    }
    
    return (
        <div className="content">
            <div className="animated fadeIn">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <strong className="card-title">Type Book</strong>
                                <NavLink to="/typeBook/create"><button className="btn btn-success" style={{ float: 'right' }}><i className="fa fa-plus-circle" aria-hidden="true"></i>Create</button></NavLink>
                            </div>
                            <div className="card-body">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fa fa-search" aria-hidden="true"></i></span>
                                    </div>
                                    <input type="text" className="form-control" placeholder="Search"  />
                                </div>
                                <div className="d-flex justify-content-end">
                                    <label htmlFor="numberItem" className="mr-2">Number item </label>
                                    <input name="numberItem" id="numberItem" value={pagination.limit} onChange={(e) => { getMore(e.target.value) }} />
                                </div>
                                <Table hover className="mt-3">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Type Name</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {typeBook.map(type => (
                                            <tr key={type._id}>
                                                <td>{type._id}</td>
                                                <td>{type.type_name}</td>
                                                <td className="py-2">
                                                    <Button size="sm" variant="info" className="m-2" onClick={() => { getDetails(type._id) }}>
                                                        <i className="fa fa-eye" aria-hidden="true">Details</i>
                                                    </Button>
                                                    <Button size="sm" variant="primary" className="m-2" onClick={() => { editTypeBook(type._id) }}>
                                                        <i className="fa fa-pencil-square" aria-hidden="true">Edit</i>
                                                    </Button>

                                                    <Button size="sm" variant="danger" className="ml-2" onClick={() => { deletetTypeBook(type._id) }}>
                                                        <i className="fa fa-trash" aria-hidden="true">Delete</i>
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
        </div>

    )
}
const mapStateToProps = (state) => {
    return {
        typeBook: state.typesbook
    }
}
export default connect(mapStateToProps, null)(TypeBookComponent)

function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Centered Modal</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }