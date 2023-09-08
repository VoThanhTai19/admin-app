import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBrand, getBrands, resetState } from '../features/brand/brandSlice';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
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

const Brandlist = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [brandId, setBrandId] = useState('');
    const brandState = useSelector((state) => state.brand.brands);
    const newBrand = useSelector((state) => state.brand);
    const { isLoading, isSuccess, isError, deletedBrand } = newBrand;
    useEffect(() => {
        dispatch(getBrands());
    }, [dispatch]);
    useEffect(() => {
        if (isSuccess && deletedBrand) {
            toast.success('Brand Deleted Successfully!!!');
        }
        if (isError) {
            toast.error('Something Went Wrong!!!');
        }
    }, [isSuccess, isLoading, isError, deletedBrand]);

    const showModal = (id) => {
        setBrandId(id);
        setOpen(true);
    };

    const hideModal = () => {
        setOpen(false);
    };

    const handleOk = (id) => {
        dispatch(deleteBrand(id));
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
            dispatch(resetState());
            dispatch(getBrands());
        }, 2000);
    };

    const data = [];
    for (let i = 0; i < brandState.length; i++) {
        data.push({
            key: i + 1,
            title: brandState[i].title,
            action: (
                <>
                    <Link to={`/admin/brand/${brandState[i]._id}`}>
                        <BiEdit className="fs-3 text-danger p-1" />
                    </Link>
                    <button className="bg-transparent border-0">
                        <AiFillDelete
                            onClick={() => {
                                showModal(brandState[i]._id);
                            }}
                            className="fs-3 text-danger p-1"
                        />
                    </button>
                </>
            ),
        });
    }
    return (
        <div>
            <h3 className="mb-4 title">Brand List</h3>
            <div>
                <Table columns={columns} dataSource={data} />
            </div>
            <CustomModal
                onCancel={hideModal}
                open={open}
                onOk={() => {
                    handleOk(brandId);
                }}
                confirmLoading={confirmLoading}
                title="Are you sure you want to delete this brand?"
            />
        </div>
    );
};

export default Brandlist;
