import React, { useEffect, useState } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createCoupon, getCoupon, resetState, updateCoupon } from '../features/coupon/couponSlice';

const AddCoupon = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const getCouponId = location.pathname.split('/')[3];
    const newCoupon = useSelector((state) => state.coupon);
    const {
        isSuccess,
        isError,
        isLoading,
        createdCoupon,
        couponName,
        couponExpiry,
        couponDiscount,
        updatedCoupon,
    } = newCoupon;

    const changeDateFormet = (date) => {
        const newDate = new Date(date).toLocaleDateString();
        const [month, day, year] = newDate.split('/');
        return [year, month, day].join('-');
    };

    let schema = yup.object().shape({
        name: yup.string().required('*Name is required'),
        discount: yup.number().required('*Discount is required'),
        expiry: yup.date().required('*Expiry is required'),
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: couponName || '',
            discount: couponDiscount || '',
            expiry: changeDateFormet(couponExpiry) || '',
        },
        validationSchema: schema,
        onSubmit: (values) => {
            // alert(JSON.stringify(values, null, 2));
            if (getCouponId !== undefined) {
                dispatch(updateCoupon({ id: getCouponId, couponData: values }));
            } else {
                dispatch(createCoupon(values));
                formik.resetForm();
            }

            setTimeout(() => {
                dispatch(resetState());
                navigate('/admin/coupon-list');
            }, 3000);
        },
    });

    useEffect(() => {
        if (isSuccess && createdCoupon) {
            toast.success('Coupon Added Successfully!!!');
        }
        if (isSuccess && updatedCoupon) {
            toast.success('Coupon Updated Successfully!!!');
        }
        if (isError) {
            toast.error('Something Went Wrong!!!');
        }
    }, [isSuccess, isError, isLoading, createdCoupon, updatedCoupon]);
    useEffect(() => {
        if (getCouponId !== undefined) {
            dispatch(getCoupon(getCouponId));
        } else {
            dispatch(resetState());
        }
    }, [dispatch, getCouponId]);
    return (
        <div>
            <h3 className="mb-4 title">{getCouponId !== undefined ? 'Edit' : 'Add'} Coupon</h3>

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
                        {getCouponId !== undefined ? 'Edit' : 'Add'} Coupon
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddCoupon;
