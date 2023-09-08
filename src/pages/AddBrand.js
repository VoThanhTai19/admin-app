import React, { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createBrand, getBrand, resetState, updateBrand } from '../features/brand/brandSlice';

const AddBrand = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const getBrandId = location.pathname.split('/')[3];
    const newBrand = useSelector((state) => state.brand);
    const { isSuccess, isError, isLoading, createdBrand, brandName, updatedBrand } = newBrand;
    let schema = yup.object().shape({
        title: yup.string().required('*Title is required'),
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: brandName || '',
        },
        validationSchema: schema,
        onSubmit: (values) => {
            if (getBrandId !== undefined) {
                // alert(JSON.stringify(values, null, 2));
                dispatch(
                    updateBrand({
                        brandId: getBrandId,
                        brandName: values,
                    }),
                );
            } else {
                dispatch(createBrand(values));
                formik.resetForm();
            }

            setTimeout(() => {
                dispatch(resetState());

                navigate('/admin/brand-list');
            }, 3000);
        },
    });

    useEffect(() => {
        if (isSuccess && createdBrand) {
            toast.success('Brand Added Successfully!!!');
        }
        if (isSuccess && updatedBrand) {
            toast.success('Brand Updated Successfully!!!');
        }
        if (isError) {
            toast.error('Something Went Wrong!!!');
        }
    }, [isSuccess, isError, isLoading, createdBrand, updatedBrand]);

    useEffect(() => {
        if (getBrandId !== undefined) {
            dispatch(getBrand(getBrandId));
        } else {
            dispatch(resetState());
        }
    }, [dispatch, getBrandId]);

    return (
        <div>
            <h3 className="mb-4 title">{getBrandId !== undefined ? 'Edit' : 'Add'} Brand</h3>

            <div>
                <form action="" onSubmit={formik.handleSubmit}>
                    <CustomInput
                        type="text"
                        label="Enter Brand"
                        i_id="add_brand"
                        d_class="mb-3 mt-4"
                        name="title"
                        onChange={formik.handleChange('title')}
                        onBlur={formik.handleBlur('title')}
                        value={formik.values.title}
                    />
                    <div className="error">{formik.touched.title && formik.errors.title}</div>

                    <button type="submit" className="btn btn-success border-0 rounded-3 px-4 py-2">
                        {getBrandId !== undefined ? 'Edit' : 'Add'} Brand
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddBrand;
