import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBlog, getBlogs, resetState } from '../features/blogs/blogSlice';
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
        title: 'Category',
        dataIndex: 'category',
        sorter: (a, b) => a.category.length - b.category.length,
    },
    {
        title: 'Action',
        dataIndex: 'action',
    },
];

const Bloglist = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [blogId, setBlogId] = useState('');
    const blogState = useSelector((state) => state.blog.blogs);
    const newBlog = useSelector((state) => state.blog);
    const { isError, isSuccess, isLoading, deletedBlog } = newBlog;
    useEffect(() => {
        dispatch(getBlogs());
    }, [dispatch]);

    const showModal = (id) => {
        setBlogId(id);
        setOpen(true);
    };

    const hideModal = () => {
        setOpen(false);
    };

    const handleOk = (id) => {
        dispatch(deleteBlog(id));
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
            dispatch(resetState());
            dispatch(getBlogs());
        }, 2000);
    };

    useEffect(() => {
        if (isSuccess && deletedBlog) {
            toast.success('Blog Deleted Successfully!!!');
        }
        if (isError) {
            toast.error('Something Went Wrong!!!');
        }
    }, [isError, isLoading, isSuccess, deletedBlog]);

    const data = [];
    for (let i = 0; i < blogState.length; i++) {
        data.push({
            key: i + 1,
            title: blogState[i].title,
            category: blogState[i].category,
            action: (
                <>
                    <Link to={`/admin/blog/${blogState[i]._id}`}>
                        <BiEdit className="fs-3 text-danger p-1" />
                    </Link>
                    <button className="bg-transparent border-0">
                        <AiFillDelete
                            onClick={() => showModal(blogState[i]._id)}
                            className="fs-3 text-danger p-1"
                        />
                    </button>
                </>
            ),
        });
    }
    return (
        <div>
            <h3 className="mb-4 title">Blog List</h3>
            <div>
                <Table columns={columns} dataSource={data} />
            </div>
            <CustomModal
                onCancel={hideModal}
                open={open}
                onOk={() => {
                    handleOk(blogId);
                }}
                confirmLoading={confirmLoading}
                title="Are you sure you want to delete this blog?"
            />
        </div>
    );
};

export default Bloglist;
