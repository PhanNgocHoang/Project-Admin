import React, { useEffect, useState } from 'react';
import Alert from "react-s-alert";
import axios from 'axios';
import queryString from 'query-string'
import { Table, Button, Modal, Form, Container, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import Paginations from 'react-js-pagination'
import { useFormik } from 'formik';
import * as yup from 'yup'
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";
const validationSchema = yup.object().shape({
    type_name: yup.string().required("Type Name is required").matches(/(^[A-Za-z]{1,16})([ ]{0,1})([A-Za-z]{1,16})?([ ]{0,1})?([A-Za-z]{1,16})?([ ]{0,1})?([A-Za-z]{1,16})/, "Type name not valid")
})
function TypeBookComponent() {
    const [typeBook, setTypeBook] = useState([])
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 5,
    })
    const [reload, setReload] = useState(false)
    const [paginationInfo, setPaginationInfo] = useState({
        currentPage: 1,
        totalItems: 0,
        itemsCountPerPage: 5

    })
    const [typeBookDetail, setTypeBookDetail] = useState({
        _id: "",
        type_name: ""
    })
    const [type_name, setTypeName] = useState("")
    const [showCreated, setShowCreated] = useState(false)
    const [showDetails, setShowDetails] = useState(false)
    useEffect(() => {
        const paramsString = queryString.stringify(pagination)
        axios.get(`https://e-libraryapi.herokuapp.com/typebook?${paramsString}`).then((response) => {
            // eslint-disable-next-line no-cond-assign
            if (response.status = 200) {
                setTypeBook(response.data.data.data)
                setPaginationInfo({ ...paginationInfo, currentPage: response.data.data.currentPage, totalItems: response.data.data.totalItems, itemsCountPerPage: parseInt(pagination.limit) })
            }
        }).catch((err) => {
            console.log(err)
        })
    }, [pagination, reload])
    const deletetTypeBook = (id) => {
        axios.delete(`https://e-libraryapi.herokuapp.com/typebook/${id}`, {
        }).then((response) => {
            if (response.status == 200) {
                setReload(!reload)
                return Alert.success(
                    `<div role="alert">
                   ${response.data.message}
                  </div>`,
                    {
                        html: true,
                        position: "top-right",
                        effect: "slide"
                    }
                )
            }
        })
    }
    const editTypeBook = (id) => {

    }
    const getMore = (number) => {

        setPagination({ ...pagination, limit: number })
    }
    const handlePageChange = (pageNumber) => {
        setPagination({ ...pagination, page: pageNumber })
    }
    const handleSearch = (value) => {

    }
    const handleCloseCreate = () => { setShowCreated(false) }
    const handleShowCreate = () => { setShowCreated(true) }
    const handleShowDetails = (id) => {
        axios.get(`https://e-libraryapi.herokuapp.com/typebook/${id}`).then((response) => {
            setTypeBookDetail({
                _id: response.data.data._id,
                type_name: response.data.data.type_name
            })
            setTypeName(response.data.data.type_name)
            setShowDetails(true)
        })
    }
    const handleCloseDetails = () => { setShowDetails(false) }
    const formik = useFormik({
        initialValues: {
            type_name: '',
        },
        onSubmit: (value) => {
            axios.post(`https://e-libraryapi.herokuapp.com/typebook/createtypebook`, {
                type_name: value.type_name
            }).then((response) => {
                if (response.status == 200) {
                    handleCloseCreate();
                    setReload(!reload)
                    return Alert.success(
                        `<div role="alert">
                       ${response.data.message}
                      </div>`,
                        {
                            html: true,
                            position: "top-right",
                            effect: "slide"
                        }
                    )
                }
            })
        },
        validationSchema: validationSchema
    })

    const changeTypeName = (type_name) => {
        setTypeName(type_name)
    }
    const { handleSubmit, handleChange, handleBlur, touched, errors } = formik
    return (
        <div className="content">
            <div className="animated fadeIn">
                <div className="row">
                    <Alert stack={{ limit: 3 }} />
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <strong className="card-title">Type Book</strong>
                                <button className="btn btn-success" style={{ float: 'right' }} onClick={handleShowCreate}><i className="fa fa-plus-circle" aria-hidden="true"></i>Create</button>
                            </div>
                            <div className="card-body">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fa fa-search" aria-hidden="true"></i></span>
                                    </div>
                                    <input type="text" className="form-control" placeholder="Search" />
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
                                                    <Button size="sm" variant="info" className="m-2" onClick={() => { handleShowDetails(type._id) }}>
                                                        <i className="fa fa-eye" aria-hidden="true">Details</i>
                                                    </Button>
                                                    <Button size="sm" variant="primary" className="m-2" onClick={editTypeBook(type._id)}>
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
            <Modal show={showCreated} onHide={handleCloseCreate}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Type Book</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="card-body card-block">
                        <form className="form-horizontal">
                            <div className="row form-group">
                                <div className="col col-md-3"><label htmlFor="author-name-input" className=" form-control-label">Type name</label></div>
                                <div className="col-12 col-md-9">
                                    <Form.Control
                                        type="text" id="type-name" name="type_name"
                                        placeholder="Enter type name"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.type_name && errors.type_name}
                                    />
                                    <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                                </div>
                                <small>{touched.type_name && errors.type_name}</small>
                            </div>
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseCreate}>Close</Button>
                    <Button variant="success" onClick={handleSubmit}>Created</Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showDetails} onHide={handleCloseDetails}>
                <Modal.Header closeButton>
                    <Modal.Title>Type Book Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className="card-body card-block">
                        <form className="form-horizontal">
                            <div className="row form-group">
                                <div className="col col-md-3"><label htmlFor="author-name-input" className=" form-control-label">Type name</label></div>
                                <div className="col-12 col-md-9">
                                    <Form.Control
                                        type="text" id="type-name" name="type_name"
                                        placeholder="Enter type name"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={type_name}
                                        isInvalid={touched.type_name && errors.type_name}
                                    />
                                    <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                                </div>
                                <small>{touched.type_name && errors.type_name}</small>
                            </div>
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDetails}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        typeBook: state.typesbook
    }
}
export default connect(mapStateToProps, null)(TypeBookComponent)