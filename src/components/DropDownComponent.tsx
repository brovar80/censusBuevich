import {CSSProperties, default as React} from 'react';
import Select from 'react-select';

export interface ColourOption {
    readonly value: string;
    readonly label: string;
    readonly color: string;
    readonly isFixed?: boolean;
    readonly isDisabled?: boolean;
}

export const DropDownComponent: React.FC<any> = ({items, changeHandler, placeholder}: any) => {

    return (
        <Select
            placeholder={placeholder}
            isMulti
            name="colors"
            options={items}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={changeHandler}
        />
    );
};