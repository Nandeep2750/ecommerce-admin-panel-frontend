import React from 'react'
import { connect } from 'react-redux'
import { Content } from 'antd/lib/layout/layout';
import { Card, notification } from "antd";
import { FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { Form, Input, SubmitButton } from "formik-antd";

import BreadcrumbComponent from '../../common/Breadcrumb';
import { userActions } from '../../../redux/actions/user.actions';
import { useNavigate } from 'react-router';
import { LOCATIONS } from '../../../config/routeConfig';
import api from "../../../helper/Api";
import { ADMIN_CONFIG } from '../../../config/constants';


export const Index = (props) => {
    const navigate = useNavigate();

    const breadcrumb_items = [
        { label: "Dashboard", to: LOCATIONS.DASHBOARD_ROUTE },
        { label: "Change Password" }
    ];

    const changePasswordValidationSchema = Yup.object().shape({
        currentPassword: Yup.string().required("Confirm Password is a required field"),
        newPassword: Yup.string().required("New Password is a required field").min(ADMIN_CONFIG.password.min).max(ADMIN_CONFIG.password.max),
        confirmNewPassword: Yup.string().required("Confirm New Password is a required field").oneOf([Yup.ref('newPassword'), null], "New Password and Confirm New Password must match"),
    });

    const formik = useFormik({
        initialValues: {
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: "",
        },
        validationSchema: changePasswordValidationSchema,
        onSubmit: (values, actions) => {

            let variables = {}
            variables.currentPassword = values.currentPassword
            variables.newPassword = values.newPassword

            api.put("/cms/admin/change-password", variables).then((res) => {
                if (res.status === 200) {
                    actions.setSubmitting(false);
                    notification.success({
                        message: res.data.message,
                    })
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
    });

    return (
        <Content className='content'>
            <div className='page-header'>
                <h2 className='page-title'> Change Password </h2>
                <BreadcrumbComponent breadcrumb_items={breadcrumb_items} />
            </div>
            <div className='content-wrapper'>
                <Card title="Change Password">
                    <FormikProvider value={formik}>
                        <Form
                            name="change-password-form"
                            layout="horizontal"
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 14 }}
                        >
                            <Form.Item label="Current Password" name="currentPassword" required>
                                <Input
                                    type="password"
                                    id="currentPassword"
                                    name="currentPassword"
                                    placeholder="Current Password"
                                />
                            </Form.Item>
                            <Form.Item label="New Password" name="newPassword" required>
                                <Input
                                    type="password"
                                    id="newPassword"
                                    name="newPassword"
                                    placeholder="New Password"
                                />
                            </Form.Item>
                            <Form.Item label="Confirm New Password" name="confirmNewPassword" required>
                                <Input
                                    type="password"
                                    id="confirmNewPassword"
                                    name="confirmNewPassword"
                                    placeholder="Confirm New Password"
                                />
                            </Form.Item>
                            <Form.Item name="submit" wrapperCol={{ offset: 6, span: 14 }}>
                                <SubmitButton type="primary">Save</SubmitButton>
                            </Form.Item>
                        </Form>
                    </FormikProvider>
                </Card>
            </div>
        </Content>
    )
}

const mapStateToProps = (state) => ({
    userData: state.authentication.userData
})

const mapDispatchToProps = {
    updateProfile: userActions.updateProfile
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)