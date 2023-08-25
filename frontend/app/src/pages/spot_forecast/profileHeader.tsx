import './style/profileHeader.css'
import circle from '../../assets/profileCircle.svg'
import { useAuth } from "../../context/AuthProvider"

export default function ProfileHeader() {
    const user = useAuth()['user']
    return (
        <div className="profile--header">
            <img src={circle} alt='Profile Circle'/>
            <p>{user.firstName}</p>
        </div>
    )
}