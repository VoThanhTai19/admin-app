import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getColors, deleteColor, resetState } from '../features/color/colorSlice';
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

const Colorlist = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [colorId, setColorId] = useState('');
    const colorState = useSelector((state) => state.color.colors);
    const newColor = useSelector((state) => state.color);

    const { isSuccess, isLoading, isError, deletedColor } = newColor;

    useEffect(() => {
        dispatch(getColors());
    }, [dispatch]);

    const showModal = (id) => {
        setColorId(id);
        setOpen(true);
    };

    const hideModal = () => {
        setOpen(false);
    };

    const handleOk = (id) => {
        dispatch(deleteColor(id));
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
            dispatch(resetState());
            dispatch(getColors());
        }, 2000);
    };

    useEffect(() => {
        if (isSuccess && deletedColor) {
            toast.success('Color Deleted Successfully!!!');
        }
        if (isError) {
            toast.error('Something Went Wrong!!!');
        }
    }, [isSuccess, isLoading, isError, deletedColor]);

    const data = [];
    for (let i = 0; i < colorState.length; i++) {
        data.push({
            key: i + 1,
            title: colorState[i].title,
            action: (
                <>
                    <Link to={`/admin/color/${colorState[i]._id}`}>
                        <BiEdit className="fs-3 text-danger p-1" />
                    </Link>
                    <button className="bg-transparent border-0">
                        <AiFillDelete
                            onClick={() => showModal(colorState[i]._id)}
                            className="fs-3 text-danger p-1"
                        />
                    </button>
                </>
            ),
        });
    }
    return (
        <div>
            <h3 className="mb-4 title">Color List</h3>
            <div>
                <Table columns={columns} dataSource={data} />
            </div>
            <CustomModal
                onCancel={hideModal}
                open={open}
                onOk={() => {
                    handleOk(colorId);
                }}
                confirmLoading={confirmLoading}
                title="Are you sure you want to delete this color?"
            />
        </div>
    );
};

export default Colorlist;
