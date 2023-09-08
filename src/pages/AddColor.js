import React, { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createColor, getColor, resetState, updateColor } from '../features/color/colorSlice';

const AddColor = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const getColorId = location.pathname.split('/')[3];
    const newColor = useSelector((state) => state.color);
    const { isSuccess, isError, isLoading, createdColor, colorName, updatedColor } = newColor;

    let schema = yup.object().shape({
        title: yup.string().required('*Title is required'),
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: colorName || '',
        },
        validationSchema: schema,
        onSubmit: (values) => {
            // alert(JSON.stringify(values, null, 2));
            if (getColorId !== undefined) {
                dispatch(updateColor({ id: getColorId, colorName: values }));
            } else {
                dispatch(createColor(values));
                formik.resetForm();
            }

            setTimeout(() => {
                dispatch(resetState());

                navigate('/admin/color-list');
            }, 3000);
        },
    });

    useEffect(() => {
        if (isSuccess && createdColor) {
            toast.success('Color Added Successfully!!!');
        }
        if (isSuccess && updatedColor) {
            toast.success('Color Updated Successfully!!!');
        }
        if (isError) {
            toast.error('Something Went Wrong!!!');
        }
    }, [isSuccess, isError, isLoading, createdColor, updatedColor]);

    useEffect(() => {
        if (getColorId !== undefined) {
            dispatch(getColor(getColorId));
        } else {
            dispatch(resetState());
        }
    }, [dispatch, getColorId]);
    return (
        <div>
            <h3 className="mb-4 title">{getColorId !== undefined ? 'Edit' : 'Add'} Color</h3>

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
                        {getColorId !== undefined ? 'Edit' : 'Add'} Color
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddColor;
