import React from 'react';
import { Layout } from 'antd';

import Header from '../components/common/Header';
import Sidebar from '../components/common/Sidebar';

const Protectedlayout = (props) => {
    return (
        <Layout className='main-wrapper'>

            <Header />
            <Sidebar />

            <Layout className='page-wrapper position-relative'>
                {props.children}
                {/* <Footer /> */}
            </Layout>

        </Layout>
    );
}

export default Protectedlayout;