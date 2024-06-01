import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CashCardList from './CashCardList';

const CashCardListContainer = () => {
    const [cashCards, setCashCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCashCards = async () => {
            try {
                const token = localStorage.getItem('authToken'); // Get the token from local storage
                const response = await axios.get('http://localhost:8080/cashcards', {
                    headers: {
                        'Authorization': `Bearer ${token}` // Include the token in the request headers
                    }
                });
                setCashCards(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCashCards();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return <CashCardList cashCards={cashCards} />;
};

export default CashCardListContainer;
