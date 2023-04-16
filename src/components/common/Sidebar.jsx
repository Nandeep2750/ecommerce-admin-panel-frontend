import React, { useState, useEffect } from 'react';

import {
    HomeOutlined, UserOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LOCATIONS } from '../../config/routeConfig';
import { connect } from 'react-redux';
const { Sider } = Layout;

const side_menu_items_for_all = [
    {
        key: LOCATIONS.DASHBOARD_ROUTE,
        icon: <HomeOutlined />,
        label: `Dashboard`
    },
    {
        key: LOCATIONS.USER_ROUTE.ROOT,
        icon: <UserOutlined />,
        label: `Users`
    },
]

const Sidebar = (props) => {
    const [selectedKey, setSelectedKey] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let currentModule = side_menu_items_for_all.find((menu_item) => location.pathname.includes(menu_item.key))

        if (currentModule) {
            let currentPath = [currentModule.key];
            setSelectedKey(currentPath)
        }
    }, [location.pathname])

    const onClick = (e) => {
        setSelectedKey([e.key])
        navigate(e.key)
    }
    return (
        <Sider
            className='sidebar'
            breakpoint='lg'
            collapsedWidth='0'
            onBreakpoint={(broken) => { console.log(broken); }}
            onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
        >
            <div className='logo d-flex align-items-center justify-content-center px-5'>
                <Link to={LOCATIONS.DASHBOARD_ROUTE}>
                    <h1 className="text-white fs-22">QuickMart</h1>
                </Link>
            </div>

            <Menu
                theme='dark'
                mode='inline'
                onClick={onClick}
                defaultSelectedKeys={['Dashboard']}
                selectedKeys={selectedKey}
                items={side_menu_items_for_all}
            />

        </Sider>
    );
}


const mapStateToProps = (state) => ({
    loggedIn: state.authentication.loggedIn,
    userData: state.authentication.userData
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
