import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Content } from 'antd/lib/layout/layout';

import { Card, notification } from "antd";
import { FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { Form, Input, SubmitButton, Radio } from "formik-antd";

import BreadcrumbComponent from '../../common/Breadcrumb';
import { useNavigate, useParams } from 'react-router';
import { LOCATIONS } from '../../../config/routeConfig';
import { GENDER, OPERATIONS, TOGGLE } from '../../../config/constants';
import api from "../../../helper/Api";

export const AddEditUser = ({ operationType }) => {

    const params = useParams()
    const navigate = useNavigate()
    const isAddOperation = operationType === OPERATIONS.ADD
    const isEditOperation = operationType === OPERATIONS.EDIT

    useEffect(() => {
        if (isEditOperation) {
            api.get(`/cms/user/details-by-id?userId=${params.userId}`).then((res) => {
                if (res.status === 200) {
                    formik.setFieldValue('_id', res.data.data._id, true);
                    formik.setFieldValue('firstName', res.data.data.firstName, true);
                    formik.setFieldValue('lastName', res.data.data.lastName, true);
                    formik.setFieldValue('email', res.data.data.email, true);
                    formik.setFieldValue('gender', res.data.data.gender, true);
                    formik.setFieldValue('status', res.data.data.status, true);
                } else {
                    notification.error({
                        message: res.data.message,
                    });
                }
            }).catch((err) => {
                if (err.response && err.response.data) {
                    notification.error({
                        message: err.response.data,
                    });
                    navigate(LOCATIONS.USER_ROUTE.ROOT);
                }
            });
        }
    }, [])

    const breadcrumb_items = [
        { label: "Dashboard", to: LOCATIONS.DASHBOARD_ROUTE },
        { label: "User", to: LOCATIONS.USER_ROUTE.ROOT },
        { label: `${isAddOperation ? "Add" : "Edit"}` }
    ];

    const StaicPageValidationSchema = Yup.object().shape({
        _id: Yup.string().when("firstName", {
            is: () => !isAddOperation,
            then: Yup.string().required("User Id is a required from URL")
        }),
        firstName: Yup.string().required(),
        lastName: Yup.string().required(),
        email: Yup.string().required().email(),
        gender: Yup.string().required(),
        status: Yup.string().required()
    });

    const formik = useFormik({
        initialValues: {
            _id: "",
            firstName: "",
            lastName: "",
            email: "",
            gender: "",
            status: TOGGLE.ACTIVE.VALUE,
            password: "",
        },
        validationSchema: StaicPageValidationSchema,
        onSubmit: (values, actions) => {
            let fields = {};
            let api_path = "/cms/user/create";
            let api_method = "post";

            if (isEditOperation) {
                fields._id = values._id;
                fields.status = values.status;
                api_path = "/cms/user/edit";
                api_method = "put";
            } else if (isAddOperation) {
                fields.email = values.email;
                fields.password = values.password;
            }

            fields.firstName = values.firstName;
            fields.lastName = values.lastName;
            fields.gender = values.gender;

            api[api_method](api_path, fields).then((res) => {
                actions.setSubmitting(false);
                if (res.status === 200 || res.status === 201) {
                    notification.success({
                        message: res.data.message
                    })
                    navigate(LOCATIONS.USER_ROUTE.ROOT);
                } else {
                    notification.error({
                        message: res.data.message,
                    });
                }
            }).catch((err) => {
                actions.setSubmitting(false);
                if (err.response && err.response.data) {
                    navigate(LOCATIONS.USER_ROUTE.ROOT);
                    notification.error({
                        message: err.response.data.message,
                    });
                }
            });
        }
    });


    return (
        <Content className='content'>
            <div className='page-header'>
                <h2 className='page-title'> User </h2>
                <BreadcrumbComponent breadcrumb_items={breadcrumb_items} />
            </div>
            <div className='content-wrapper'>
                <Card title={`${isAddOperation ? "Add" : "Edit"} User`}>
                    <FormikProvider value={formik}>
                        <Form
                            name="add-edit-user-form"
                            layout="horizontal"
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 14 }}
                        >
                            <Form.Item label="First Name" name="firstName" required>
                                <Input
                                    id="firstName"
                                    name="firstName"
                                    placeholder="First Name"
                                />
                            </Form.Item>
                            <Form.Item label="Last Name" name="lastName" required>
                                <Input
                                    id="lastName"
                                    name="lastName"
                                    placeholder="Last Name"
                                />
                            </Form.Item>
                            <Form.Item label="Email" name="email" required>
                                <Input
                                    id="email"
                                    name="email"
                                    placeholder="Email"
                                    disabled={isEditOperation}
                                />
                            </Form.Item>
                            {isAddOperation &&
                                <Form.Item label="Password" name="password" required>
                                    <Input
                                        type="password"
                                        id="password"
                                        name="password"
                                        placeholder="Password"
                                        disabled={isEditOperation}
                                    />
                                </Form.Item>
                            }
                            <Form.Item label="Gender" name="gender" required>
                                <Radio.Group
                                    options={Object.values(GENDER).map((data,index)=>{
                                        return {
                                            label: data.LABLE,
                                            value: data.VALUE
                                        }
                                    })}
                                    name='gender'
                                />
                            </Form.Item>
                            {isEditOperation &&
                                <Form.Item label="Status" name="status" required>
                                    <Radio.Group
                                        options={Object.values(TOGGLE).map((data,index)=>{
                                            return {
                                                label: data.LABLE,
                                                value: data.VALUE
                                            }
                                        })}
                                        name='status'
                                    />
                                </Form.Item>
                            }
                            <Form.Item name="submit" wrapperCol={{ offset: 6, span: 14 }}>
                                <SubmitButton type="primary">{isAddOperation ? "Add" : "Save"}</SubmitButton>
                            </Form.Item>
                        </Form>
                    </FormikProvider>
                </Card>
            </div>
        </Content>
    )

}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(AddEditUser)