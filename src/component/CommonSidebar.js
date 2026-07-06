

export default function CommonSidebar({ data,clearFunction, title }) {
    return (
       
            <div className="card-header bg-white border-0 pt-4 pb-2 px-4 d-flex justify-content-between align-items-center">
                <h3 className="card-title fs-6 text-secondary text-uppercase fw-bold m-0" style={{ letterSpacing: '0.05em' }}>
                    {title}
                </h3>
                {data.length > 0 && (
                    <button
                        onClick={clearFunction}
                        className="btn btn-link btn-sm text-danger p-0 text-decoration-none fw-semibold"
                    >
                        Clear All
                    </button>
                )}
            </div>

    )
}