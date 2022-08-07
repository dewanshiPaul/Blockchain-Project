import React, { useEffect, useState, createContext } from "react";
import { ethers } from 'ethers';
import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = createContext();

const { ethereum } = window;

//fetch ethereum contract
const getEthContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress,contractABI,signer);
    
    return transactionContract;
}

export const TransactionProvider = ({ children }) => {
    const [connectedAccount, setConnectedAccount] = useState('');
    const [formData, setFormData] = useState({ 
        addressTo: '', 
        amount: '', 
        keyword: '', 
        message: ''
    })
    const [loading, setLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));
    const [transactions, setTransactions] = useState([]);

    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value}));
    }

    const getAllTransaction = async () => {
        try {
            if(ethereum) {
                const transactionContract = getEthContract();
                const availableTransactions = await transactionContract.getAllTransaction();
                console.log(availableTransactions);
                const prettifyAvailableTransactions = availableTransactions.map((transactions) => ({
                    addressTo: transactions.receiver,
                    addressFrom: transactions.sender,
                    message: transactions.message,
                    amount: parseInt(transactions.amount._hex)/(10 ** 18),
                    keyword: transactions.keyword,
                    timestamp: new Date(transactions.timeStamp.toNumber()*1000).toLocaleString(),
                }))

                console.log(prettifyAvailableTransactions);
                setTransactions(prettifyAvailableTransactions);  
            } else {
                console.log("Ethereum is not present in your wallet or your wallet is not connected!!");
            }
        } catch(error) {
            console.log(error);
        }
    }

    const checkIfWalletIsConnected = async () => {
        try {
            if(!ethereum)
                return alert("Please install metamask");

            const accounts = await ethereum.request({ method: 'eth_accounts' });

            if(accounts.length) {
                setConnectedAccount(accounts[0]);
                getAllTransaction();
            } else {
                console.log("No accounts present");
            }
            console.log(accounts[0]);
        } catch(error) {
            console.log(error);
            throw new Error('No ethereum objects!!');
        }
    }

    const checkIfTransactionsExist = async () => {
        try {
            const transactionContract = getEthContract();
            const transactionCount = await transactionContract.getTransactionCount();

            window.localStorage.setItem('transactionCount', transactionCount);
        } catch(error) {
            console.log(error);

            throw new Error('No ethereum object')
        }
    }

    const connectWallet = async () => {
        try {
            if(!ethereum)
                return alert("Please install metamask");
            
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

            setConnectedAccount(accounts[0]);
            console.log(accounts);
        } catch(error) {
            console.log(error);
            throw new Error("No ethereum objects!!");
        }
    }

    const sendTransaction = async () => {
        try {
            if(!ethereum)
                return alert("Please install metamask!!");

                const { addressTo, amount, keyword, message } = formData;
                const transactionContract = getEthContract();
                const parsedAmount = ethers.utils.parseEther(amount);

                await ethereum.request({ 
                    method: 'eth_sendTransaction',
                    params: [{
                        from: connectedAccount,
                        to: addressTo,
                        gas: '0x5208', //21000 gwei
                        value: parsedAmount._hex,
                    }]
                })

                const transactionID = await transactionContract.addToBC(addressTo, parsedAmount, message, keyword);

                setLoading(true);

                console.log(`Loading - ${transactionID.hash}`);
                await transactionID.wait();

                setLoading(false);

                console.log(`Success - ${transactionID.hash}`);

                const transactionCount = await transactionContract.getTransactionCount();
                setTransactionCount(transactionCount.toNumber());

        } catch(error) {
            console.log(error);
            throw new Error("No ethereum objects!!");
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
        checkIfTransactionsExist();
    }, [])

    return (
        <TransactionContext.Provider value={{ 
            connectWallet, 
            connectedAccount, 
            formData, 
            setFormData, 
            handleChange, 
            sendTransaction,
            transactions,
            loading 
        }}>
            {children}
        </TransactionContext.Provider>
    )
}