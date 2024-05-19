import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = () => {
    const { budget, dispatch, expenses, currency } = useContext(AppContext);

    const [newBudget, setNewBudget] = useState(budget);

    // Calculate total spending
    const totalSpending = expenses.reduce((total, item) => {
        return total + item.cost;
    }, 0);

    const handleBudgetChange = (event) => {
        const value = parseInt(event.target.value, 10);

        if (value > 20000) {
            alert("The value cannot exceed 20,000.");
        } else if (value < totalSpending) {
            alert("The budget cannot be lower than the total spending of " + currency + totalSpending);
        } else {
            setNewBudget(value);
            dispatch({
                type: 'SET_BUDGET',
                payload: value,
            });
        }
    };

    const handleCurrencyChange = (event) => {
        dispatch({
            type: 'SET_CURRENCY',
            payload: event.target.value,
        });
    };

    return (
        <div className='alert alert-secondary' style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '10px' }}>Budget: {currency}{budget}</span>
            <input
                type="number"
                step="10"
                value={newBudget}
                onChange={handleBudgetChange}
                style={{ marginRight: '10px' }}
            />
            <label htmlFor="currencySelect" style={{ marginRight: '10px' }}>Currency:</label>
            <select
                id="currencySelect"
                value={currency}
                onChange={handleCurrencyChange}
                style={{
                    padding: '5px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    background: '#f8f9fa',
                    appearance: 'none',
                    WebkitAppearance: 'none',
                    MozAppearance: 'none'
                }}
            >
                <option value="£">£ Pound</option>
                <option value="$">$ Dollar</option>
                <option value="€">€ Euro</option>
                <option value="₹">₹ Rupee</option>
            </select>
        </div>
    );
};

export default Budget;
