import React from 'react';
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
export const RegisterComponent = () => {
    return (
        <div className="sufee-login d-flex align-content-center flex-wrap">
            <div className="container">
                <div className="login-content">
                    <div className="login-logo">
                        <Link>
                            <img className="align-content" src="images/e-library.png" alt="" />
                        </Link>
                    </div>
                    <div className="login-form">
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="text" placeholder="Enter User Name" name="username" />
                                <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlSelect2">
                                <Form.Label>Role</Form.Label>
                                <Form.Control as="select">
                                    <option>Customer</option>
                                    <option>Admin</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="formPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" name="password" />
                                <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="formPassword">
                                <Form.Label> Confirm Password</Form.Label>
                                <Form.Control type="password" placeholder="Confirm Password" name="ConfirmPassword" />
                                <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="formPhoneNumber">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control type="string" placeholder="Phone Number" name="phoneNumber" />
                                <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                            </Form.Group>
                            <Button variant="info" type="submit">
                                Register
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>

    )
}