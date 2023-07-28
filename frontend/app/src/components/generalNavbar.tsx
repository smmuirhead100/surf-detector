import './style/generalNavbar.css'
import logo from '../assets/logo.svg'

export default function GeneralNavbar() {
    return (
        <div className="navbar--wrapper">
            <div className="navbar--logo">
                <img src={logo} alt="logo" />
            </div>
            <ul className="navbar--list">
                <li>Spots</li>
                <li>Cams</li>
                <li>About</li>
                <li>Contact</li>
                <li>Contribute</li>
            </ul>
        </div>
    )
}