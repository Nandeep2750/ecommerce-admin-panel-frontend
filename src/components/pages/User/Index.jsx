import React, { useEffect, useState } from 'react';
import { Layout, Card, Table, Form, Input, notification, Switch, Button, Space } from 'antd';
import { EditOutlined, SearchOutlined } from '@ant-design/icons';
import BreadcrumbComponent from '../../common/Breadcrumb';
import { itemRender } from '../../../helper/Paginationfunction';
import { LOCATIONS } from '../../../config/routeConfig';
import { GENDER, PAGINATION, TOGGLE } from '../../../config/constants';
import api from "../../../helper/Api";
import { Link, useNavigate } from 'react-router-dom';

const { Content } = Layout;

const Index = (props) => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true);
    const [totalRecords, setTotalRecords] = useState(0);
    const [pageSize, setPageSize] = useState(PAGINATION.DEFAULT_PAGE_SIZE);
    const [currentPage, setCurrentPage] = useState(PAGINATION.DEFAULT_PAGE_NO);
    const [users, setUsers] = useState([]);
    const [editUserData, setEditUserData] = useState(null);
    const [search, setSearch] = useState("");

    useEffect(() => {
        getStaticPageList();
    }, [pageSize, currentPage, search]);

    const handleShowSizeChange = (_current, size) => {
        setPageSize(size);
    };

    const handlePagination = (page, _size) => {
        setCurrentPage(page);
    };

    const handleSearch = (event) => {
        let value = event.target.value;
        setSearch(value);
    };

    const breadcrumb_items = [
        { label: "Dashboard", to: LOCATIONS.DASHBOARD_ROUTE },
        { label: "Users" },
    ];

    const getStaticPageList = () => {
        let params = {
            page: currentPage,
            limit: pageSize,
            search: search,
        };

        api.post("/cms/user/list", params).then((res) => {
            setLoading(false);
            if (res.status === 200) {
                if (res?.data?.data) {
                    setUsers(res?.data?.data?.docs);
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
            userId: record._id,
            status: checked ? TOGGLE.ACTIVE.VALUE : TOGGLE.INACTIVE.VALUE,
        }
        setEditUserData(record)
        api.post("/cms/user/active-inactive", data).then(async (res) => {
            if (res.status === 200) {
                await getStaticPageList();
                await setEditUserData(null)
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

    const tableColumns = [
        {
            title: "First Name",
            dataIndex: "firstName",
        },
        {
            title: "Last Name",
            dataIndex: "lastName",
        },
        {
            title: "Email",
            dataIndex: "email",
        },
        {
            title: "Gender",
            dataIndex: "gender",
            render: (text, record) => {
                return GENDER[text].LABLE
            }
        },
        {
            title: "Status",
            dataIndex: "status",
            render: (_text, record) => {
                return <Switch
                    onChange={(checked) => handleStatusChange(checked, record)}
                    checkedChildren={TOGGLE.ACTIVE.LABLE}
                    checked={record.status === TOGGLE.ACTIVE.VALUE}
                    unCheckedChildren={TOGGLE.INACTIVE.LABLE}
                    loading={editUserData && editUserData._id === record._id}
                    style={{ width: 80 }}
                />
            }
        },
        {
            title: "Actions",
            dataIndex: "_id",
            render: (text, record) => {
                let editUrl = LOCATIONS.USER_ROUTE.EDIT.replace(':userId', text);
                return (
                    <Space size={10}>
                        <Button type="link" shape="circle" icon={<EditOutlined />} loading={false} onClick={() => navigate(editUrl)} />
                    </Space>
                )

            }
        }
    ];

    const tableData = users;


    return (
        <Content className='content'>
            <div className='page-header'>
                <h2 className='page-title'> Users </h2>
                <BreadcrumbComponent breadcrumb_items={breadcrumb_items} />
            </div>
            <div className='content-wrapper'>
                <Card
                    title="Users list"
                    extra={
                        <Button type="primary" htmlType="button" >
                            <Link to={LOCATIONS.USER_ROUTE.ADD}>
                                Add User
                            </Link>
                        </Button>
                    }
                >
                    <Form name="horizontal_login" className="justify-content-end mb-20" layout="inline">
                        <Form.Item name="search">
                            <Input
                                prefix={<SearchOutlined className="site-form-item-icon" />}
                                type="text"
                                placeholder="Search"
                                onChange={handleSearch}
                            />
                        </Form.Item>
                    </Form>
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
                </Card>
            </div>
        </Content>
    )
}

export default Index