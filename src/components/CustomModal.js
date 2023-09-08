import React from 'react';
import { Modal } from 'antd';

const CustomModal = (props) => {
    const { open, onCancel, onOk, title, confirmLoading } = props;
    return (
        <Modal
            title="Modal"
            confirmLoading={confirmLoading}
            open={open}
            onOk={onOk}
            onCancel={onCancel}
            cancelText="Cancel"
        >
            <p>{title}</p>
        </Modal>
    );
};

export default CustomModal;
