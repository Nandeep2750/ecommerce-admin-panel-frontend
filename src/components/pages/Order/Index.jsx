import React, { useEffect, useState } from 'react';
import { Layout, Card, Table, Space, Button, notification, Popconfirm } from 'antd';
import { EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import BreadcrumbComponent from '../../common/Breadcrumb';
import { itemRender } from '../../../helper/Paginationfunction';
import { LOCATIONS } from '../../../config/routeConfig';
import { CURRENCY, PAGINATION } from '../../../config/constants';
import { Link, useNavigate } from 'react-router-dom';
import api from "../../../helper/Api";
import { getPlaceholderImage } from '../../../helper/GeneralHelper';

const { Content } = Layout;

const Index = (props) => {
    const navigate = useNavigate()

    const [loading, setLoading] = useState(true);
    const [totalRecords, setTotalRecords] = useState(0);
    const [pageSize, setPageSize] = useState(PAGINATION.DEFAULT_PAGE_SIZE);
    const [currentPage, setCurrentPage] = useState(PAGINATION.DEFAULT_PAGE_NO);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getOrderList();
    }, [pageSize, currentPage]);

    const handleShowSizeChange = (_current, size) => {
        setPageSize(size);
    };

    const handlePagination = (page, _size) => {
        setCurrentPage(page);
    };

    const breadcrumb_items = [
        { label: "Dashboard", to: LOCATIONS.DASHBOARD_ROUTE },
        { label: "Orders" },
    ];

    const getOrderList = () => {
        let params = {
            page: currentPage,
            limit: pageSize
        };

        api.post("/cms/order/list", params).then((res) => {
            setLoading(false);
            if (res.status === 200) {
                if (res?.data?.data) {
                    setOrders(res?.data?.data?.docs);
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

    const tableColumns = [
        {
            title: "Order Id",
            dataIndex: "_id",
        },
        {
            title: "User",
            dataIndex: "userId",
            render: (data, record) => {
                return data?.firstName + " " + data?.lastName
            }
        },
        {
            title: "Items",
            dataIndex: "items",
            render: (data, record) => {
                return (
                    <>
                        {data.map((item) => (
                            <p>{item?.productId?.productName} <b> ({CURRENCY} {item?.price}) x {item?.quantity} </b> </p>
                        ))}
                    </>
                )
            }
        },
        {
            title: "Total Amount",
            dataIndex: "totalAmount",
            render: (data, record) => {
                return <b> {CURRENCY} {data} </b>
            }
        },
    ];

    const tableData = orders;

    return (
        <Content className='content'>
            <div className='page-header'>
                <h2 className='page-title'> Order </h2>
                <BreadcrumbComponent breadcrumb_items={breadcrumb_items} />
            </div>
            <div className='content-wrapper'>
                <Card title="Orders list">
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