import styled from "styled-components";
import * as Dialog from "@radix-ui/react-dialog";

export const Overlay = styled(Dialog.Overlay)`
    position: fixed;
    width: 100vw;
    height: 100vh;
    inset: 0; // left: 0, top:0, right: 0, bottom: 0
    background-color: rgba(0, 0, 0, 0.75);
`;

export const Content = styled(Dialog.Content)`
    min-width: 32rem;
    border-radius: 6px;
    padding: 2.5rem 3rem;
    background-color: ${props => props.theme["gray-800"]};

    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); // diminui em 50% o posicionamento, conforme a largura do conteudo

    form {
        margin-top: 2rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;

        input {
            border-radius: 6px;
            border: 0;
            background-color: ${props => props.theme["gray-900"]};
            color: ${props => props.theme["gray-300"]};
            padding: 1rem;

            &::placeholder {
                color: ${props => props.theme["gray-500"]};
            }
        }
    }

    button[type="submit"] {
        height: 58px;
        border: 0;        
        background-color: ${props => props.theme["green-500"]};
        color: ${props => props.theme.white};
        font-weight: bold;
        padding: 0 1.25rem;
        border-radius: 6px;
        margin-top: 1.5rem;
        cursor: pointer;

        &:hover {
            background-color: ${props => props.theme["green-700"]};
            transition: 0.2s;
        }
    }
`;

export const CloseButton = styled(Dialog.Close)`
    position: absolute;
    background-color: transparent;
    border: 0;
    top: 1.5rem;
    right: 1.5rem;
    cursor: pointer;
    color: ${props => props.theme["gray-500"]};
    line-height: 0; // devido ao quadro ao redor quando recebe foco
`;