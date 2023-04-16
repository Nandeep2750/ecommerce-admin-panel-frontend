import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Content } from 'antd/lib/layout/layout';

import { Card, notification } from "antd";
import { FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { Form, Input, InputNumber, Select, SubmitButton } from "formik-antd";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

import BreadcrumbComponent from '../../common/Breadcrumb';
import { useNavigate, useParams } from 'react-router';
import { LOCATIONS } from '../../../config/routeConfig';
import { CURRENCY, OPERATIONS } from '../../../config/constants';
import api from "../../../helper/Api";
import { CKEditorDefaultConfig } from '../../../config/ckEditorConfig';
import { TOGGLE } from '../../../config/constants';

DecoupledEditor.defaultConfig = CKEditorDefaultConfig

export const AddEditProduct = ({ operationType }) => {

    const [categories, setCategories] = useState([]);
    const params = useParams()
    const navigate = useNavigate()
    const isAddOperation = operationType === OPERATIONS.ADD
    const isEditOperation = operationType === OPERATIONS.EDIT

    useEffect(() => {
        if (isEditOperation) {
            api.get(`/cms/product/details-by-id?productId=${params.productId}`).then((res) => {
                if (res.status === 200) {
                    formik.setFieldValue('_id', res.data.data._id, true);
                    formik.setFieldValue('productName', res.data.data.productName, true);
                    formik.setFieldValue('categoryId', res.data.data.categoryId, true);
                    formik.setFieldValue('productDescription', res.data.data.productDescription, true);
                    formik.setFieldValue('productImageUrl', res.data.data.productImageUrl, true);
                    formik.setFieldValue('productPrice', res.data.data.productPrice, true);
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
                    navigate(LOCATIONS.PRODUCT_ROUTE.ROOT);
                }
            });
        }

        api.get(`/cms/category/list?status=${TOGGLE.ACTIVE.VALUE}`).then((res) => {
            if (res.status === 200) {
                setCategories(res.data.data)
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
                navigate(LOCATIONS.PRODUCT_ROUTE.ROOT);
            }
        });
    }, [])

    const breadcrumb_items = [
        { label: "Dashboard", to: LOCATIONS.DASHBOARD_ROUTE },
        { label: "Products", to: LOCATIONS.PRODUCT_ROUTE.ROOT },
        { label: `${isAddOperation ? "Add" : "Edit"}` }
    ];

    const ProductValidationSchema = Yup.object().shape({
        _id: Yup.string().when("productName", {
            is: () => !isAddOperation,
            then: Yup.string().required("Product Id is a required from URL")
        }),
        productName: Yup.string().required(),
        categoryId: Yup.string().required(),
        productDescription: Yup.string().required(),
        productImageUrl: Yup.string().url().required(),
        productPrice: Yup.number().required(),
    });

    const formik = useFormik({
        initialValues: {
            _id: "",
            productName: "",
            categoryId: "",
            productDescription: "",
            productImageUrl: "",
            productPrice: null,
        },
        validationSchema: ProductValidationSchema,
        onSubmit: (values, actions) => {
            let fields = {};
            let api_path = "/cms/product/create";
            let api_method = "post";

            if (isEditOperation) {
                fields._id = values._id;
                api_path = "/cms/product/edit";
                api_method = "put";
            }

            fields.productName = values.productName;
            fields.categoryId = values.categoryId;
            fields.productDescription = values.productDescription;
            fields.productImageUrl = values.productImageUrl;
            fields.productPrice = values.productPrice;

            api[api_method](api_path, fields).then((res) => {
                actions.setSubmitting(false);
                if (res.status === 200 || res.status === 201) {
                    notification.success({
                        message: res.data.message
                    })
                    navigate(LOCATIONS.PRODUCT_ROUTE.ROOT);
                } else {
                    notification.error({
                        message: res.data.message,
                    });
                }
            }).catch((err) => {
                actions.setSubmitting(false);
                if (err.response && err.response.data) {
                    navigate(LOCATIONS.PRODUCT_ROUTE.ROOT);
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
                <h2 className='page-title'> Product </h2>
                <BreadcrumbComponent breadcrumb_items={breadcrumb_items} />
            </div>
            <div className='content-wrapper'>
                <Card title={`${isAddOperation ? "Add" : "Edit"} Product`}>
                    <FormikProvider value={formik}>
                        <Form
                            name="add-edit-product-form"
                            layout="horizontal"
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 14 }}
                        >
                            <Form.Item label="Name" name="productName" required>
                                <Input
                                    id="productName"
                                    name="productName"
                                    placeholder="Name"
                                />
                            </Form.Item>
                            <Form.Item label="Category" name="categoryId" required>
                                <Select
                                    options={categories.map((category) => {
                                        return {
                                            label: category.categoryName,
                                            value: category._id
                                        }
                                    })}
                                    id="categoryId"
                                    name="categoryId"
                                    placeholder="Category"
                                />
                            </Form.Item>
                            <Form.Item label="Image Url" name="productImageUrl" required>
                                <Input
                                    id="productImageUrl"
                                    name="productImageUrl"
                                    placeholder="Image Url"
                                />
                                {formik.values.productImageUrl &&
                                    <img src={formik.values.productImageUrl} alt="Invalid Image URL" height={100} className='mt-20' />
                                }
                            </Form.Item>
                            <Form.Item label="Product Price" name="productPrice" required>
                                <InputNumber 
                                    id="productPrice"
                                    name="productPrice"
                                    placeholder="Product Price"
                                    addonAfter={CURRENCY} />
                            </Form.Item>
                            <Form.Item label="Description" name="productDescription" required>
                                <CKEditor
                                    editor={DecoupledEditor}
                                    onReady={(editor) => {
                                        editor?.ui?.getEditableElement()?.parentElement?.insertBefore(
                                            editor.ui.view.toolbar.element,
                                            editor.ui.getEditableElement()
                                        );
                                    }}
                                    data={formik.values.productDescription}
                                    name="productDescription"
                                    onChange={(event, editor) => {
                                        let data = editor.getData();
                                        formik.setFieldValue("productDescription", data, true)
                                    }}
                                />
                            </Form.Item>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddEditProduct)