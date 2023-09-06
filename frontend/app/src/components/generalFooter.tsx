import './style/generalFooter.css'
import { useNavigate } from 'react-router-dom'

export default function GeneralFooter() {
    const navigate = useNavigate()
    
    function handleClick(e) {
        navigate(`/${e.target.innerHTML}`)
    }

    function handleContributeClick() {
        window.location.href = 'https://github.com/smmuirhead100/surf-detector';
    }
    
    return (
        <div className="footer--container">
            <div onClick={handleClick}>About</div>
            <div onClick={handleClick}>Contact</div>
            <div onClick={handleContributeClick}>Contribute</div>
        </div>
    )
}