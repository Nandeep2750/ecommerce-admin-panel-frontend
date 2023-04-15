import React, { useEffect, useState } from 'react';
import { Card, Col, Layout, notification, Row } from 'antd';
import {
    UserOutlined,
    AppstoreAddOutlined,
} from '@ant-design/icons';

import {
    getLightRGBWithRandomAlpha
} from '../../../helper/RandomColorHelper';
import BreadcrumbComponent from '../../common/Breadcrumb';
import api from "../../../helper/Api";
import { MODULE_SLUG } from '../../../config/constants';
import { LOCATIONS } from '../../../config/routeConfig';
import { useNavigate } from 'react-router';

const { Meta } = Card;
const { Content } = Layout;

const Index = () => {

    const navigate = useNavigate()

    const [dashboardData, setDashboardData] = useState([{}, {}]);

    const DATA = {
        [MODULE_SLUG.USER]: {
            name: "Users",
            icon: UserOutlined,
            countKey: 'users',
            link: LOCATIONS.USER_ROUTE.ROOT
        }, [MODULE_SLUG.PRODUCT]: {
            name: "Products",
            icon: AppstoreAddOutlined,
            countKey: 'products',
            link: LOCATIONS.PRODUCT_ROUTE.ROOT
        }
    }

    useEffect(() => {
        api.get(`/cms/dashboard/details`).then((res) => {
            if (res.status === 200) {
                let resData = res.data.data

                let dashboardData = []

                for (const key in DATA) {
                    dashboardData.push({
                        name: DATA[key].name,
                        icon: DATA[key].icon,
                        count: resData[DATA[key].countKey] ? resData[DATA[key].countKey] : "0",
                        link: DATA[key].link
                    })
                }
                setDashboardData(dashboardData)
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
            }
        });
    }, [])

    const breadcrumb_items = [
        { label: "Dashboard" }
    ];

    return (
        <Content className='content'>
            <div className='page-header'>
                <h2 className='page-title'> Dashboard </h2>
                <BreadcrumbComponent breadcrumb_items={breadcrumb_items} />
            </div>
            <div className='content-wrapper'>
                <Row gutter={[{ xs: 8, sm: 16, md: 24 }, { xs: 8, sm: 16, md: 24 }]} >
                    {dashboardData.map((val, key) => {
                        if (Object.entries(val).length > 0) {
                            return (
                                <Col xs={24} sm={12} md={8} lg={6} key={key}>
                                    <Card
                                        hoverable
                                        className='shadow-sm border-radius-10'
                                        onClick={() => navigate(val?.link)}
                                    >
                                        <Meta
                                            avatar={<val.icon className='fs-32 mt-5 p-10 rounded-circle' style={{ backgroundColor: getLightRGBWithRandomAlpha() }} />}
                                            title={val?.name}
                                            description={val?.count}
                                        />
                                    </Card>
                                </Col>
                            )
                        } else {
                            return (
                                <Col xs={24} sm={12} md={8} lg={6} key={key}>
                                    <Card
                                        hoverable
                                        loading
                                        className='shadow-sm border-radius-10'
                                    />
                                </Col>
                            )
                        }
                    })}
                </Row>
            </div>
        </Content>
    );
}

export default Index;
