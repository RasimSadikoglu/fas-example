import { Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Login from './pages/Login';
import { routes } from './routes';
import Home from './pages/Home';
import FonBuySell from './pages/FonBuySell';
import FonMonitor from './pages/FonMonitor';
import { createToast } from './components/dynamic-toast';
import { UserAuthContext } from './tools/auth-context-provider';
import { useEffect, useState } from 'react';
import useAuth from './hooks/useAuth';
import NotFound from './pages/NotFound';
import Unauthorized from './pages/Unauthorized';
import Forbidden from './pages/Forbidden';
import ProtectedRoute from './components/protected-route';
import TeminatReport from './pages/GuaranteeReport';

const App = () => {
    const authController = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loading &&
            (async () => {
                await authController.initialize();
                setLoading(false);
            })();
    }, [loading, authController]);

    return (
        <>
            <Navbar />
            {!loading && (
                <UserAuthContext.Provider value={authController}>
                    <Routes>
                        <Route path={routes.LOGIN} element={<Login />}></Route>
                        <Route
                            index
                            element={
                                <ProtectedRoute fallbackRoute={routes.LOGIN}>
                                    <Home></Home>
                                </ProtectedRoute>
                            }
                        ></Route>
                        <Route
                            path={routes.FON_BUY_SELL}
                            element={
                                <ProtectedRoute authority='FON_EDIT'>
                                    <FonBuySell />
                                </ProtectedRoute>
                            }
                        ></Route>
                        <Route
                            path={routes.FON_MONITOR}
                            element={
                                <ProtectedRoute>
                                    <FonMonitor />
                                </ProtectedRoute>
                            }
                        ></Route>
                        <Route
                            path={routes.UNAUTHORIZED}
                            element={<Unauthorized />}
                        ></Route>
                        <Route
                            path={routes.FORBIDDEN}
                            element={<Forbidden />}
                        ></Route>
                        <Route
                            path={routes.TEMINAT_REPORT}
                            element={<TeminatReport></TeminatReport>}
                        ></Route>
                        <Route path='*' element={<NotFound />}></Route>
                    </Routes>
                </UserAuthContext.Provider>
            )}
            {createToast()}
        </>
    );
};

export default App;
