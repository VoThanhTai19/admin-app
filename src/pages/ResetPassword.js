import React from 'react';
import { Link } from 'react-router-dom';
import CustomInput from '../components/CustomInput';

const ResetPassword = () => {
    return (
        <div
            className="py-5 d-flex align-items-center justify-content-center"
            style={{ backgroundColor: '#ffd333', minHeight: '100vh' }}
        >
            <div className="my-5 bg-white rounded-3 mx-auto p-4" style={{ width: '480px' }}>
                <h3 className="text-center">ResetPassword</h3>
                <p className="text-center">
                    Please Enter your register email to get reset password mail !
                </p>
                <form action="">
                    <CustomInput
                        type="password"
                        label="New Password"
                        i_id="password"
                        d_class="mb-3"
                    />
                    <CustomInput
                        type="password"
                        label="Confirm Password"
                        i_id="confirm_password"
                        d_class="mb-3"
                    />
                    <Link
                        className="border-0 px-3 py-2 text-white fw-bold w-100 rounded-3 text-center fs-5 text-decoration-none"
                        style={{ backgroundColor: '#ffd333' }}
                        type="submit"
                    >
                        Confirm
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
