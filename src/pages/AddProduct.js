import React, { useEffect, useState } from 'react';
import CustomInput from '../components/CustomInput';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { getProdCategories } from '../features/prodCategory/prodCategorySlice';
import { getColors } from '../features/color/colorSlice';
import { getBrands } from '../features/brand/brandSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Select } from 'antd';
import Dropzone from 'react-dropzone';
import { deleteImg, uploadImg } from '../features/upload/uploadSlice';
import {
    createProduct,
    getProduct,
    resetState,
    updateProduct,
} from '../features/product/productSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddProduct = () => {
    const dispatch = useDispatch();
    const [color, setColor] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const getProductId = location.pathname.split('/')[3];
    const brandState = useSelector((state) => state.brand.brands);
    const prodCatState = useSelector((state) => state.prodCategory.prodCategories);
    const colorState = useSelector((state) => state.color.colors);
    const imgState = useSelector((state) => state.upload.images);
    const newProduct = useSelector((state) => state.product);

    const { isSuccess, isError, isLoading, createdProduct, updatedProduct } = newProduct;

    let schema = yup.object().shape({
        title: yup.string().required('*Title is required'),
        description: yup.string().required('*Description is required'),
        price: yup.number().required('*Price is required'),
        quantity: yup.number().required('*Quantity is required'),
        brand: yup.string().required('*Brand is required'),
        category: yup.string().required('*Category is required'),
        tags: yup.string().required('*Tags is required'),
        color: yup.array().min(1, 'Pick at least one color').required('*Color are required'),
    });
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: '',
            description: '',
            price: '',
            quantity: '',
            brand: '',
            category: '',
            tags: '',
            color: '',
            images: '',
        },
        validationSchema: schema,
        onSubmit: (values) => {
            // alert(JSON.stringify(values, null, 2));
            if (getProductId !== undefined) {
                dispatch(updateProduct({ id: getProductId, productData: values }));
            } else {
                dispatch(createProduct(values));
                formik.resetForm();
            }
            setColor(null);
            setTimeout(() => {
                dispatch(resetState());

                // navigate('/admin/product-list');
            }, 3000);
        },
    });

    const colorOpt = [];
    colorState.forEach((i) => {
        colorOpt.push({
            label: i.title,
            value: i._id,
        });
    });

    const images = [];
    imgState.forEach((i) => {
        images.push({
            public_id: i.public_id,
            url: i.url,
        });
    });

    useEffect(() => {
        dispatch(getBrands());
        dispatch(getProdCategories());
        dispatch(getColors());
    }, [dispatch]);

    useEffect(() => {
        formik.values.color = color ? color : ' ';
        formik.values.images = images;
    }, [color, formik.values, images]);

    useEffect(() => {
        if (isSuccess && createdProduct) {
            toast.success('Product Added Successfully!!!');
        }
        if (isSuccess && updatedProduct) {
            toast.success('Product Updated Successfully!!!');
        }
        if (isError) {
            toast.error('Something Went Wrong!!!');
        }
    }, [isSuccess, isError, isLoading, createdProduct, updatedProduct]);

    useEffect(() => {
        if (getProductId !== undefined) {
            dispatch(getProduct(getProductId));
        } else {
            dispatch(resetState());
        }
    }, [dispatch, getProductId]);

    return (
        <div>
            <h3 className="mb-4 title">Add Product</h3>
            <form action="" onSubmit={formik.handleSubmit}>
                <CustomInput
                    type="text"
                    label="Enter Product Title"
                    i_id="product_title"
                    name="title"
                    onChange={formik.handleChange}
                    value={formik.values.title}
                />
                <div className="error">{formik.touched.title && formik.errors.title}</div>
                <CustomInput
                    type="number"
                    label="Enter Product Price"
                    i_id="product_price"
                    name="price"
                    onChange={formik.handleChange}
                    value={formik.values.price}
                />
                <div className="error">{formik.touched.price && formik.errors.price}</div>
                <CustomInput
                    type="number"
                    label="Enter Product Quantity"
                    i_id="product_quantity"
                    name="quantity"
                    onChange={formik.handleChange}
                    value={formik.values.quantity}
                />
                <div className="error">{formik.touched.quantity && formik.errors.quantity}</div>

                <div className="form-floating mb-3">
                    <select
                        className="form-select"
                        id="product_brand"
                        aria-label="Floating label select example"
                        name="brand"
                        onChange={formik.handleChange}
                        value={formik.values.brand}
                    >
                        <option value="" disabled>
                            Select Product Brand
                        </option>
                        {brandState.map((brand) => {
                            return (
                                <option value={brand.title} key={brand._id}>
                                    {brand.title}
                                </option>
                            );
                        })}
                    </select>
                    <label htmlFor="product_brand">Select Product Brand</label>
                </div>
                <div className="error">{formik.touched.brand && formik.errors.brand}</div>

                <div className="form-floating mb-3">
                    <select
                        className="form-select"
                        id="product_category"
                        aria-label="Floating label select example"
                        name="category"
                        onChange={formik.handleChange}
                        value={formik.values.category}
                    >
                        <option value="" disabled>
                            Select Product Category
                        </option>
                        {prodCatState.map((prodCat) => {
                            return (
                                <option value={prodCat.title} key={prodCat._id}>
                                    {prodCat.title}
                                </option>
                            );
                        })}
                    </select>
                    <label htmlFor="product_category">Select Product Category</label>
                </div>
                <div className="error">{formik.touched.category && formik.errors.category}</div>

                <div className="form-floating mb-3">
                    <select
                        className="form-select"
                        id="product_tags"
                        aria-label="Floating label select example"
                        name="tags"
                        onChange={formik.handleChange}
                        value={formik.values.tags}
                    >
                        <option value="" disabled>
                            Select Product Tags
                        </option>
                        <option value="featured">Featured</option>
                        <option value="popular">Poplular</option>
                        <option value="special">Special</option>
                    </select>
                    <label htmlFor="product_tags">Select Product Tags</label>
                </div>
                <div className="error">{formik.touched.tags && formik.errors.tags}</div>

                <Select
                    mode="multiple"
                    allowClear
                    className="w-100"
                    placeholder="Select colors"
                    defaultValue={color}
                    onChange={(e) => setColor(e)}
                    options={colorOpt}
                />
                <div className="error">{formik.touched.color && formik.errors.color}</div>
                <div>
                    <ReactQuill
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
                                    <p>Drag 'n' drop some files here, or click to select files</p>
                                </div>
                            </section>
                        )}
                    </Dropzone>
                </div>
                <div className="showImages mb-3 row">
                    {imgState.map((img) => {
                        return (
                            <div key={img.public_id} className="col-4 position-relative">
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
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default AddProduct;
