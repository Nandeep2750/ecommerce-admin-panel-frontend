import React, { useEffect, useState } from 'react';
import { Layout, Card, Table, Form, Input, Space, Button, notification } from 'antd';
import { SearchOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import BreadcrumbComponent from '../../common/Breadcrumb';
import { itemRender } from '../../../helper/Paginationfunction';
import { LOCATIONS } from '../../../config/routeConfig';
import { CURRENCY, PAGINATION } from '../../../config/constants';
import { useNavigate } from 'react-router-dom';
import api from "../../../helper/Api";


const { Content } = Layout;

const Index = (props) => {
    const navigate = useNavigate()

    const [loading, setLoading] = useState(true);
    const [totalRecords, setTotalRecords] = useState(0);
    const [pageSize, setPageSize] = useState(PAGINATION.DEFAULT_PAGE_SIZE);
    const [currentPage, setCurrentPage] = useState(PAGINATION.DEFAULT_PAGE_NO);
    const [products, setProducts] = useState([]);
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
        { label: "Products" },
    ];

    const getStaticPageList = () => {
        let params = {
            page: currentPage,
            limit: pageSize,
            search: search,
        };

        api.post("/cms/product/list", params).then((res) => {
            setLoading(false);
            if (res.status === 200) {
                if (res?.data?.data) {
                    setProducts(res?.data?.data?.docs);
                    setTotalRecords(res?.data?.data?.totalDocs);
                }
            } else {
                notification.error({
                    message: res.data.message,
                });
            }
        })
            .catch((err) => {
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
            title: "Name",
            dataIndex: "productName",
        },
        {
            title: "Category",
            dataIndex: "categoryId",
            render: (_text, record) => {
                console.log("🚀 ~ file: Index.jsx:89 ~ Index ~ record:", record)
                return record.categoryId.categoryName
            }
        },
        {
            title: "Image",
            dataIndex: "productImageUrl",
            render: (text, record) => {
                return (<img src={text} alt={record.productName} height={100} />)
            }
        },
        {
            title: "Price",
            dataIndex: "productPrice",
            render: (text, record) => {
                return CURRENCY + " " + text 
            }
        },
        // {
        //     title: "Actions",
        //     dataIndex: "actions",
        //     render: (_text, record) => {
        //         let editUrl = LOCATIONS.STATIC_PAGE_ROUTE.EDIT.replace(':staticPageId', record._id);
        //         let viewUrl = LOCATIONS.STATIC_PAGE_ROUTE.VIEW.replace(':staticPageId', record._id);
        //         return (
        //             <Space size={10}>
        //                 <Button type="link" shape="circle" icon={<EyeOutlined />} loading={false} onClick={() => navigate(viewUrl)} />
        //                 <Button type="link" shape="circle" icon={<EditOutlined />} loading={false} onClick={() => navigate(editUrl)} />
        //             </Space>
        //         )

        //     }
        // }
    ];

    const tableData = products;

    return (
        <Content className='content'>
            <div className='page-header'>
                <h2 className='page-title'> Product </h2>
                <BreadcrumbComponent breadcrumb_items={breadcrumb_items} />
            </div>
            <div className='content-wrapper'>
                <Card
                    title="Products list"
                    // extra={
                    //     <Button type="primary" htmlType="button" >
                    //         <Link to={LOCATIONS.STATIC_PAGE_ROUTE.ADD}>
                    //             Add Product
                    //         </Link>
                    //     </Button>
                    // }
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