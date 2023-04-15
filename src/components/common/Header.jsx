import React from 'react';
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Layout } from 'antd';
import {
    UserOutlined,
    KeyOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import { userActions } from '../../redux/actions/user.actions';
import { LOCATIONS } from '../../config/routeConfig';

const { Header: AntdHeader } = Layout;  

const Header = (props) => {

    const { userData } = props
    const navigate = useNavigate();

    const logout = () => {
        props.logout();
    }
    const menubar_items = [
        {
            icon: <UserOutlined />,
            label: userData.firstName + " " + userData.lastName,
            key: "user_menu",
            children: [
                {
                    key: LOCATIONS.PROFILE,
                    icon: <UserOutlined />,
                    label: "Profile",
                    onClick: () => navigate(LOCATIONS.PROFILE_ROUTE)
                },
                {
                    key: LOCATIONS.CHANGE_PASSWORD_ROUTE,
                    icon: <KeyOutlined />,
                    label: "Change Password",
                    onClick: () => navigate(LOCATIONS.CHANGE_PASSWORD_ROUTE)
                },
                {
                    icon: <LogoutOutlined />,
                    key: "logout",
                    onClick: logout,
                    label: "Logout"
                }
            ]
        }
    ];

    return (
        <AntdHeader className='header fixed-header'>
            <div className='logo'>
                <Link to={LOCATIONS.DASHBOARD_ROUTE}>
                    <h1 className="text-white">QuickMart</h1>
                </Link>
            </div>
            <Menu theme='dark' mode='horizontal' items={menubar_items} className='flex-row-reverse' defaultSelectedKeys={[]}>
            </Menu>
        </AntdHeader >
    );
}

const mapStateToProps = (state) => ({
    userData: state.authentication.userData
})

const mapDispatchToProps = {
    logout: userActions.logout
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)