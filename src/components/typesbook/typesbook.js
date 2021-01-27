/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Alert from "react-s-alert";
import queryString from 'query-string'
import { Table, Button, Modal, Form, Container, Row, Col } from 'react-bootstrap'
import Paginations from 'react-js-pagination'
import { Formik } from 'formik';
import { createBookType, updateBookType, getBookType, deletetBookTypeApi, getBookTypeDetails } from '../../api/index'
import * as yup from 'yup'
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";
const validationSchema = yup.object().shape({
    type_name: yup.string().required("Type Name is required").matches('^[a-zA-Z0-9 ]*$', "Type name not valid")
})
export const TypeBookComponent = () => {
    const [bookType, setBookType] = useState([])
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 5,
        searchKey: ""
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
    const [showCreated, setShowCreated] = useState(false)
    const [showDetails, setShowDetails] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const getData = async () => {
        try {
            const paramsString = queryString.stringify(pagination)
            const result = await getBookType(paramsString)
            if (result.status === 200) {
                setBookType(result.data.data.data)
                setPaginationInfo({ ...paginationInfo, currentPage: result.data.data.currentPage, totalItems: result.data.data.totalItems, itemsCountPerPage: parseInt(pagination.limit) })
            }
        } catch (error) {
            return Alert.error(
                `<div role="alert">${error.response.data.message}</div>`,
                {
                    html: true,
                    position: "top-right",
                    effect: "slide"
                }
            )
        }

    }
    useEffect(() => {
        getData()
    }, [pagination, reload])
    const deletetBookType = async (id) => {
        try {
            const result = await deletetBookTypeApi(id)
            if (result.status === 200) {
                setReload(!reload)
                return Alert.success(
                    `<div role="alert">
                   ${result.data.message}
                  </div>`,
                    {
                        html: true,
                        position: "top-right",
                        effect: "slide"
                    }
                )
            }
        } catch (error) {
            return Alert.error(
                `<div role="alert">
                ${error.response.data.message}</div>`,
                {
                    html: true,
                    position: "top-right",
                    effect: "slide"
                }
            )
        }
    }
    const confirmDelete = (id) => {
        // eslint-disable-next-line no-restricted-globals
        const result = confirm("Do you want to delete");
        if (result == true) {
            deletetBookType(id)
        }

    }
    const editBookType = async (id) => {
        try {
            const result = await getBookTypeDetails(id)
            if (result.status === 200) {
                setTypeBookDetail({
                    _id: result.data.data._id,
                    type_name: result.data.data.type_name
                })
                handleShowEdit()
            }
        } catch (error) {
            return Alert.error(
                `<div role="alert">
                ${error.response.data.message}</div>`,
                {
                    html: true,
                    position: "top-right",
                    effect: "slide"
                }
            )
        }
    }
    const getMore = (number) => {

        setPagination({ ...pagination, limit: number })
    }
    const handlePageChange = (pageNumber) => {
        setPagination({ ...pagination, page: pageNumber })
    }
    const handleSearch = (value) => {
        console.log(value)
        setPagination({ ...pagination, searchKey: value })

    }
    const handleShowEdit = () => { setShowEdit(true) }
    const handleCloseEdit = () => { setShowEdit(false) }
    const handleCloseCreate = () => { setShowCreated(false) }
    const handleShowCreate = () => { setShowCreated(true) }
    const handleShowDetails = async (id) => {
        try {
            const result = await getBookTypeDetails(id)
            if (result.status === 200) {
                setTypeBookDetail({
                    _id: result.data.data._id,
                    type_name: result.data.data.type_name
                })
                setShowDetails(true)
            }
        } catch (error) {
            return Alert.error(
                `<div role="alert">
                ${error.response.data.message}</div>`,
                {
                    html: true,
                    position: "top-right",
                    effect: "slide"
                }
            )
        }
    }
    const handleCloseDetails = () => { setShowDetails(false) }
    const initialValues = {
        type_name: '',
    }
    return (
        <div className="content">
            <div className="animated fadeIn">
                <div className="row">
                    <Alert stack={{ limit: 3 }} />
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <strong className="card-title">Book Type</strong>
                                <button className="btn btn-success" style={{ float: 'right' }} onClick={handleShowCreate}><i className="fa fa-plus-circle" aria-hidden="true"></i>Create</button>
                            </div>
                            <div className="card-body">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fa fa-search" aria-hidden="true"></i></span>
                                    </div>
                                    <input type="text" className="form-control" placeholder="Search" onChange={(e) => { handleSearch(e.target.value) }} />
                                </div>
                                <div className="d-flex justify-content-end">
                                    <label htmlFor="numberItem" className="mr-2">Number item </label>
                                    <input name="numberItem" id="numberItem" value={pagination.limit} onChange={(e) => { getMore(e.target.value) }} />
                                </div>
                                <Table hover className="mt-3 table table-bordered">
                                    <thead>
                                        <tr>
                                            <th style={{ width: '20%' }}>ID</th>
                                            <th>Type Name</th>
                                            <th style={{ width: '20%' }}></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bookType.map(type => (
                                            <tr key={type._id}>
                                                <td>{type._id}</td>
                                                <td>{type.type_name}</td>
                                                <td className="py-2">
                                                    <Button size="sm" variant="info" className="m-2" onClick={() => { handleShowDetails(type._id) }}>
                                                        <i className="fa fa-eye" aria-hidden="true">Details</i>
                                                    </Button>
                                                    <Button size="sm" variant="primary" className="m-2" onClick={() => { editBookType(type._id) }}>
                                                        <i className="fa fa-pencil-square" aria-hidden="true">Edit</i>
                                                    </Button>

                                                    <Button size="sm" variant="danger" className="ml-2" onClick={() => { confirmDelete(type._id) }}>
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
                    <Modal.Title>Create Book Type</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="card-body card-block">
                        <Formik
                            initialValues={initialValues}
                            onSubmit={async (values) => {
                                try {
                                    const result = await createBookType(values)
                                    if (result.status === 200) {
                                        handleCloseCreate();
                                        setReload(!reload)
                                        return Alert.success(
                                            `<div role="alert">
                                             ${result.data.message}
                                            </div>`,
                                            {
                                                html: true,
                                                position: "top-right",
                                                effect: "slide"
                                            }
                                        )
                                    }
                                } catch (error) {
                                    handleCloseCreate();
                                    return Alert.error(
                                        `<div role="alert">
                                            ${error.response.data.message}
                                            </div>`,
                                        {
                                            html: true,
                                            position: "top-right",
                                            effect: "slide"
                                        }
                                    )
                                }
                            }}
                            validationSchema={validationSchema}
                        >
                            {props => (
                                <form className="form-horizontal" onSubmit={props.handleSubmit}>
                                    <div className="row form-group">
                                        <div className="col col-md-3"><label htmlFor="author-name-input" className=" form-control-label">Type name</label></div>
                                        <div className="col-12 col-md-9">
                                            <Form.Control
                                                type="text" id="type-name" name="type_name"
                                                placeholder="Enter type name"
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                isInvalid={props.touched.type_name && props.errors.type_name}
                                            />
                                            <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                                        </div>
                                        <small style={{ color: '#ff4d4d' }}>{props.touched.type_name && props.errors.type_name}</small>
                                    </div>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleCloseCreate}>Close</Button>
                                        <Button variant="success" type="submit">Created</Button>
                                    </Modal.Footer>
                                </form>
                            )}
                        </Formik>
                    </div>
                </Modal.Body>
            </Modal>


            <Modal show={showEdit} onHide={handleCloseEdit}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Book Type</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="card-body card-block">
                        <Formik
                            initialValues={typeBookDetail}
                            onSubmit={async (values) => {
                                try {
                                    const result = await updateBookType(values, values._id)
                                    if (result.status === 200) {
                                        handleCloseEdit()
                                        setReload(!reload)
                                        return Alert.success(
                                            `<div role="alert">
                                            ${result.data.message}
                                            </div>`,
                                            {
                                                html: true,
                                                position: "top-right",
                                                effect: "slide"
                                            }
                                        )
                                    }
                                } catch (error) {
                                    handleCloseEdit()
                                    return Alert.error(
                                        `<div role="alert">
                                            ${error.response.data.message}
                                            </div>`,
                                        {
                                            html: true,
                                            position: "top-right",
                                            effect: "slide"
                                        }
                                    )
                                }
                            }}
                            validationSchema={validationSchema}
                        >
                            {props => (
                                <form className="form-horizontal" onSubmit={props.handleSubmit}>
                                    <div className="row form-group">
                                        <div className="col col-md-3"><label htmlFor="author-name-input" className=" form-control-label">Type name</label></div>
                                        <div className="col-12 col-md-9">
                                            <Form.Control
                                                type="text" id="type_name" name="type_name"
                                                placeholder="Enter type name"
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                value={props.values.type_name}
                                                isInvalid={props.touched.type_name && props.errors.type_name}
                                            />
                                            <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                                        </div>
                                        <small style={{ color: '#ff4d4d' }}>{props.touched.type_name && props.errors.type_name}</small>
                                    </div>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleCloseEdit}>Close</Button>
                                        <Button variant="success" type="submit">Save</Button>
                                    </Modal.Footer>
                                </form>
                            )}
                        </Formik>
                    </div>
                </Modal.Body>
            </Modal>

            <Modal show={showDetails} onHide={handleCloseDetails}>
                <Modal.Header closeButton>
                    <Modal.Title>Type Book Details</Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Container>
                        <Row>
                            <Col xs={6} md={4}>ID</Col>
                            <Col xs={12} md={8}>{typeBookDetail._id}</Col>
                        </Row>

                        <Row>
                            <Col xs={6} md={4}>Type Name</Col>
                            <Col xs={12} md={8}>{typeBookDetail.type_name}</Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDetails}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
