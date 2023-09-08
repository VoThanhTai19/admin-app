import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    deleteBlogCategory,
    getBlogCategories,
    resetState,
} from '../features/blogCat/blogCatSlice';
import CustomModal from '../components/CustomModal';
import { toast } from 'react-toastify';

const columns = [
    {
        title: 'No',
        dataIndex: 'key',
    },
    {
        title: 'Title',
        dataIndex: 'title',
        sorter: (a, b) => a.title.length - b.title.length,
    },

    {
        title: 'Action',
        dataIndex: 'action',
    },
];

const BlogCatList = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [blogCatId, setBlogCatId] = useState('');
    const blogCatState = useSelector((state) => state.blogCat.blogCategories);
    const newBlogCat = useSelector((state) => state.blogCat);
    const { isLoading, isSuccess, isError, deletedBlogCategory } = newBlogCat;
    useEffect(() => {
        dispatch(getBlogCategories());
    }, [dispatch]);
    const showModal = (id) => {
        setBlogCatId(id);
        setOpen(true);
    };

    const hideModal = () => {
        setOpen(false);
    };

    const handleOk = (id) => {
        dispatch(deleteBlogCategory(id));
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
            dispatch(resetState());
            dispatch(getBlogCategories());
        }, 2000);
    };
    const data = [];
    for (let i = 0; i < blogCatState.length; i++) {
        data.push({
            key: i + 1,
            title: blogCatState[i].title,
            action: (
                <>
                    <Link to={`/admin/blog-category/${blogCatState[i]._id}`}>
                        <BiEdit className="fs-3 text-danger p-1" />
                    </Link>
                    <button className="bg-transparent border-0">
                        <AiFillDelete
                            onClick={() => showModal(blogCatState[i]._id)}
                            className="fs-3 text-danger p-1"
                        />
                    </button>
                </>
            ),
        });
    }

    useEffect(() => {
        if (isSuccess && deletedBlogCategory) {
            toast.success('Blog Category Deleted Successfully!!!');
        }
        if (isError) {
            toast.error('Something Went Wrong!!!');
        }
    }, [isLoading, isSuccess, isError, deletedBlogCategory]);
    return (
        <div>
            <h3 className="mb-4 title">Blog Cat List</h3>
            <div>
                <Table columns={columns} dataSource={data} />
            </div>
            <CustomModal
                onCancel={hideModal}
                open={open}
                onOk={() => {
                    handleOk(blogCatId);
                }}
                confirmLoading={confirmLoading}
                title="Are you sure you want to delete this blog category?"
            />
        </div>
    );
};

export default BlogCatList;
