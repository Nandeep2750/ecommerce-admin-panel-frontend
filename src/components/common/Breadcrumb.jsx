import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { BREADCRUMB_SEPARATOR } from '../../config/constants';

const BreadcrumbComponent = (props) => {

    let { breadcrumb_items } = props

    return (
        <Breadcrumb separator={BREADCRUMB_SEPARATOR}>
            {breadcrumb_items?.map((item, idx) => (
                <Breadcrumb.Item key={idx}>
                    {item.to ?
                        <Link to={item.to}> {item.label} </Link>
                        :
                        item.label
                    }
                </Breadcrumb.Item>
            ))}
        </Breadcrumb>
    );
}

export default BreadcrumbComponent;
