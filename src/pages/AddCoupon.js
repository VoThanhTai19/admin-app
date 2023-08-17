import React, { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createCoupon, resetState } from '../features/coupon/couponSlice';

const AddCoupon = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    let schema = yup.object().shape({
        name: yup.string().required('*Name is required'),
        discount: yup.number().required('*Discount is required'),
        expiry: yup.date().required('*Expiry is required'),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            discount: '',
            expiry: '',
        },
        validationSchema: schema,
        onSubmit: (values) => {
            // alert(JSON.stringify(values, null, 2));
            dispatch(createCoupon(values));
            formik.resetForm();

            setTimeout(() => {
                dispatch(resetState());
                navigate('/admin/coupon-list');
            }, 3000);
        },
    });

    const newCoupon = useSelector((state) => state.coupon);
    const { isSuccess, isError, isLoading, createdCoupon } = newCoupon;
    useEffect(() => {
        if (isSuccess && createdCoupon) {
            toast.success('Coupon Added Successfully!!!');
        }
        if (isError) {
            toast.error('Somthing Went Wrong!!!');
        }
    }, [isSuccess, isError, isLoading, createdCoupon]);
    return (
        <div>
            <h3 className="mb-4 title">Add Coupon</h3>

            <div>
                <form action="" onSubmit={formik.handleSubmit}>
                    <CustomInput
                        type="text"
                        label="Enter Name"
                        i_id="add_coupon"
                        d_class="mb-3 mt-4"
                        name="name"
                        onChange={formik.handleChange('name')}
                        onBlur={formik.handleBlur('name')}
                        value={formik.values.name}
                    />
                    <div className="error">{formik.touched.name && formik.errors.name}</div>

                    <CustomInput
                        type="number"
                        label="Enter Discount"
                        i_id="add_discount"
                        d_class="mb-3 mt-4"
                        name="discount"
                        onChange={formik.handleChange('discount')}
                        onBlur={formik.handleBlur('discount')}
                        value={formik.values.discount}
                    />
                    <div className="error">{formik.touched.discount && formik.errors.discount}</div>

                    <CustomInput
                        type="date"
                        label="Enter Expiry"
                        i_id="add_expiry"
                        d_class="mb-3 mt-4"
                        name="expiry"
                        onChange={formik.handleChange('expiry')}
                        onBlur={formik.handleBlur('expiry')}
                        value={formik.values.expiry}
                    />
                    <div className="error">{formik.touched.expiry && formik.errors.expiry}</div>

                    <button type="submit" className="btn btn-success border-0 rounded-3 px-4 py-2">
                        Add Coupon
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddCoupon;
