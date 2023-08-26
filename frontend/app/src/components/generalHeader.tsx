import './style/generalHeader.css'
import { useNavigate } from 'react-router-dom'
import {ArrowLeft} from 'react-bootstrap-icons'

export default function GeneralHeader(props) {
    const navigate = useNavigate()
    
    return (
        <div className="header--container">
            <div className="back-button-container" onClick={() => navigate(-1)}>
                <ArrowLeft size={15}/>
                <div className="back--button">Back</div>
            </div>
            <div className='header--name'>{props.name}</div>
        </div>
    )
}