import React from 'react';
const Dashboard = React.lazy(() => import('../pages/dashboard/Dashboard'));
const Profile = React.lazy(() => import('../pages/profile/Profile'));
const ProfilePage = React.lazy(() => import('../pages/profile/ProfilePage'));
const Register = React.lazy(() => import('../pages/auth/Register'));
const Login = React.lazy(() => import('../pages/auth/Login'));
const Theme = React.lazy(() => import('../pages/theme/Theme'));
const Error = React.lazy(() => import('../pages/error/Error'));

export { 
    Dashboard,
    Profile,
    ProfilePage,
    Register,
    Login,
    Theme,
    Error,
};