import React, { useEffect, useState } from 'react';
import { Layout, Card, Row, Col, Typography, notification } from 'antd';
import BreadcrumbComponent from '../../common/Breadcrumb';
import { LOCATIONS } from '../../../config/routeConfig';
import { useNavigate, useParams } from 'react-router-dom';
import api from "../../../helper/Api";
import { getPlaceholderImage } from '../../../helper/GeneralHelper';
import { CURRENCY } from '../../../config/constants';

const { Content } = Layout;
const { Title } = Typography

const ViewProduct = () => {
    const navigate = useNavigate()
    const params = useParams();

    const [loading, setLoading] = useState(true);
    const [productData, setProductData] = useState(null);

    const breadcrumb_items = [
        { label: "Dashboard", to: LOCATIONS.DASHBOARD_ROUTE },
        { label: "Products", to: LOCATIONS.PRODUCT_ROUTE.ROOT.replace(':productId', params.productId) },
        { label: "View" }
    ];

    useEffect(() => {
        if (params.productId) {
            api.get(`/cms/product/details-by-id?productId=${params.productId}`).then((res) => {
                if (res.status === 200) {
                    setProductData(res.data.data);
                    setLoading(false);
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
        } else {
            navigate(LOCATIONS.PRODUCT_ROUTE.ROOT);
        }
    }, [navigate, params.productId])

    return (
        <Content className='content'>
            <div className='page-header'>
                <h2 className='page-title'>Products</h2>
                <BreadcrumbComponent breadcrumb_items={breadcrumb_items} />
            </div>
            <div className='content-wrapper'>
                <Card title="Products View" loading={loading} >
                    <Row >
                        <Col span={8}>
                            <img src={productData?.productImageUrl} alt={productData?.productName} width="100%" onError={(e) => e.target.src = getPlaceholderImage(300,550,productData?.productName)} />
                        </Col>
                        <Col offset={1} span={15} >
                            <Title level={1} className='mb-0'>{productData?.productName}</Title>
                            <Title level={3} className='mt-0 text-black-50'>{`${CURRENCY} ${productData?.productPrice}`}</Title>
                            {productData?.productDescription &&
                                <div dangerouslySetInnerHTML={{ __html: productData?.productDescription }} />
                            }
                        </Col>
                    </Row>
                </Card>
            </div>
        </Content>
    )
}

export default ViewProduct