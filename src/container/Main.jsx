import React, { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'

import { connect } from 'react-redux';
import LoaderComponent from '../components/common/LoaderComponent';
import routes from './routes';

export const Main = (props) => {

    const routing = useRoutes(routes(props.loggedIn));

    return (
        <Suspense fallback={<LoaderComponent />}>
            {routing}
        </Suspense>
    )
}

const mapStateToProps = (state) => ({
    loggedIn: state.authentication.loggedIn,
    userData: state.authentication.userData
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)