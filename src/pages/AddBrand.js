import React, { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createBrand, resetState } from '../features/brand/brandSlice';

const AddBrand = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    let schema = yup.object().shape({
        title: yup.string().required('*Title is required'),
    });

    const formik = useFormik({
        initialValues: {
            title: '',
        },
        validationSchema: schema,
        onSubmit: (values) => {
            // alert(JSON.stringify(values, null, 2));
            dispatch(createBrand(values));
            formik.resetForm();

            setTimeout(() => {
                dispatch(resetState());

                navigate('/admin/brand-list');
            }, 3000);
        },
    });

    const newBrand = useSelector((state) => state.brand);
    const { isSuccess, isError, isLoading, createdBrand } = newBrand;
    useEffect(() => {
        if (isSuccess && createdBrand) {
            toast.success('Brand Added Successfully!!!');
        }
        if (isError) {
            toast.error('Somthing Went Wrong!!!');
        }
    }, [isSuccess, isError, isLoading, createdBrand]);

    return (
        <div>
            <h3 className="mb-4 title">Add Brand</h3>

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
                        Add Brand
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddBrand;
