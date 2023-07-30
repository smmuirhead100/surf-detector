import './style/profileHeader.css'
import circle from '../assets/profileCircle.svg'

export default function ProfileHeader() {
    return (
        <div className="profile--header">
            <img src={circle} alt='Profile Circle'/>
            <p>Profile</p>
        </div>
    )
}