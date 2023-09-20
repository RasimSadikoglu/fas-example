import { Link, useNavigate } from 'react-router-dom';
import { routes } from './routes';
import useAuth from './hooks/useAuth';

const Navbar = () => {
    const authController = useAuth();
    const navigate = useNavigate();
    const hideNavbar = !authController.token;

    const handleClick = () => {
        authController.logout();
        navigate(routes.LOGIN);
    };

    return (
        <nav className='navbar navbar-expand navbar-dark bg-dark'>
            <Link to='' className='ms-3 navbar-brand'>
                FAS
            </Link>
            <div className='container-fluid gap-3' hidden={hideNavbar}>
                <button
                    onClick={() => navigate(routes.FON_BUY_SELL)}
                    className='btn btn-light nav-item'
                    disabled={!authController.isUserHasAuthority('FON_EDIT')}
                >
                    Fund Buy/Sell
                </button>
                <button
                    onClick={() => navigate(routes.FON_MONITOR)}
                    className='btn btn-light nav-item'
                    disabled={!authController.isUserHasAuthority('FON_LIST')}
                >
                    Fund Monitor
                </button>
                <button
                    onClick={() => navigate(routes.TEMINAT_REPORT)}
                    className='btn btn-light nav-item'
                    disabled={!authController.isUserHasAuthority('FON_LIST')}
                >
                    Guarantee Report
                </button>
                <button
                    className='nav-item btn ms-auto btn btn-light nav-item'
                    onClick={handleClick}
                >
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
