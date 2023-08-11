import React, { useEffect, useState } from 'react';
import CustomInput from '../components/CustomInput';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useFormik } from 'formik';
import * as yup from 'yup';
import 'react-widgets/styles.css';
import { getProdCategories } from '../features/prodCategory/prodCategorySlice';
import { getColors } from '../features/color/colorSlice';
import { getBrands } from '../features/brand/brandSlice';
import { useDispatch, useSelector } from 'react-redux';
import Multiselect from 'react-widgets/Multiselect';
import Dropzone from 'react-dropzone';

const AddProduct = () => {
    const dispatch = useDispatch();
    // const [color, setColor] = useState([]);

    let schema = yup.object().shape({
        title: yup.string().required('*Title is required'),
        description: yup.string().required('*Description is required'),
        price: yup.number().required('*Price is required'),
        quantity: yup.number().required('*Quantity is required'),
        brand: yup.string().required('*Brand is required'),
        category: yup.string().required('*Category is required'),
        color: yup.array().required('*Color are required'),
    });
    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            price: '',
            quantity: '',
            brand: '',
            category: '',
            color: [],
        },
        validationSchema: schema,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    useEffect(() => {
        dispatch(getBrands());
        dispatch(getProdCategories());
        dispatch(getColors());
        // formik.values.color = color;
    }, []);
    const brandState = useSelector((state) => state.brand.brands);
    const prodCatState = useSelector((state) => state.prodCategory.prodCategories);
    const colorState = useSelector((state) => state.color.colors);

    const colors = [];
    colorState.forEach((color) => {
        colors.push({
            id: color._id,
            color: color.title,
        });
    });

    return (
        <div>
            <h3 className="mb-4 title">Add Product</h3>
            <form action="" onSubmit={formik.handleSubmit}>
                <CustomInput
                    type="text"
                    label="Enter Product Title"
                    i_id="product_title"
                    name="title"
                    onChange={formik.handleChange('title')}
                    onBlur={formik.handleBlur('title')}
                    value={formik.values.title}
                />
                <div className="error">{formik.touched.title && formik.errors.title}</div>
                <CustomInput
                    type="number"
                    label="Enter Product Price"
                    i_id="product_price"
                    name="price"
                    onChange={formik.handleChange('price')}
                    onBlur={formik.handleBlur('price')}
                    value={formik.values.price}
                />
                <div className="error">{formik.touched.price && formik.errors.price}</div>
                <CustomInput
                    type="number"
                    label="Enter Product Quantity"
                    i_id="product_quantity"
                    name="quantity"
                    onChange={formik.handleChange('quantity')}
                    onBlur={formik.handleBlur('quantity')}
                    value={formik.values.quantity}
                />
                <div className="error">{formik.touched.quantity && formik.errors.quantity}</div>

                <div className="form-floating mb-3">
                    <select
                        className="form-select"
                        id="product_brand"
                        aria-label="Floating label select example"
                        name="brand"
                        onChange={formik.handleChange('brand')}
                        onBlur={formik.handleBlur('brand')}
                        value={formik.values.brand}
                    >
                        <option value="selected" disabled>
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
                        onChange={formik.handleChange('category')}
                        onBlur={formik.handleBlur('category')}
                        value={formik.values.category}
                    >
                        <option value="selected" disabled>
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

                <Multiselect
                    name="color"
                    dataKey="id"
                    textField="color"
                    data={colors}
                    // onChange={(e) => setColor(e)}
                    onChange={formik.handleChange('color')}
                    value={formik.values.color}
                    onBlur={formik.handleBlur('color')}
                />
                <div className="error">{formik.touched.color && formik.errors.color}</div>
                <ReactQuill
                    theme="snow"
                    name="description"
                    onChange={formik.handleChange('description')}
                    onBlur={formik.handleBlur('description')}
                    value={formik.values.description}
                />
                <div className="error">
                    {formik.touched.description && formik.errors.description}
                </div>
                <div className="bg-white border-1 p-5 text-center mb-3">
                    <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
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

                <button type="submit" className="btn btn-success border-0 rounded-3 px-4 py-2">
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default AddProduct;
