import { Spin } from 'antd';
import React from 'react';

const LoaderComponent = () => {
    return (
        <div className='loader-section'>
            <Spin size="large"/>
        </div>
    );
}

export default LoaderComponent;