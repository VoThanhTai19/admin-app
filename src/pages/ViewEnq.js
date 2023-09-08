import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getEnquiry } from '../features/enquiry/enquirySlice';

const ViewEnq = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const getEnquiryId = location.pathname.split('/')[3];
    const enqState = useSelector((state) => state.enquiry);
    const { enquiryName, enquiryMobile, enquiryEmail, enquiryComment, enquiryStatus } = enqState;

    useEffect(() => {
        dispatch(getEnquiry(getEnquiryId));
    }, [dispatch, getEnquiryId]);

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center">
                <h3 className="mb-4 title">Enquiries</h3>
                <button className="btn btn-primary mb-4" onClick={() => navigate(-1)}>
                    Go Back
                </button>
            </div>
            <div className="bg-white p-4 rounded-3 d-flex flex-column gap-3">
                <div className="d-flex align-items-center gap-3">
                    <h6 className="mb-0" style={{ width: '120px' }}>
                        Name:{' '}
                    </h6>
                    <p className="mb-0">{enquiryName}</p>
                </div>
                <div className="d-flex align-items-center gap-3">
                    <h6 className="mb-0" style={{ width: '120px' }}>
                        Mobile:{' '}
                    </h6>
                    <p className="mb-0">
                        <a href={`tel: +84{enquiryMobile}`}>{enquiryMobile}</a>
                    </p>
                </div>
                <div className="d-flex align-items-center gap-3">
                    <h6 className="mb-0" style={{ width: '120px' }}>
                        Email:{' '}
                    </h6>
                    <p className="mb-0">
                        <a href={`mailto: {enquiryEmail}`}>{enquiryEmail}</a>
                    </p>
                </div>
                <div className="d-flex align-items-center gap-3">
                    <h6 className="mb-0" style={{ width: '120px' }}>
                        Comment:{' '}
                    </h6>
                    <p className="mb-0">{enquiryComment}</p>
                </div>
                <div className="d-flex align-items-center gap-3">
                    <h6 className="mb-0" style={{ width: '120px' }}>
                        Status:{' '}
                    </h6>
                    <p className="mb-0">{enquiryStatus}</p>
                </div>
                <div className="d-flex align-items-center gap-3">
                    <h6 className="mb-0" style={{ width: '120px' }}>
                        Changes Status:{' '}
                    </h6>
                    <div>
                        <select
                            defaultValue={enquiryStatus ? enquiryStatus : 'Submitted'}
                            className="form-control form-select"
                            id="enquiry_status"
                            aria-label="Floating label select example"
                        >
                            <option value="Submitted">Submitted</option>
                            <option value="Contacted">Contacted</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Resolved">Resolved</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewEnq;
