import React, { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createColor, resetState } from '../features/color/colorSlice';

const AddColor = () => {
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
            dispatch(createColor(values));
            formik.resetForm();

            setTimeout(() => {
                dispatch(resetState());

                navigate('/admin/color-list');
            }, 3000);
        },
    });

    const newColor = useSelector((state) => state.color);
    const { isSuccess, isError, isLoading, createdColor } = newColor;
    useEffect(() => {
        if (isSuccess && createdColor) {
            toast.success('Color Added Successfully!!!');
        }
        if (isError) {
            toast.error('Somthing Went Wrong!!!');
        }
    }, [isSuccess, isError, isLoading, createdColor]);
    return (
        <div>
            <h3 className="mb-4 title">Add Color</h3>

            <div>
                <form action="" onSubmit={formik.handleSubmit}>
                    <CustomInput
                        type="color"
                        label="Enter Color"
                        i_id="add_color"
                        d_class="mb-3 mt-4"
                        name="title"
                        onChange={formik.handleChange('title')}
                        onBlur={formik.handleBlur('title')}
                        value={formik.values.title}
                    />
                    <div className="error">{formik.touched.title && formik.errors.title}</div>

                    <button type="submit" className="btn btn-success border-0 rounded-3 px-4 py-2">
                        Add Color
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddColor;
