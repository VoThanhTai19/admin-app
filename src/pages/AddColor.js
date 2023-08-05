import React from 'react';
import CustomInput from '../components/CustomInput';

const AddColor = () => {
    return (
        <div>
            <h3 className="mb-4 title">Add Color</h3>

            <div>
                <form action="">
                    <CustomInput
                        type="color"
                        label="Enter Color"
                        i_id="add_color"
                        d_class="mb-3 mt-4"
                    />

                    <button type="submit" className="btn btn-success border-0 rounded-3 px-4 py-2">
                        Add Color
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddColor;
