import { HeaderContainer, HeaderContent, NewTransactionButton } from "./styles";
import * as Dialog from '@radix-ui/react-dialog';
import logoImg from "../../assets/logo.svg";
import { NewTrasactionModal } from "../NewtransactionModal";

export function Header () {
    return (
        <HeaderContainer>
            <HeaderContent>
                <img src={logoImg} />

                <Dialog.Root>
                    <Dialog.Trigger asChild>

                        <NewTransactionButton>Nova transação</NewTransactionButton>

                    </Dialog.Trigger>

                    <NewTrasactionModal />

                </Dialog.Root>

            </HeaderContent>
        </HeaderContainer>
    );
}