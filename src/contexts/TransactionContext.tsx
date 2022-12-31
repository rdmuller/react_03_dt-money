import { ReactNode, useEffect, useState, useCallback } from "react";
import { createContext } from "use-context-selector";
import { api } from "../lib/axios";

export interface Transaction {
    id: number;
    description: string;
    type: "income" | "outcome";
    category: string;
    price: number;
    createdAt: string;
}

interface CreateTransactionInput {
    description: string;
    type: "income" | "outcome";
    category: string;
    price: number;
}

interface TransactionContextType {
    transactions: Transaction[];
    fetchTransactions: (query?: string) => Promise<void>;
    createTransaction: (data: CreateTransactionInput) => Promise<void>;
}

interface TransactionsProviderProps {
    children: ReactNode;
}

export const TransactionsContext = createContext({} as TransactionContextType);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    const fetchTransactions = useCallback(async (query?: string) => {
        // forma de fazer via fetch
        /*const url = new URL("http://localhost:3000/transactions");

        if (query) {
            url.searchParams.append("q", query);
        }
        //fetch("url")
        //.then(response => response.json())
        //.then(data => {
        //    setTransactions(data);
        //});
        const response = await fetch(url);
        const data = await response.json();
        setTransactions(data);*/

        // via axios // json server: https://github.com/typicode/json-server
        const response = await api.get('transactions', {
            params: {
                _sort: "createdAt",
                _order: "desc",
                q: query,
            }
        });

        setTransactions(response.data);
    }, [])

    const createTransaction = useCallback(async (data: CreateTransactionInput) => {
        const { category, description, price, type } = data;
        const response = await api.post("transactions", { 
            category,
            description,
            price,
            type,
            createdAt: new Date(),
        });

        setTransactions(state => [response.data, ...state])
    }, []);



    // async function createTransaction(data: CreateTransactionInput) {
    //     //await api.post("transactions", {...data}); // poderia ser desta forma
    //     const { category, description, price, type } = data;
    //     const response = await api.post("transactions", { 
    //         category,
    //         description,
    //         price,
    //         type,
    //         createdAt: new Date(),
    //     });
    //     setTransactions(state => [response.data, ...state])
    // }

    useEffect(() => {
        fetchTransactions();
    }, [fetchTransactions]);

    return (
        <TransactionsContext.Provider value={{ transactions, fetchTransactions, createTransaction }}>
            {children}
        </TransactionsContext.Provider>
    );
}