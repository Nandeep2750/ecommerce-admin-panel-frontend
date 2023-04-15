import React from 'react';
import { Layout } from 'antd';
const { Footer : AntdFooter } = Layout;

const Footer = () => {
    
    // Return today's date and time
    const currentDateTime = new Date()
    // returns the year (four digits)
    const year = currentDateTime.getFullYear()

    return (
        <AntdFooter className='footer'> QuickMart ©{year} </AntdFooter>
    );
}

export default Footer;