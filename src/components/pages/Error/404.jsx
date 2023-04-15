import { Button } from 'antd';
import React from 'react'
import { Link } from 'react-router-dom';
import { LOCATIONS } from '../../../config/routeConfig';
import { FourZeroFourLogo } from '../../../helper/importHelper/svg';

export const FourZeroFour = () => {
    return (
        <div className='w-100-pr text-center'>
            <img src={FourZeroFourLogo} alt="404" className='error-svg' />
            <h2>Oops! The page you requested was not found!</h2>
            <p>The page you are looking for was moved, removed, renamed or might never existed.</p>
            <br />
            <Link to={LOCATIONS.ROOT}>  <Button type='primary' > Home </Button></Link>
        </div>
    )
}

export default FourZeroFour