import React from 'react';
import {  Layout } from 'antd';

import BreadcrumbComponent from '../../common/Breadcrumb';

const { Content } = Layout;

const Index = () => {

    const breadcrumb_items = [
        { label: "Dashboard" }
    ];

    return (
        <Content className='content'>
            <div className='page-header'>
                <h2 className='page-title'> Dashboard </h2>
                <BreadcrumbComponent breadcrumb_items={breadcrumb_items} />
            </div>
        </Content>
    );
}

export default Index;
