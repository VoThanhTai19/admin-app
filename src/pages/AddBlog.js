import React, { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import CustomInput from '../components/CustomInput';
import { useNavigate, useLocation } from 'react-router-dom';
import { deleteImg, uploadImg } from '../features/upload/uploadSlice';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import Dropzone from 'react-dropzone';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { createBlog, getBlog, resetState, updateBlog } from '../features/blogs/blogSlice';
import { getBlogCategories } from '../features/blogCat/blogCatSlice';

const AddBlog = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const getBlogId = location.pathname.split('/')[3];
    const blogCatState = useSelector((state) => state.blogCat.blogCategories);
    const imgState = useSelector((state) => state.upload.images);
    const newBlog = useSelector((state) => state.blog);

    const {
        isSuccess,
        isError,
        isLoading,
        createdBlog,
        updatedBlog,
        blogName,
        blogDesc,
        blogCategory,
        blogImages,
    } = newBlog;
    let schema = yup.object().shape({
        title: yup.string().required('*Title is required'),
        description: yup.string().required('*Description is required'),
        category: yup.string().required('*Category is required'),
    });
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: blogName || '',
            description: blogDesc || '',
            category: blogCategory || '',
            images: blogImages || '',
        },
        validationSchema: schema,
        onSubmit: (values) => {
            // alert(JSON.stringify(values, null, 2));
            if (getBlogId !== undefined) {
                dispatch(updateBlog({ id: getBlogId, blogData: values }));
            } else {
                dispatch(createBlog(values));
                formik.resetForm();
            }
            setTimeout(() => {
                dispatch(resetState());
                navigate('/admin/blog-list');
            }, 3000);
        },
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const images = [];
    imgState.forEach((i) => {
        images.push({
            public_id: i.public_id,
            url: i.url,
        });
    });

    useEffect(() => {
        dispatch(getBlogCategories());
    }, [dispatch]);

    useEffect(() => {
        formik.values.images = images;
    }, [formik.values, images]);

    useEffect(() => {
        if (isSuccess && createdBlog) {
            toast.success('Blog Added Successfully!!!');
        }
        if (isSuccess && updatedBlog) {
            toast.success('Blog Updated Successfully!!!');
        }
        if (isError) {
            toast.error('Something Went Wrong!!!');
        }
    }, [isSuccess, isError, isLoading, createdBlog, updatedBlog]);

    useEffect(() => {
        if (getBlogId !== undefined) {
            dispatch(getBlog(getBlogId));
        } else {
            dispatch(resetState());
        }
    }, [dispatch, getBlogId]);

    return (
        <div>
            <h3 className="mb-4 title">{getBlogId !== undefined ? 'Edit' : 'Add'} Blog</h3>

            <div>
                <form action="" onSubmit={formik.handleSubmit}>
                    <CustomInput
                        type="text"
                        label="Enter BLog Title"
                        i_id="blog_title"
                        d_class="mb-3 mt-4"
                        name="title"
                        onChange={formik.handleChange}
                        value={formik.values.title}
                    />
                    <div className="error">{formik.touched.title && formik.errors.title}</div>

                    <div className="form-floating mb-3">
                        <select
                            className="form-select"
                            id="blogCategory"
                            aria-label="Floating label select example"
                            name="category"
                            onChange={formik.handleChange}
                            value={formik.values.category}
                        >
                            <option value="" disabled>
                                Select Blog Category
                            </option>
                            {blogCatState.map((item) => {
                                return (
                                    <option value={item.title} key={item._id}>
                                        {item.title}
                                    </option>
                                );
                            })}
                        </select>
                        <label htmlFor="blogCategory">Select Blog Category</label>
                    </div>
                    <div className="error">{formik.touched.category && formik.errors.category}</div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            rows="3"
                            className="mb-3 form-control"
                            name="description"
                            onChange={formik.handleChange}
                            value={formik.values.description}
                        ></textarea>
                    </div>

                    <div className="error">
                        {formik.touched.description && formik.errors.description}
                    </div>

                    <div className="bg-white border-1 p-5 text-center mb-3">
                        <Dropzone onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}>
                            {({ getRootProps, getInputProps }) => (
                                <section>
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <p>
                                            Drag 'n' drop some files here, or click to select files
                                        </p>
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                    </div>
                    <div className="showImages mb-3 row">
                        {imgState.map((img) => {
                            return (
                                <div key={img.asset_id} className="col-4 position-relative">
                                    <button
                                        type="button"
                                        onClick={() => dispatch(deleteImg(img.public_id))}
                                        className="btn bg-white rounded-circle p-2 btn-close position-absolute"
                                        style={{ right: '15px', top: '5px' }}
                                    ></button>
                                    <img className="img-fluid w-100" src={img.url} alt="" />
                                </div>
                            );
                        })}
                    </div>
                    <button type="submit" className="btn btn-success border-0 rounded-3 px-4 py-2">
                        {getBlogId !== undefined ? 'Edit' : 'Add'} Blog
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddBlog;
