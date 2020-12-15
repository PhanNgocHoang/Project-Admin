import React, {useState} from 'react';
import {useFormik } from 'formik';
import * as yup from 'yup'
import {Alert, Form} from 'react-bootstrap'
import axios from 'axios'
const validationSchema = yup.object().shape({
    type_name: yup.string().required("Type Name is required").matches(/(^[A-Za-z]{1,16})([ ]{0,1})([A-Za-z]{1,16})?([ ]{0,1})?([A-Za-z]{1,16})?([ ]{0,1})?([A-Za-z]{1,16})/, "Type name not valid")
})
export const FormCreateTypeBookComponent = () => {
    const [isSuccess, setSuccess]= useState()
    const [isError, setError] = useState(false)
    const formik = useFormik({
        initialValues: {
            type_name: '',
        },
        onSubmit: (value) =>{
            axios.post(`http://localhost:4000/typebook/createtypebook`, {
                type_name: value.type_name
            }).then((response) => {
                if(response.status == 200){
                    setSuccess(true);
                }
                setSuccess(false);
            })
        },
        validationSchema: validationSchema
    })
    const { handleSubmit, handleChange, handleBlur, touched, errors } = formik
    return (
        <div className="content">
            <div className="animated fadeIn">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header">
                                <strong>Create Type Book</strong>
                            </div>
                            {isSuccess ? <Alert variant="success">Create Type Book successfully</Alert> : <Alert variant="success">Create Type Book successfully</Alert>}
                            <div className="card-body card-block">
                                <form className="form-horizontal" onSubmit={handleSubmit}>
                                    <div className="row form-group">
                                        <div className="col col-md-3"><label htmlFor="author-name-input" className=" form-control-label">Type name</label></div>
                                        <div className="col-12 col-md-9">
                                            <Form.Control 
                                            type="text" id="type-name" name="type_name" 
                                            placeholder="Enter type name"  
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isInvalid={touched.username && errors.username}
                                            />
                                            <Form.Control.Feedback type="invalid">{errors.type_name}</Form.Control.Feedback>
                                            </div>
                                        <small>{touched.type_name && errors.type_name}</small>
                                    </div>
                                    <div className="row form-group d-flex justify-content-center">
                                        <button type="submit" className="btn btn-success">
                                            <i className="fa fa-plus-square" />Create</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}