import { MdDeleteForever } from "react-icons/md";
import { IoHeartSharp } from 'react-icons/io5';


export default function SearchHistory({ history, setHistory, onCitySelect }) {

    // Clear everything
    const clearHistory = () => {
        setHistory([]);
        localStorage.removeItem("weather_history");
    };

    // Delete a single item by its index
    const deleteHistoryItem = (indexToDelete) => {
        const updatedHistory = history.filter((_, index) => index !== indexToDelete);
        setHistory(updatedHistory);
        localStorage.setItem("weather_history", JSON.stringify(updatedHistory));
    };

    return (
        <div className="card shadow-sm border-0 rounded-4 mt-4 overflow-hidden">
            <div className="card-header bg-white border-0 pt-4 pb-2 px-4 d-flex justify-content-between align-items-center">
                <h3 className="card-title fs-6 text-secondary text-uppercase fw-bold m-0" style={{ letterSpacing: '0.05em' }}>
                    Recent Searches
                </h3>
                {history.length > 0 && (
                    <button
                        onClick={clearHistory}
                        className="btn btn-link btn-sm text-danger p-0 text-decoration-none fw-semibold"
                    >
                        Clear All
                    </button>
                )}
            </div>

            <div className="card-body p-0">
                {history.length > 0 ? (
                    <ul className="list-group list-group-flush">
                        {history.map((item, index) => (
                            <HistoryList
                                key={index}
                                item={item}
                                index={index}
                                onCitySelect={onCitySelect}
                                onDelete={deleteHistoryItem}
                            />
                        ))}
                    </ul>
                ) : (
                    <div className="text-muted text-center py-4 fs-7">
                        No recent searches
                    </div>
                )}
            </div>
        </div>
    );
}

function HistoryList({ item, index, onCitySelect, onDelete }) {
    return (
        <li className="list-group-item d-flex justify-content-between align-items-center list-group-item-action px-4 py-3">
            <div
                role="button"
                onClick={() => onCitySelect(item)}
                className="flex-grow-1 text-start"
            >
                <h4 className="h6 mb-0 fw-semibold text-dark">
                    {item}
                </h4>
            </div>

           
            <button
                onClick={(e) => {
                    e.stopPropagation(); 
                    onDelete(index);
                }}
                className="btn btn-sm btn-link text-secondary text-decoration-none p-0 lh-1 fs-5"
                title="Delete from history"
                style={{ width: '24px', height: '24px' }}
            >
                <MdDeleteForever />
            </button>
        </li>
    );
}