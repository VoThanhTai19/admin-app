import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    deleteProdCategory,
    getProdCategories,
    resetState,
} from '../features/prodCategory/prodCategorySlice';
import { toast } from 'react-toastify';
import CustomModal from '../components/CustomModal';

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

const Categorylist = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [categoryId, setCategoryId] = useState('');
    const prodCategoryState = useSelector((state) => state.prodCategory.prodCategories);
    const newCategory = useSelector((state) => state.prodCategory);
    const { isLoading, isSuccess, isError, deletedProdCategory } = newCategory;
    useEffect(() => {
        dispatch(getProdCategories());
    }, [dispatch]);

    useEffect(() => {
        if (isSuccess && deletedProdCategory) {
            toast.success('Product Category Deleted Successfully!!!');
        }
        if (isError) {
            toast.error('Something Went Wrong!!!');
        }
    }, [isSuccess, isLoading, isError, deletedProdCategory]);

    const showModal = (id) => {
        setCategoryId(id);
        setOpen(true);
    };

    const hideModal = () => {
        setOpen(false);
    };

    const handleOk = (id) => {
        dispatch(deleteProdCategory(id));
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
            dispatch(resetState());
            dispatch(getProdCategories());
        }, 2000);
    };

    const data = [];
    for (let i = 0; i < prodCategoryState.length; i++) {
        data.push({
            key: i + 1,
            title: prodCategoryState[i].title,
            action: (
                <>
                    <Link to={`/admin/category/${prodCategoryState[i]._id}`}>
                        <BiEdit className="fs-3 text-danger p-1" />
                    </Link>
                    <button className="bg-transparent border-0">
                        <AiFillDelete
                            onClick={() => showModal(prodCategoryState[i]._id)}
                            className="fs-3 text-danger p-1"
                        />
                    </button>
                </>
            ),
        });
    }
    return (
        <div>
            <h3 className="mb-4 title">Category List</h3>
            <div>
                <Table columns={columns} dataSource={data} />
            </div>
            <CustomModal
                onCancel={hideModal}
                open={open}
                onOk={() => {
                    handleOk(categoryId);
                }}
                confirmLoading={confirmLoading}
                title="Are you sure you want to delete this category?"
            />
        </div>
    );
};

export default Categorylist;
