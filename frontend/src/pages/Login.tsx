import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from '../routes';
import { Form } from 'react-bootstrap';
import { toastDanger } from '../components/dynamic-toast';
import { LoginRequest } from '../auto-api';
import useAuth from '../hooks/useAuth';

const Login = () => {
    const authController = useAuth();
    const navigate = useNavigate();

    const [loginForm, setLoginForm] = useState<LoginRequest>({
        userCode: '',
        password: '',
    });
    const [validated, setValidated] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLoginForm(state => {
            return { ...state, [event.target.name]: event.target.value };
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!event.currentTarget.checkValidity()) {
            setValidated(true);
            return;
        }

        try {
            await authController.login(loginForm);
        } catch (error) {
            toastDanger('Invalid usercode or password!');
            return;
        }

        navigate(routes.HOME);
    };

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <div className='container pt-5 w-25'>
                <div className='form-outline mb-4'>
                    <label className='form-label'>User Code</label>
                    <input
                        name='userCode'
                        type='text'
                        className='form-control'
                        value={loginForm.userCode}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className='form-outline mb-4'>
                    <label className='form-label'>Password</label>
                    <input
                        name='password'
                        type='password'
                        className='form-control'
                        value={loginForm.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className='d-flex pt-3'>
                    <button type='submit' className='btn btn-primary ms-auto'>
                        Sign in
                    </button>
                </div>
            </div>
        </Form>
    );
};

export default Login;
