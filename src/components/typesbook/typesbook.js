import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom'
import queryString from 'query-string'
import { Table, Button, Pagination } from 'react-bootstrap'
import { connect } from 'react-redux'
import Paginations from '../pagination';
function TypeBookComponent(props) {
    const [typeBook, setTypeBook] = useState([])
    const [pagination, setPagination] = useState({
        page: 1,
        totalPages: 10,
        perPage: 2,
    })
    useEffect(() => {
        const paramsString = queryString.stringify(pagination)
        console.log("🚀 ~ file: typesbook.js ~ line 17 ~ useEffect ~ paramsString", paramsString)
        axios.get(`https://e-libraryapi.herokuapp.com/typebook?${paramsString}`).then((response) => {
            console.log("🚀 ~ file: typesbook.js ~ line 19 ~ axios.get ~ paramsString", paramsString)
            if (response.status = 200) {
                setTypeBook(response.data.data.data)
                setPagination({
                    page: response.data.data.currentPage,
                    totalPages: response.data.data.totalDocs,
                    perPage: response.data.data.perPage,
                })
                return false
            }
        }).catch((err) => {
            console.log(err)
        })
    }, [])
    const getDetails = (id) => {
    }
    const deletetTypeBook = (id) => {
        console.log(id)
    }
    const editTypeBook = (id) => {
        console.log(id)
    }
    const getMore = (number) => {
        setPagination({ ...pagination, perPage: number })

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
                                    <input type="text" className="form-control" placeholder="Search" aria-label="Username" />
                                </div>
                                <div className="d-flex justify-content-end">
                                    <label htmlFor="numberItem" className="mr-2">Number item </label>
                                    <input list="numberItems" name="numberItem" id="numberItem" value={pagination.limit} onChange={(e) => { getMore(e.target.value) }} />
                                    <datalist id="numberItems">
                                        <option value="5" />
                                        <option value="10" />
                                        <option value="15" />
                                        <option value="20" />
                                        <option value="25" />
                                    </datalist>
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
                                <Pagination className="d-flex justify-content-end">
                                    <Paginations pages={pagination} />
                                </Pagination>
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