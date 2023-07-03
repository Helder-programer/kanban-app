import { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    id: string;
    $withoutValueColor?: string;
    $withValueColor?: string;
}

function CustomInput({ value, onChange, type, label, id, autoComplete, className, required, name }: IProps) {
    return (
        <div className={className} id="input-styled-div">
            <input
                id={id}
                name={name}
                type={type}
                autoComplete={autoComplete}
                placeholder="."
                className="input-form"
                required
                value={value}
                onChange={onChange}
                required={required}
            />
            <label htmlFor={id}>{label}</label>
        </div>
    );
}

const StyledCustomInput = styled(CustomInput)`   
    position: relative;

    label {
        position: absolute;
        z-index: 1;
        top: 17px;
        left: 2px;
        cursor: text;
        transition: all 0.3s ease-in-out;
        opacity: 0.8;
        color: ${props => props.$withoutValueColor || 'black'};
    }
    


    .input-form {
        display: block;
        width: 100%;
        border: none;
        color: ${props => props.$withoutValueColor || 'black'};
        border-bottom: 2px solid ${props => props.$withoutValueColor || 'black'};
        outline: none;
        z-index: 15;
        background-color: transparent;
        padding-top: 17px;
    }

    .input-form::placeholder {
        opacity: 0;
    }

    .input-form:not(:placeholder-shown)~label, .input-form:focus~label {
        top: 0px !important;
        font-size: 12px;
        color: ${props => props.$withValueColor || 'black'};
    }

    .input-form:not(:placeholder-shown), .input-form:focus {
        color: ${props => props.$withValueColor || 'black'};
        border-bottom: 2px solid ${props => props.$withValueColor || 'black'};
    }
`;

export default StyledCustomInput;