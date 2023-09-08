import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CustomInput from '../components/CustomInput';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/auth/authSlice';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let schema = Yup.object().shape({
        email: Yup.string().email('*Email should be valid').required('*Email is required'),
        password: Yup.string().required('*Password is required'),
    });
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: schema,
        onSubmit: (values) => {
            dispatch(login(values));
            // alert(JSON.stringify(values, null, 2));
        },
    });

    const authState = useSelector((state) => state);

    const { user, isLoading, isError, isSuccess } = authState.auth;
    useEffect(() => {
        if (isSuccess) {
            navigate('admin');
        } else {
            navigate('');
        }
    }, [user, isLoading, isError, isSuccess, navigate]);

    return (
        <div
            className="py-5 d-flex align-items-center justify-content-center"
            style={{ backgroundColor: '#ffd333', minHeight: '100vh' }}
        >
            <div className="my-5 bg-white rounded-3 mx-auto p-4" style={{ width: '480px' }}>
                <h3 className="text-center">Login</h3>
                <p className="text-center">Login to your account to countinue</p>

                <form action="" onSubmit={formik.handleSubmit}>
                    <CustomInput
                        type="text"
                        label="Email Address"
                        name="email"
                        i_id="email"
                        d_class="mb-2"
                        onChange={formik.handleChange('email')}
                        value={formik.values.email}
                    />
                    <div className="error">
                        {formik.touched.email && formik.errors.email ? (
                            <div>{formik.errors.email}</div>
                        ) : null}
                    </div>
                    <CustomInput
                        type="password"
                        label="Password"
                        name="password"
                        i_id="password"
                        d_class="mb-2 mt-3"
                        onChange={formik.handleChange('password')}
                        value={formik.values.password}
                    />
                    <div className="error">
                        {formik.touched.password && formik.errors.password ? (
                            <div>{formik.errors.password}</div>
                        ) : null}
                    </div>
                    <div className="mb-3 mt-3 text-end">
                        <Link to="/forgot-password">Forgot Pasword</Link>
                    </div>
                    <button
                        className="border-0 px-3 py-2 text-white fw-bold w-100 mt-3 rounded-3 text-center fs-5 text-decoration-none"
                        style={{ backgroundColor: '#ffd333' }}
                        type="submit"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
