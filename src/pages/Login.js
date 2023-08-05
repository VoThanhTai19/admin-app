import React from 'react';
import { Link } from 'react-router-dom';
import CustomInput from '../components/CustomInput';

const Login = () => {
    return (
        <div
            className="py-5 d-flex align-items-center justify-content-center"
            style={{ backgroundColor: '#ffd333', minHeight: '100vh' }}
        >
            <div className="my-5 bg-white rounded-3 mx-auto p-4" style={{ width: '480px' }}>
                <h3 className="text-center">Login</h3>
                <p className="text-center">Login to your account to countinue</p>
                <form action="">
                    <CustomInput type="text" label="Email Address" i_id="email" d_class="mb-3" />
                    <CustomInput type="password" label="Password" i_id="password" d_class="mb-3" />
                    <div className="mb-3 text-end">
                        <Link to="/forgot-password">Forgot Pasword</Link>
                    </div>
                    <Link
                        className="border-0 px-3 py-2 text-white fw-bold w-100 mt-3 rounded-3 text-center fs-5 text-decoration-none"
                        style={{ backgroundColor: '#ffd333' }}
                        type="submit"
                        to="/admin"
                    >
                        Login
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default Login;
