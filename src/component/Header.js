import myLogo from '../assets/logo.png';
import { MdLocationPin } from "react-icons/md";

export default function Header({cityName}) {
    return (
        <div className="row text-center">
            <div className="card main-card">
                <div className="card-body">
                    <div className="d-flex justify-content-center align-items-center mb-3">
                        <img
                            src={myLogo}
                            alt="Company Logo"
                            className="logo-img me-2" 
                            style={{ width: '40px', height: 'auto' }} 
                        />
                        
                        <h3 className="card-title mb-0">Weather Now</h3>
                    </div>
                    <p><MdLocationPin /> {cityName}</p>
                </div>
            </div>
        </div>
    )
}