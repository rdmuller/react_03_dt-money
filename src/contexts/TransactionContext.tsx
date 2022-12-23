import { createContext, ReactNode, useEffect, useState } from "react";
import { Transactions } from "../pages/Transactions";

export interface Transaction {
    id: number;
    description: string;
    type: "income" | "outcome";
    category: string;
    price: number;
    createdAt: string;
}

interface TransactionContextType {
    transactions: Transaction[];
}

interface TransactionsProviderProps {
    children: ReactNode;
}

export const TransactionsContext = createContext({} as TransactionContextType);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    async function loadTransactions() {
        /*fetch("http://localhost:3000/trancations")
        .then(response => response.json())
        .then(data => {
            setTransactions(data);
        });*/
        const response = await fetch("http://localhost:3000/trancations");
        const data = await response.json();

        setTransactions(data);
    }

    useEffect(() => {
        loadTransactions();
    }, []);

    return (
        <TransactionsContext.Provider value={{ transactions }}>
            {children}
        </TransactionsContext.Provider>
    );
}