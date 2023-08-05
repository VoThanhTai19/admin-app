import React from 'react';

const CustomInput = (props) => {
    const { type, label, i_id, i_class, d_class } = props;
    return (
        <>
            <div className={`form-floating ${d_class}`}>
                <input
                    type={type}
                    className={`form-control ${i_class}`}
                    id={i_id}
                    placeholder={label}
                />
                <label htmlFor={i_id}>{label}</label>
            </div>
        </>
    );
};

export default CustomInput;
