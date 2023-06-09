import React, { useEffect, useState } from 'react';
import { Layout, Card, Table, Space, Button, notification, Popconfirm, Switch } from 'antd';
import { EditOutlined, DeleteOutlined} from '@ant-design/icons';
import BreadcrumbComponent from '../../common/Breadcrumb';
import { itemRender } from '../../../helper/Paginationfunction';
import { LOCATIONS } from '../../../config/routeConfig';
import { OPERATIONS, PAGINATION, TOGGLE } from '../../../config/constants';
import api from "../../../helper/Api";
import AddEditCategory from './AddEditCategory';

const { Content } = Layout;

const Index = () => {
    const [loading, setLoading] = useState(true);
    const [totalRecords, setTotalRecords] = useState(0);
    const [pageSize, setPageSize] = useState(PAGINATION.DEFAULT_PAGE_SIZE);
    const [currentPage, setCurrentPage] = useState(PAGINATION.DEFAULT_PAGE_NO);
    const [editCategoryData, setEditCategoryData] = useState(null);
    const [categories, setCategories] = useState([]);
    
    const [selectedData, setSelectedData] = useState(null);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [operationType, setOperationType] = useState(OPERATIONS.ADD);

    useEffect(() => {
        getCategoryList();
    }, [pageSize, currentPage]);

    const handleShowSizeChange = (_current, size) => {
        setPageSize(size);
    };

    const handlePagination = (page, _size) => {
        setCurrentPage(page);
    };

    const breadcrumb_items = [
        { label: "Dashboard", to: LOCATIONS.DASHBOARD_ROUTE },
        { label: "Category" },
    ];

    const getCategoryList = () => {
        setLoading(true)
        
        let params = {
            page: currentPage,
            limit: pageSize
        };

        api.post("/cms/category/paginate-list", params).then((res) => {
            setLoading(false);
            if (res.status === 200) {
                if (res?.data?.data) {
                    setCategories(res?.data?.data?.docs);
                    setTotalRecords(res?.data?.data?.totalDocs);
                }
            } else {
                notification.error({
                    message: res.data.message,
                });
            }
        }).catch((err) => {
            setLoading(false);
            if (err.response && err.response.data) {
                notification.error({
                    message: err.response.data.message,
                });
            }
        });
    };

    const handleStatusChange = (checked, record) => {
        let data = {
            _id: record._id,
            status: checked ? TOGGLE.ACTIVE.VALUE : TOGGLE.INACTIVE.VALUE,
        }
        setEditCategoryData(record)
        api.put("/cms/category/edit", data).then(async (res) => {
            if (res.status === 200) {
                await getCategoryList();
                await setEditCategoryData(null)
                notification.success({
                    message: res.data.message,
                })
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
        });
    };

    const handleOpenAddEditModal = (type, data = null) => {
        setIsEditModalVisible(true);
        setOperationType(type)

        if (type === OPERATIONS.EDIT) {
            setSelectedData(data)
        }
    };

    const handleCloseAddEditModal = () => {
        setIsEditModalVisible(false);
        setOperationType(OPERATIONS.ADD)
        setSelectedData(null)
    };

    const handleDelete = (id) => {
        api.delete(`/cms/category/delete?_id=${id}`).then((res) => {
            if (res.status === 200) {
                notification.success({
                    message: res.data.message
                })
                getCategoryList()
            } else {
                notification.error({
                    message: res.data.message
                })
            }
          }).catch((err) => {
            if (err.response && err.response.data) {
                notification.error({
                    message: err.response.data.message,
                });
            }
        });
    };

    const tableColumns = [
        {
            title: "Category",
            dataIndex: "categoryName",
        },
        {
            title: "Status",
            dataIndex: "status",
            render: (data, record) => {
                return <Switch
                    onChange={(checked) => handleStatusChange(checked, record)}
                    checkedChildren={TOGGLE.ACTIVE.LABLE}
                    checked={data === TOGGLE.ACTIVE.VALUE}
                    unCheckedChildren={TOGGLE.INACTIVE.LABLE}
                    loading={editCategoryData?._id === record._id}
                    style={{ width: 80 }}
                />
            }
        },
        {
            title: "Actions",
            dataIndex: "actions",
            render: (_text, record) => {
                return (
                    <Space size={10}>
                        <Button type="link" shape="circle" icon={<EditOutlined />} loading={false} onClick={() => handleOpenAddEditModal(OPERATIONS.EDIT, record)} />
                        <Popconfirm
                            placement="bottomRight"
                            title="Are you sure want to delete this category?"
                            onConfirm={()=> handleDelete(record._id)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button type="link" shape="circle" icon={<DeleteOutlined />} loading={false}  />
                        </Popconfirm>
                    </Space>
                )

            }
        }
    ];

    const tableData = categories;

    return (
        <Content className='content'>
            <div className='page-header'>
                <h2 className='page-title'> Category </h2>
                <BreadcrumbComponent breadcrumb_items={breadcrumb_items} />
            </div>
            <div className='content-wrapper'>
                <Card
                    title="Categories list"
                    extra={ <Button type="primary" htmlType="button" onClick={() => handleOpenAddEditModal(OPERATIONS.ADD,null)}>Add Category</Button>}
                >
                    <Table
                        className="table-striped"
                        style={{ overflow: "auto" }}
                        columns={tableColumns}
                        dataSource={tableData}
                        ascend={true}
                        rowKey={(record) => record._id}
                        showSizeChanger={true}
                        loading={loading}
                        pagination={{
                            total: totalRecords,
                            pageSize: pageSize,
                            showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                            onChange: handlePagination,
                            showSizeChanger: true,
                            onShowSizeChange: handleShowSizeChange,
                            itemRender: itemRender,
                        }}
                    />

                    <AddEditCategory 
                        selectedData={selectedData} 
                        isEditModalVisible={isEditModalVisible}
                        handleCloseAddEditModal={handleCloseAddEditModal}
                        operationType={operationType} 
                        getCategoryList={getCategoryList}
                    />

                </Card>
            </div>
        </Content>
    )
}

export default Index