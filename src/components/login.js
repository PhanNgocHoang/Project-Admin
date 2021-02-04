import React, { useContext, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import { checkLogin } from "../api/index";
import Alert from "react-s-alert";
import { useDispatch } from "react-redux";
import { AuthUserCtx } from "../context/auth";
const validationSchema = yup.object().shape({
  email: yup.string().email("Email invalid").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password is less than 6 characters")
    .required("Password is required"),
});
export const LoginComponent = () => {
  const [login, setLogin] = useState(false);
  const authContext = useContext(AuthUserCtx);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (value) => {
      try {
        const info = await checkLogin(value);
        if (info.status === 200) {
          const data = info.data;
          localStorage.setItem("token", data.token);
          authContext.setAuthUser(data.user);
          return Alert.success(
            `<div role="alert">
                     Login Successfully
                    </div>`,
            {
              html: true,
              position: "top-right",
              effect: "slide",
            }
          );
        }
      } catch (error) {
        return Alert.error(
          `<div role="alert">
                  ${error.response.data.message}
                  </div>`,
          {
            html: true,
            position: "top-right",
            effect: "slide",
          }
        );
      }
    },
    validationSchema: validationSchema,
  });
  const { handleSubmit, handleChange, handleBlur, touched, errors } = formik;
  if (authContext.authUser) {
    return <Redirect to="/" />;
  }
  return (
    <div className="sufee-login d-flex align-content-center flex-wrap">
      <Alert stack={{ limit: 3 }} />
      <div className="container">
        <div className="login-content">
          <div className="login-logo">
            <Link to="/">
              <img
                className="align-content"
                src="images/e-library.png"
                alt=""
              />
            </Link>
          </div>
          <div className="login-form">
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.email && errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.password && errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>
              <Button variant="info" type="submit" disabled={login}>
                Login
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
