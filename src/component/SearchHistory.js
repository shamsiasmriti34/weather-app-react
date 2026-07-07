import { MdDeleteForever } from "react-icons/md";
import CommonSidebar from "./CommonSidebar";
export default function SearchHistory({ history, onCitySelect, deleteHistoryItem, clearHistory }) {
    return (
        <div className="card shadow-sm border-0 rounded-4 mt-4 overflow-hidden">
            <CommonSidebar data={history} clearFunction={clearHistory} title="Recent Searches" />

            <div className="card-body p-0">
                {history.length > 0 ? (
                    <ul className="list-group list-group-flush">
                        {history.map((item) => (
                            <HistoryList
                                key={item}
                                item={item}
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

function HistoryList({ item, onCitySelect, onDelete }) {
    return (
        <li className="list-group-item d-flex justify-content-between align-items-center list-group-item-action px-4 py-3">
            <button
                onClick={() => onCitySelect(item)}
                className="btn p-0 border-0 bg-transparent flex-grow-1 text-start"
            >
                <h4 className="h6 mb-0 fw-semibold text-dark">
                    {item}
                </h4>
            </button>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete(item);
                }}
                className="btn btn-sm btn-link text-secondary text-decoration-none p-0 lh-1 fs-5"
                title="Delete from history"
            >
                <MdDeleteForever />
            </button>
        </li>
    );
}