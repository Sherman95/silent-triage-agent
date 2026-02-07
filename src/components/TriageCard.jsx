export const TriageCard = ({ result }) => {
    if (!result) return null;

    const getSeverityConfig = (sev) => {
        const s = sev ? sev.toUpperCase() : '';
        if (s.includes('P0')) return { color: '#ef4444', glow: 'rgba(239, 68, 68, 0.5)' };
        if (s.includes('P1')) return { color: '#f97316', glow: 'rgba(249, 115, 22, 0.5)' };
        if (s.includes('P2')) return { color: '#eab308', glow: 'rgba(234, 179, 8, 0.5)' };
        if (s.includes('P3')) return { color: '#22c55e', glow: 'rgba(34, 197, 94, 0.5)' };
        return { color: '#64748b', glow: 'rgba(100, 116, 139, 0.5)' };
    };

    const config = getSeverityConfig(result.severity);

    return (
        <div
            className="triage-card"
            style={{ '--sev-color': config.color, '--sev-glow': config.glow }}
        >
            <div className="card-header">
                <span className="card-title">Diagnóstico de IA</span>
                <div className="severity-pill" style={{ backgroundColor: config.color }}>
                    {result.severity}
                </div>
            </div>

            <div className="card-body">
                <div className="action-box">
                    <h3>⚡ Acción Recomendada</h3>
                    <p className="highlight-text">{result.recommended_action}</p>
                </div>

                <div className="details-grid">
                    <div className="detail-item">
                        <h4>🧐 Causa Probable</h4>
                        <p>{result.probable_cause}</p>
                    </div>
                    <div className="detail-stat">
                        <h4>Confianza</h4>
                        <div className="confidence-meter">
                            <div className="meter-fill" style={{ width: `${result.confidence_score}%`, backgroundColor: config.color }}></div>
                        </div>
                        <span className="stat-value">{result.confidence_score}%</span>
                    </div>
                </div>

                {result.related_incident_ids && (
                    <div className="related-box">
                        <small>📚 Basado en incidente previo: <strong>{Array.isArray(result.related_incident_ids) ? result.related_incident_ids.join(', ') : result.related_incident_ids}</strong></small>
                    </div>
                )}
            </div>
        </div>
    );
};