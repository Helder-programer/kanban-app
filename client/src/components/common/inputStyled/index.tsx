import { InputHTMLAttributes } from 'react';
import styled, { keyframes } from 'styled-components';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    id: string;
    $withoutValueColor?: string;
    $withValueColor?: string;
    //Animation delay in milliseconds
    $animationDelay?: string;
    $animationDuration?: string;
}

function CustomInput({ value, onChange, type, label, id, autoComplete, className, required, name, maxLength }: IProps) {
    return (
        <div className={className} id="input-styled-div">
            <input
                id={id}
                name={name}
                type={type}
                autoComplete={autoComplete}
                maxLength={maxLength}
                placeholder="."
                className="input-form"
                required={required}
                value={value}
                onChange={onChange}
            />
            <label htmlFor={id}>{label}</label>
        </div>
    );
}

const inputAnimation  = keyframes`
    from {
        width: 0%
    }
    to {
        width: 100%;
    }
`

const StyledCustomInput = styled(CustomInput)`   
    position: relative;
    width: 0%;
    animation: ${inputAnimation} ${props => props.$animationDuration} 1 ${props => props.$animationDelay} forwards;
    overflow: hidden;

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