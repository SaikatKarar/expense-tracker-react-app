import React, { useState } from 'react'

const TransactionMenu = ({ onIncome, onExpense }) => {
    const [menu, setMenu] = useState(false);
    const [data, setData] = useState([]);
    const [amount, setAmount] = useState();
    const [title, setTitle] = useState("");
    const [transactionType, setTransactionType] = useState("expense");

    const toggleBtn = () => {
        setMenu(!menu)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const info = {
            id: data.length,
            amount: amount,
            title: title,
            transactionType: transactionType
        }
        if (!amount || !title) {
            alert('Amount And title are required for transactions')
            return;
        }
        if (transactionType == 'income') {
            onIncome(Number(amount));
        }
        else {
            onExpense(Number(amount));
        }

        setData((prevData) => [...prevData, info]);
        setAmount("")
        setTitle("")
        setTransactionType('expense')
        setMenu(!menu)
    }
    return (
        <div>
            <div className='mt-6 flex flex-col items-center'>
                <button className='bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-400 mb-6' onClick={toggleBtn}>
                    Add Transaction
                </button>
                {menu &&
                    (
                        <div className='flex items-center'>
                            <div className='flex items-center gap-2 text-black'>
                                <input required type="number" placeholder='Enter Amount' className='p-2 rounded-lg border-black placeholder: text-gray-700' value={amount} onChange={(e) => setAmount(e.target.value)} />
                                <input required type="text" placeholder='Enter Title' className='p-2 rounded-lg border-black placeholder: text-gray-700' value={title} onChange={(e) => setTitle(e.target.value)} />
                                <select value={transactionType} onChange={(e) => setTransactionType(e.target.value)} name="" className='p-2 border rounded-lg'>
                                    <option value="expense">Expense</option>
                                    <option value="income">Income</option>
                                </select>
                                <button className='bg-black text-white p-2 rounded-lg hover:bg-gray-700' onClick={handleSubmit}>Add</button>
                            </div>
                        </div>
                    )
                }
            </div>
            {data.length > 0 &&
                data.map((dt, id) => (
                    <div key={id} className='flex items-center justify-center mt-2'>
                        <div className={`flex w-[200px] justify-between flex-row text-white gap-4 mb-2 p-2 font-bold rounded-md 
                            ${dt.transactionType === 'expense' ? 'bg-red-500' : 'bg-green-600'}`}>
                            <p>{dt.title}</p>
                            <p>{dt.amount}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default TransactionMenu