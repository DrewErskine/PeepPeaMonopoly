import React, { useEffect, useState } from 'react';
import apiClient from '../../api/apiClient';
import CashCardList from './CashCardList';
import { useAuth } from '../../AuthContext';

const CashCardListContainer = () => {
    const [cards, setCards] = useState([]);
    const [error, setError] = useState(null);
    const { authToken } = useAuth();

    useEffect(() => {
        const fetchCashCards = async () => {
            try {
                const response = await apiClient.get('/cashcards');
                setCards(response.data);
            } catch (err) {
                console.error('Error fetching cash cards:', err);
                setError('Failed to fetch cash cards');
            }
        };

        if (authToken) {
            fetchCashCards();
        }
    }, [authToken]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return <CashCardList cards={cards} />;
};

export default CashCardListContainer;
