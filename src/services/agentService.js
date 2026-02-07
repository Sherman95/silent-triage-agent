// src/services/agentService.js

const APP_ID = "ZICVFFRV4E";
const API_KEY = "6f60849e78e18c6029eb231f32439f1f";
const AGENT_URL = "https://zicvffrv4e.algolia.net/agent-studio/1/agents/d1f031c2-ed9d-45cd-8e96-e1e93937e0d6/completions?compatibilityMode=ai-sdk-4";

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