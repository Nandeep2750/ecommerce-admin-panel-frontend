import React, { useCallback } from "react";
import { Card, Button, notification, Row, Col } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

import { FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { Form, Input, SubmitButton } from "formik-antd";

import { userActions } from "../../../redux/actions/user.actions";
import { APP_ENV_TYPE, LOGIN_DATA } from "../../../config/constants";
import { Auth_BG } from "../../../helper/importHelper/image";
import api from "../../../helper/Api";
import { LOCATIONS } from "../../../config/routeConfig";


const Login = (props) => {
  const navigate = useNavigate();

  const LoginValidationSchema = Yup.object().shape({
    email: Yup.string().required().email(),
    password: Yup.string().required(),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginValidationSchema,
    onSubmit: (values, actions) => {
      api.post("/cms/auth/login", values)
        .then((res) => {
          if (res.status === 200) {
            props.login(res?.data?.data);
            actions.setSubmitting(false);
            actions.resetForm();
            navigate(LOCATIONS.DASHBOARD_ROUTE);
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

  const onFill = useCallback(async () => {
    await formik.setFieldValue("email", LOGIN_DATA.email, true)
    await formik.setFieldValue("password", LOGIN_DATA.password, true)
  }, [formik])


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
                <Form.Item name="submit">
                  <SubmitButton type="primary">Log in</SubmitButton>
                  {process.env.REACT_APP_ENV === APP_ENV_TYPE.LOCAL &&
                    <Button type="link" htmlType="button" onClick={onFill}>
                      Fill form
                    </Button>
                  }
                </Form.Item>

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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
