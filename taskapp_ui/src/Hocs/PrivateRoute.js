import React from 'react';
import { Outlet, Navigate  } from 'react-router-dom';

import AuthService  from '../Services/Auth';

const PrivateRoute = () => {
    return AuthService.isAuthenticated() ? <Outlet /> : <Navigate to='/' />;
}

export default PrivateRoute;