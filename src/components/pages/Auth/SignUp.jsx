import React from "react";
import { Card, notification, Row, Col } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";

import { FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { Form, Input, SubmitButton } from "formik-antd";

import { userActions } from "../../../redux/actions/user.actions";
import { Auth_BG } from "../../../helper/importHelper/image";
import api from "../../../helper/Api";
import { LOCATIONS } from "../../../config/routeConfig";


const SignUp = (props) => {
  const navigate = useNavigate();

  const SignUpValidationSchema = Yup.object().shape({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    email: Yup.string().required().email(),
    password: Yup.string().required(),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Must match "password" field value'),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: SignUpValidationSchema,
    onSubmit: (values, actions) => {
      delete values.confirmPassword
      api.post("/cms/auth/register", values)
        .then((res) => {
          if (res.status === 201) {
            notification.success({
              message: res.data.message,
            })
            actions.setSubmitting(false);
            actions.resetForm();
            navigate(LOCATIONS.LOGIN_ROUTE);
          } else {
            notification.error({
              message: res.data.message,
            })
          }
        }).catch((err) => {
          if (err.response && err.response.data) {
            notification.error({
              message: err.response.data.message,
            })
          }
          actions.setSubmitting(false);
        });
    }
  })

  return (
    <div className="auth-page position-relative vh-100" style={{ backgroundImage: `url(${Auth_BG})` }}>
      <Card className="auth-card center-div w-90-pr w-md-75-pr w-lg-50-pr m-auto shadow-lg border-radius-10">
        <Row className="h-30-pr">
          <Col span={12} className="d-flex align-items-center justify-content-center bg-242F6B">
            <div className="bg-image"></div>
            <h1 className="text-white">QuickMart</h1>
          </Col>
          <Col span={12} className="d-flex align-items-center justify-content-center">
            <FormikProvider value={formik} >
              <Form name="login-form" className="my-100">
                <Form.Item name="firstName">
                  <Input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="First Name"
                    prefix={<MailOutlined className="site-form-item-icon" />}
                  />
                </Form.Item>
                <Form.Item name="lastName">
                  <Input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Last Name"
                    prefix={<MailOutlined className="site-form-item-icon" />}
                  />
                </Form.Item>
                <Form.Item name="email">
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    prefix={<MailOutlined className="site-form-item-icon" />}
                  />
                </Form.Item>
                <Form.Item name="password">
                  <Input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    prefix={<LockOutlined className="site-form-item-icon" />}
                  />
                </Form.Item>
                <Form.Item name="confirmPassword">
                  <Input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    prefix={<LockOutlined className="site-form-item-icon" />}
                  />
                </Form.Item>
                <Form.Item name="submit">
                  <SubmitButton type="primary">Sign Up</SubmitButton>
                </Form.Item>
                <p>Don't have account? <Link to={LOCATIONS.LOGIN_ROUTE} > Login </Link> </p>

                {/* Uncomment this comment for Debug */}
                {/* <pre>
                    <FormikDebug />
                </pre> */}
              </Form>
            </FormikProvider>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  login: userActions.login,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
