import { ReactNode, useEffect } from 'react';
import { Authority } from '../common/permission';
import useAuth from '../hooks/useAuth';
import Unauthorized from '../pages/Unauthorized';
import Forbidden from '../pages/Forbidden';
import { useNavigate } from 'react-router-dom';

type Props = {
    authority?: Authority;
    fallbackRoute?: string;
    children: ReactNode;
};

const ProtectedRoute = ({ authority, fallbackRoute, children }: Props) => {
    const authController = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!authController.token && fallbackRoute) {
            navigate(fallbackRoute);
        }
    }, [authController, fallbackRoute, navigate]);

    if (!authController.token) {
        return <Unauthorized></Unauthorized>;
    }

    if (authority && !authController.isUserHasAuthority(authority)) {
        return <Forbidden></Forbidden>;
    }

    return children;
};

export default ProtectedRoute;
