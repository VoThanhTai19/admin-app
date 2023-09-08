import React, { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
    createBlogCategory,
    getBlogCategory,
    resetState,
    updateBlogCategory,
} from '../features/blogCat/blogCatSlice';

const AddBlogCat = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const getBlogCatId = location.pathname.split('/')[3];
    const newBlogCat = useSelector((state) => state.blogCat);
    const {
        isSuccess,
        isError,
        isLoading,
        createdBlogCategory,
        blogCategoryName,
        updatedBlogCategory,
    } = newBlogCat;

    let schema = yup.object().shape({
        title: yup.string().required('*Title is required'),
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: blogCategoryName || '',
        },
        validationSchema: schema,
        onSubmit: (values) => {
            // alert(JSON.stringify(values, null, 2));
            if (getBlogCatId !== undefined) {
                dispatch(updateBlogCategory({ id: getBlogCatId, blogCatData: values }));
            } else {
                dispatch(createBlogCategory(values));
                formik.resetForm();
            }

            setTimeout(() => {
                dispatch(resetState());
                navigate('/admin/blog-category-list');
            }, 3000);
        },
    });

    useEffect(() => {
        if (isSuccess && createdBlogCategory) {
            toast.success('Blog Category Added Successfully!!!');
        }
        if (isSuccess && updatedBlogCategory) {
            toast.success('Blog Category Updated Successfully!!!');
        }
        if (isError) {
            toast.error('Something Went Wrong!!!');
        }
    }, [isSuccess, isError, isLoading, createdBlogCategory, updatedBlogCategory]);
    useEffect(() => {
        if (getBlogCatId !== undefined) {
            dispatch(getBlogCategory(getBlogCatId));
        } else {
            dispatch(resetState());
        }
    }, [dispatch, getBlogCatId]);
    return (
        <div>
            <h3 className="mb-4 title">
                {getBlogCatId !== undefined ? 'Edit' : 'Add'} Blog Category
            </h3>

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
                        {getBlogCatId !== undefined ? 'Edit' : 'Add'} Blog Category
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddBlogCat;
