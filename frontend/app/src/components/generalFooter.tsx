import './style/generalFooter.css'
import { useNavigate } from 'react-router-dom'

export default function GeneralFooter() {
    const navigate = useNavigate()
    
    function handleClick(e) {
        navigate(`/${e.target.innerHTML}`)
    }
    
    return (
        <div className="footer--container">
            <div onClick={handleClick}>About</div>
            <div onClick={handleClick}>Contact</div>
            <div>Contribute</div>
        </div>
    )
}