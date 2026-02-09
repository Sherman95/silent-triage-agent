// src/services/agentService.js

const APP_ID = import.meta.env.VITE_ALGOLIA_APP_ID;
const API_KEY = import.meta.env.VITE_ALGOLIA_API_KEY;
const AGENT_URL = import.meta.env.VITE_AGENT_URL;

export const analyzeIncident = async (incidentText) => {
    try {
        console.log("📡 Servicio: Enviando petición a Algolia...");

        const response = await fetch(AGENT_URL, {
            method: 'POST',
            headers: {
                'X-Algolia-Application-Id': APP_ID,
                'X-Algolia-API-Key': API_KEY,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                messages: [{ role: "user", content: incidentText }]
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error HTTP ${response.status}: ${errorText}`);
        }

        // --- LÓGICA DE PARSEO DEL STREAM ---
        const textResponse = await response.text();
        const lines = textResponse.split('\n');
        let fullJsonString = "";

        for (const line of lines) {
            if (line.startsWith('0:')) {
                try {
                    // Quitamos el prefijo '0:' y parseamos el string interno
                    const jsonStringPart = line.substring(2);
                    const textPart = JSON.parse(jsonStringPart);
                    fullJsonString += textPart;
                } catch (e) {
                    console.warn("Error parseando fragmento de stream:", line);
                }
            }
        }

        if (!fullJsonString) {
            throw new Error("El agente no devolvió una respuesta válida.");
        }

        // Limpieza final
        const cleanJson = fullJsonString
            .replace(/```json/g, '')
            .replace(/```/g, '')
            .trim();

        return JSON.parse(cleanJson);

    } catch (error) {
        console.error("❌ Error en el servicio:", error);
        throw error; // Re-lanzamos para que lo maneje el Hook
    }
};