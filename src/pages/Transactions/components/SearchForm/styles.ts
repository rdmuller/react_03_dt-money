import styled from "styled-components";

export const SearchFormContainer = styled.form`
    display: flex;
    gap: 1rem;

    input {
        flex: 1;
        border: 0;
        border-radius: 6px;
        background-color: ${props => props.theme["gray-900"]};
        color: ${props => props.theme["gray-300"]};
        padding: 1rem;

        &::placeholder {
            color: ${props => props.theme["gray-500"]};
        }
    }

    button {
        display: flex;
        align-items: center;
        gap: 0.75rem;

        padding: 1rem;
        background-color: transparent;
        border: 1px solid ${props => props.theme["green-300"]};
        color: ${props => props.theme["green-300"]};
        border-radius: 6px;
        font-weight: bold;
        cursor: pointer;

        &:not(:disabled):hover {
            background-color: ${props => props.theme["green-500"]};
            border: 1px solid ${props => props.theme["green-500"]};
            color: ${props => props.theme.white};
            transition: 0.2s;
        }

        &:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }
    }
`;