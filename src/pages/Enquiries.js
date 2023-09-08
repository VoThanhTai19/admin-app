import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { AiFillDelete, AiOutlineEye } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getEnquiries, deleteEnquiry, resetState } from '../features/enquiry/enquirySlice';
import CustomModal from '../components/CustomModal';
import { toast } from 'react-toastify';
const columns = [
    {
        title: 'No',
        dataIndex: 'key',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        sorter: (a, b) => a.name.length - b.name.length,
    },
    {
        title: 'Email',
        dataIndex: 'email',
        sorter: (a, b) => a.email.length - b.email.length,
    },
    {
        title: 'Mobile',
        dataIndex: 'mobile',
    },
    {
        title: 'Status',
        dataIndex: 'status',
    },
    {
        title: 'Action',
        dataIndex: 'action',
    },
];

const Enquiries = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [enquiryId, setEnquiryId] = useState('');
    const enquiryState = useSelector((state) => state.enquiry.enquiries);
    const newEnquiry = useSelector((state) => state.enquiry);

    const { isSuccess, isLoading, isError, deletedEnquiry } = newEnquiry;

    useEffect(() => {
        dispatch(getEnquiries());
    }, [dispatch]);
    const showModal = (id) => {
        setEnquiryId(id);
        setOpen(true);
    };

    const hideModal = () => {
        setOpen(false);
    };

    const handleOk = (id) => {
        dispatch(deleteEnquiry(id));
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
            dispatch(resetState());
            dispatch(getEnquiries());
        }, 2000);
    };

    useEffect(() => {
        if (isSuccess && deletedEnquiry) {
            toast.success('Enquiry Deleted Successfully!!!');
        }
        if (isError) {
            toast.error('Something Went Wrong!!!');
        }
    }, [isSuccess, isLoading, isError, deletedEnquiry]);

    const data = [];
    for (let i = 0; i < enquiryState.length; i++) {
        data.push({
            key: i + 1,
            name: enquiryState[i].name,
            email: enquiryState[i].email,
            mobile: enquiryState[i].mobile,
            status: (
                <div className="form-floating">
                    <select
                        className="form-select"
                        id="enquiry_status"
                        aria-label="Floating label select example"
                    >
                        <option value="" disabled>
                            Select Status
                        </option>
                        <option value={enquiryState[i].status}>{enquiryState[i].status}</option>
                    </select>
                    <label htmlFor="enquiry_status">Select Status</label>
                </div>
            ),
            action: (
                <>
                    <Link to={`/admin/enquiries/${enquiryState[i]._id}`}>
                        <AiOutlineEye className="fs-3 text-danger p-1" />
                    </Link>
                    <button className="bg-transparent border-0">
                        <AiFillDelete
                            onClick={() => showModal(enquiryState[i]._id)}
                            className="fs-3 text-danger p-1"
                        />
                    </button>
                </>
            ),
        });
    }
    return (
        <div>
            <h3 className="mb-4 title">Enquiries</h3>
            <div>
                <Table columns={columns} dataSource={data} />
            </div>
            <CustomModal
                onCancel={hideModal}
                open={open}
                onOk={() => {
                    handleOk(enquiryId);
                }}
                confirmLoading={confirmLoading}
                title="Are you sure you want to delete this color?"
            />
        </div>
    );
};

export default Enquiries;
