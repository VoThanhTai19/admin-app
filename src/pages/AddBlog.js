import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import CustomInput from '../components/CustomInput';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';

const { Dragger } = Upload;
const props = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
    },
};
const AddBlog = () => {
    const [desc, setDesc] = useState('');

    return (
        <div>
            <h3 className="mb-4 title">Add Blog</h3>

            <div>
                <form action="">
                    <Dragger {...props}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">
                            Support for a single or bulk upload. Strictly prohibited from uploading
                            company data or other banned files.
                        </p>
                    </Dragger>
                    <CustomInput
                        type="text"
                        label="Enter BLog Title"
                        i_id="blog_title"
                        d_class="mb-3 mt-4"
                    />
                    <div className="form-floating mb-3">
                        <select
                            className="form-select"
                            id="blogCategory"
                            aria-label="Floating label select example"
                        >
                            <option value="selected" disabled>
                                Select Blog Category
                            </option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                        <label htmlFor="blogCategory">Select Blog Category</label>
                    </div>
                    <ReactQuill
                        className="mb-3"
                        theme="snow"
                        value={desc}
                        onChange={(e) => {
                            setDesc(e);
                        }}
                    />
                    <button type="submit" className="btn btn-success border-0 rounded-3 px-4 py-2">
                        Add Blog
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddBlog;
