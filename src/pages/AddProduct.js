import React from 'react';
import CustomInput from '../components/CustomInput';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useFormik } from 'formik';
import * as yup from 'yup';

const AddProduct = () => {
    let schema = yup.object().shape({
        title: yup.string().required('*Title is required'),
        description: yup.string().required('*Description is required'),
    });
    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
        },
        validationSchema: schema,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <div>
            <h3 className="mb-4 title">Add Product</h3>
            <form action="">
                <CustomInput
                    type="text"
                    label="Enter Product Title"
                    i_id="product_title"
                    d_class="mb-3"
                    name="title"
                    onChange={formik.handleChange('title')}
                    value={formik.values.title}
                />
                <CustomInput
                    type="number"
                    label="Enter Product Price"
                    i_id="product_price"
                    d_class="mb-3"
                />
                <CustomInput
                    type="number"
                    label="Enter Product Quantity"
                    i_id="product_quantity"
                    d_class="mb-3"
                />

                <div className="form-floating mb-3 mt-3">
                    <select
                        className="form-select"
                        id="product_brand"
                        aria-label="Floating label select example"
                    >
                        <option value="selected" disabled>
                            Select Product Brand
                        </option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                    <label htmlFor="product_brand">Select Product Brand</label>
                </div>
                <div className="form-floating mb-3">
                    <select
                        className="form-select"
                        id="product_category"
                        aria-label="Floating label select example"
                    >
                        <option value="selected" disabled>
                            Select Product Category
                        </option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                    <label htmlFor="product_category">Select Product Category</label>
                </div>
                <div className="form-floating mb-3">
                    <select
                        className="form-select"
                        id="product_color"
                        aria-label="Floating label select example"
                    >
                        <option value="selected" disabled>
                            Select Product Color
                        </option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                    <label htmlFor="product_color">Select Product Color</label>
                </div>
                <ReactQuill
                    className="mb-3"
                    theme="snow"
                    name="description"
                    onChange={formik.handleChange('description')}
                    value={formik.values.description}
                />
                <button type="submit" className="btn btn-success border-0 rounded-3 px-4 py-2">
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default AddProduct;
