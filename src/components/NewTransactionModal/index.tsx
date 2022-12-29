import * as Dialog from "@radix-ui/react-dialog";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from "./styles";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { TransactionsContext } from "../../contexts/TransactionContext";

const newTransactionFormSchema = z.object({
    description: z.string(),
    price: z.number(),
    category: z.string(),
    type: z.enum(["income", "outcome"]),
});

type NewtransactionFormInputs = z.infer<typeof newTransactionFormSchema>;

export function NewTrasactionModal () {
    const { createTransaction } = useContext(TransactionsContext);

    const { 
        register, 
        handleSubmit,
        control, 
        formState: {isSubmitting},
        reset,
    } = useForm<NewtransactionFormInputs>({
        resolver: zodResolver(newTransactionFormSchema),
        /*defaultValues: {
            type: "income",
        }*/
    });

    async function handleCreateNewTransaction (data: NewtransactionFormInputs) {
        //await api.post("transactions", {...data}); // poderia ser desta forma

        const { category, description, price, type } = data;
        await createTransaction({ 
            category,
            description,
            price,
            type,
        });

        reset();
    }

    return (
        <Dialog.Portal>
            <Overlay />
            <Content>

                <Dialog.Title>Nova transação</Dialog.Title>

                <CloseButton>
                    <X size={24} />
                </CloseButton>

                <form action="" onSubmit={handleSubmit(handleCreateNewTransaction)}>
                    <input type="text" placeholder="Descrição" required {...register("description")} />
                    <input type="number" placeholder="Preço" required {...register("price", {valueAsNumber: true})} />
                    <input type="text" placeholder="Categoria" required {...register("category")} />

                    <Controller 
                        control={control}
                        name="type"
                        render={({ field }) => {
                            return (
                                <TransactionType onValueChange={field.onChange} value={field.value}>
                                    <TransactionTypeButton value="income" variant="income">
                                        <ArrowCircleUp size={24} />
                                        Entrada
                                    </TransactionTypeButton>
                                    <TransactionTypeButton value="outcome" variant="outcome">
                                        <ArrowCircleDown size={24} />
                                        Saída
                                    </TransactionTypeButton>
                                </TransactionType>        
                            );
                        }}
                    />

                    <button type="submit" disabled={isSubmitting}>
                        Cadastrar
                    </button>
                </form>
           
            </Content>
        </Dialog.Portal>

    );
}