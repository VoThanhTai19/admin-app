import React from 'react';
import CustomInput from '../components/CustomInput';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    return (
        <div
            className="py-5 d-flex align-items-center justify-content-center"
            style={{ backgroundColor: '#ffd333', minHeight: '100vh' }}
        >
            <div className="my-5 bg-white rounded-3 mx-auto p-4" style={{ width: '480px' }}>
                <h3 className="text-center">Forgot Password</h3>
                <p className="text-center">Please Enter your new password !</p>
                <form action="">
                    <CustomInput type="email" label="Email" i_id="email" d_class="mb-3" />
                    <Link
                        className="border-0 px-3 py-2 text-white fw-bold w-100 rounded-3 text-center fs-5 text-decoration-none"
                        style={{ backgroundColor: '#ffd333' }}
                        type="submit"
                    >
                        Send to
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
