import React, { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createBlogCategory, resetState } from '../features/blogCat/blogCatSlice';

const AddBlogCat = () => {
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
            dispatch(createBlogCategory(values));
            formik.resetForm();

            setTimeout(() => {
                dispatch(resetState());
                navigate('/admin/blog-category-list');
            }, 3000);
        },
    });

    const newBlogCat = useSelector((state) => state.blogCat);
    const { isSuccess, isError, isLoading, createdBlogCategory } = newBlogCat;
    useEffect(() => {
        if (isSuccess && createdBlogCategory) {
            toast.success('Blog Category Added Successfully!!!');
        }
        if (isError) {
            toast.error('Somthing Went Wrong!!!');
        }
    }, [isSuccess, isError, isLoading, createdBlogCategory]);
    return (
        <div>
            <h3 className="mb-4 title">Add Blog Category</h3>

            <div>
                <form action="" onSubmit={formik.handleSubmit}>
                    <CustomInput
                        type="text"
                        label="Enter BLog Category"
                        i_id="blog_category"
                        d_class="mb-3 mt-4"
                        name="title"
                        onChange={formik.handleChange('title')}
                        onBlur={formik.handleBlur('title')}
                        value={formik.values.title}
                    />
                    <div className="error">{formik.touched.title && formik.errors.title}</div>

                    <button type="submit" className="btn btn-success border-0 rounded-3 px-4 py-2">
                        Add Blog Category
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddBlogCat;
