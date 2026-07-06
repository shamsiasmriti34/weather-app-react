export default function Loading({ loading }) {
   return (
        <div className="d-flex flex-column align-items-center justify-content-center py-5 my-4">
            <div 
                className="spinner-border text-primary mb-3" 
                role="status" 
                style={{ width: '3rem', height: '3rem', borderWidth: '0.25em' }}
            >
                <span className="visually-hidden">Loading...</span>
            </div>
            <h5 className="text-secondary fs-6 text-uppercase fw-bold tracking-wider m-0">
                Fetching Weather Data
            </h5>
            <p className="text-muted small mb-0">Please wait a moment...</p>
        </div>
    );
}