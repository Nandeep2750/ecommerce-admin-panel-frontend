import React, { useEffect } from 'react';
import { Layout, Modal, notification } from 'antd';
import * as Yup from "yup";
import { FormikProvider, useFormik } from "formik";
import { Form, Input } from "formik-antd";

import { OPERATIONS } from '../../../config/constants';
import api from "../../../helper/Api";

const { Content } = Layout;

const AddEditCategory = (props) => {
    const { selectedData, isEditModalVisible, handleCloseAddEditModal, operationType, getCategoryList } = props
    const isAddOperation = operationType === OPERATIONS.ADD
    const isEditOperation = operationType === OPERATIONS.EDIT

    useEffect(() => {
        if (selectedData) {
            formik.setFieldValue('_id', selectedData._id, false);
            formik.setFieldValue('categoryName', selectedData.categoryName, false);
        }
    }, [selectedData]);


    const categoryValidationSchema = Yup.object().shape({
        _id: Yup.string().when("categoryName", {
            is: () => !isAddOperation,
            then: Yup.string().required()
        }),
        categoryName: Yup.string().required("Category Name is required")
    });

    const formik = useFormik({
        initialValues: {
            _id: isEditOperation ? selectedData?._id : "",
            categoryName: isEditOperation ? selectedData?.categoryName : ""
        },
        validationSchema: categoryValidationSchema,
        onSubmit: (values, actions) => {

            let fields = {};
            let api_path = "/cms/category/create";
            let api_method = "post";

            if (isEditOperation) {
                fields._id = values._id;
                api_path = "/cms/category/edit";
                api_method = "put";
            }

            fields.categoryName = values.categoryName;

            api[api_method](api_path, fields).then((res) => {
                actions.setSubmitting(false);
                if (res.status === 200 || res.status === 201) {
                    notification.success({
                        message: res.data.message
                    })
                    getCategoryList()
                    closeModal()
                } else {
                    notification.error({
                        message: res.data.message,
                    });
                }
            }).catch((err) => {
                actions.setSubmitting(false);
                if (err.response && err.response.data) {
                    notification.error({
                        message: err.response.data.message,
                    });
                }
            });
        }
    });

    const handleOk = () => {
        formik.submitForm()
    }

    const closeModal = () => {
        formik.resetForm()
        handleCloseAddEditModal()
    }

    return (
        <Content className='content'>

            <Modal maskClosable={false} title={`${isEditOperation ? "Edit" : "Add"} Category`} open={isEditModalVisible} onOk={handleOk} onCancel={closeModal} okButtonProps={{ loading: formik.isSubmitting }}  >
                <FormikProvider value={formik} >
                    <Form layout="horizontal" labelCol={{ span: 8 }} wrapperCol={{ span: 14 }}>
                        <Form.Item label="Category Name" name="categoryName" required>
                            <Input
                                type="text"
                                id="categoryName"
                                name="categoryName"
                                placeholder="Category Name"
                            />
                        </Form.Item>
                    </Form>
                </FormikProvider>
            </Modal>

        </Content>
    )
}

export default AddEditCategory