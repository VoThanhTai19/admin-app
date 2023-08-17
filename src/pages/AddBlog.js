import React, { useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import CustomInput from '../components/CustomInput';
import { useNavigate } from 'react-router-dom';
import { deleteImg, uploadImg } from '../features/upload/uploadSlice';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import Dropzone from 'react-dropzone';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { createBlog } from '../features/blogs/blogSlice';
import { getBlogCategories, resetState } from '../features/blogCat/blogCatSlice';

const AddBlog = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    let schema = yup.object().shape({
        title: yup.string().required('*Title is required'),
        description: yup.string().required('*Description is required'),
        category: yup.string().required('*Category is required'),
    });
    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            category: '',
            images: '',
        },
        validationSchema: schema,
        onSubmit: (values) => {
            // alert(JSON.stringify(values, null, 2));
            dispatch(createBlog(values));
            formik.resetForm();
            setTimeout(() => {
                dispatch(resetState());
                navigate('/admin/blog-list');
            }, 3000);
        },
    });

    const blogCatState = useSelector((state) => state.blogCat.blogCategories);
    const imgState = useSelector((state) => state.upload.images);
    const newBlog = useSelector((state) => state.blog);

    const { isSuccess, isError, isLoading, createdBlog } = newBlog;

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
        if (isError) {
            toast.error('Somthing Went Wrong!!!');
        }
    }, [isSuccess, isError, isLoading, createdBlog]);

    return (
        <div>
            <h3 className="mb-4 title">Add Blog</h3>

            <div>
                <form action="" onSubmit={formik.handleSubmit}>
                    <CustomInput
                        type="text"
                        label="Enter BLog Title"
                        i_id="blog_title"
                        d_class="mb-3 mt-4"
                        name="title"
                        onChange={formik.handleChange('title')}
                        onBlur={formik.handleBlur('title')}
                        value={formik.values.title}
                    />
                    <div className="error">{formik.touched.title && formik.errors.title}</div>

                    <div className="form-floating mb-3">
                        <select
                            className="form-select"
                            id="blogCategory"
                            aria-label="Floating label select example"
                            name="category"
                            onChange={formik.handleChange('category')}
                            onBlur={formik.handleBlur('category')}
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

                    <div>
                        <ReactQuill
                            className="mb-3"
                            theme="snow"
                            name="description"
                            onChange={formik.handleChange('description')}
                            value={formik.values.description}
                        />
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
                        Add Blog
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddBlog;
