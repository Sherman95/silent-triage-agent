export const IncidentInput = ({ value, onChange, onAnalyze, loading, error }) => (
    <section className="input-panel glass-panel">
        <div className="panel-header">
            <h2>Input Log</h2>
            <span className="badge">Paste Error Below</span>
        </div>
        <div className="textarea-wrapper">
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="// Pega aquí los logs del error o describe el incidente..."
                spellCheck="false"
            />
        </div>
        <button
            onClick={onAnalyze}
            disabled={loading || !value}
            className={`analyze-btn ${loading ? 'loading' : ''}`}
        >
            {loading ? 'Analizando...' : '⚡ Analizar Incidente'}
        </button>
        {error && <div className="error-banner">{error}</div>}
    </section>
);