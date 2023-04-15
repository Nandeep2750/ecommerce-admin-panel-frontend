import React, { lazy } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { FourZeroFour } from "../components/pages/Error/404";
import { LOCATIONS } from "../config/routeConfig";

/* Layouts */
import GuestLayout from "../layout/GuestLayout";
import ProtectedLayout from "../layout/ProtectedLayout";

/* Pages */
const Login = lazy(() => import("../components/pages/Auth/Login"));

const Dashboard = lazy(() => import("../components/pages/Dashboard/Index"));
const Profile = lazy(() => import("../components/pages/Profile/Index"));
const ChangePassword = lazy(() => import("../components/pages/ChangePassword/Index"));

const routes = (loggedIn) => {

  return [
    {
      path: LOCATIONS.ROOT,
      element: !loggedIn ? <GuestLayout><Outlet /></GuestLayout> : <Navigate to={LOCATIONS.DASHBOARD_ROUTE} />,
      children: [
        { path: LOCATIONS.LOGIN_ROUTE, element: <Login /> },
        { path: LOCATIONS.ROOT, element: <Navigate to={LOCATIONS.LOGIN_ROUTE} /> },
      ],
    },
    {
      path: LOCATIONS.ROOT,
      element: loggedIn ? <ProtectedLayout><Outlet /></ProtectedLayout> : <Navigate to={LOCATIONS.LOGIN_ROUTE} />,
      children: [
        { path: LOCATIONS.DASHBOARD_ROUTE, element: <Dashboard /> },
        { path: LOCATIONS.CHANGE_PASSWORD_ROUTE, element: <ChangePassword /> },
        { path: LOCATIONS.PROFILE_ROUTE, element: <Profile /> },
      ],
    },
    {
      path: LOCATIONS.ERROR_ROUTE[404],
      element: <FourZeroFour />
    },
  ];
};

export default routes;