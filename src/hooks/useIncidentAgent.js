// src/hooks/useIncidentAgent.js
import { useState } from 'react';
import { analyzeIncident } from '../services/agentService';

export const useIncidentAgent = () => {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const analyze = async (text) => {
        if (!text.trim()) return;

        setLoading(true);
        setError('');
        setResult(null);

        try {
            const data = await analyzeIncident(text);
            setResult(data);
        } catch (err) {
            setError(err.message || "Ocurrió un error inesperado al analizar.");
        } finally {
            setLoading(false);
        }
    };

    return {
        result,
        loading,
        error,
        analyze
    };
};