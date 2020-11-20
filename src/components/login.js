import React from 'react';
import {Link} from 'react-router-dom'
import {Form, Button } from 'react-bootstrap'
import { useFormik } from 'formik'
import * as yup from 'yup'
const validationSchema = yup.object().shape({
    email: yup.string().email('Email invalid').required('Email is required'),
    password: yup.string().min(6, 'Password is less than 6 characters').required('Password is required'),
})
export const LoginComponent = () => {
    const formik = useFormik({
        initialValues:{
            email: '',
            password: ''
        },
        onSubmit: (value) =>{
            
        },
        validationSchema: validationSchema
    })
    const {handleSubmit, handleChange, handleBlur, touched, errors} = formik
    return (
            <div className="sufee-login d-flex align-content-center flex-wrap">
                <div className="container">
                    <div className="login-content">
                        <div className="login-logo">
                            <Link to="/">
                                <img className="align-content" src="images/e-library.png" alt="" />
                            </Link>
                        </div>
                        <div className="login-form">
                        <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" placeholder="Enter Email" name="email" 
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.email && errors.email}
                            />
                            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" name="password" 
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.password && errors.password}
                            />
                            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                        </Form.Group>
                        <Button variant="info" type="submit" onSubmit={handleSubmit}>
                            Login
                        </Button>
                    </Form>
                        </div>
                    </div>
                </div>
            </div>
    )
}