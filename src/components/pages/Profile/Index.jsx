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


export const Index = (props) => {
    const navigate = useNavigate();

    const breadcrumb_items = [
        { label: "Dashboard", to: LOCATIONS.DASHBOARD_ROUTE },
        { label: "Profile" }
    ];

    const ProfileValidationSchema = Yup.object().shape({
        email: Yup.string().required().email(),
        firstName: Yup.string().required(),
        lastName: Yup.string().required(),
    });

    const formik = useFormik({
        initialValues: {
            email: props?.userData?.email || "",
            firstName: props?.userData.firstName || "",
            lastName: props?.userData.lastName || "",
        },
        validationSchema: ProfileValidationSchema,
        onSubmit: (values, actions) => {

            let variables = {}
            variables.firstName = values.firstName
            variables.lastName = values.lastName

            api.put("/cms/admin/update-profile", variables).then((res) => {
                    if (res.status === 200) {
                        props?.updateProfile(res?.data?.data);
                        actions.setSubmitting(false);
                        notification.success({
                            message: res.data.message,
                        })
                        navigate(LOCATIONS.ROOT);
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
                <h2 className='page-title'> Profile </h2>
                <BreadcrumbComponent breadcrumb_items={breadcrumb_items} />
            </div>
            <div className='content-wrapper'>
                <Card title="Profile">
                    <FormikProvider value={formik}>
                        <Form
                            name="profile-form"
                            layout="horizontal"
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 14 }}
                        >
                            <Form.Item label="Email" name="email" required>
                                <Input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Email"
                                    disabled={true}
                                />
                            </Form.Item>
                            <Form.Item label="First Name" name="firstName" required>
                                <Input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    placeholder="First Name"
                                />
                            </Form.Item>
                            <Form.Item label="Last Name" name="lastName" required>
                                <Input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    placeholder="Last Name"
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