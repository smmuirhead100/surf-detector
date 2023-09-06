import './style/contactCard.css'

export default function ContactCard({icon, command, details, contact}) {
    return (
        <div>
        <div className='contact--card--wrapper'>
            <div className='card--content'>
                <img src={icon}/>
                <div className='card--content--bottom'>
                    <div className='contact--comand'>
                        <h1>{command}</h1>
                    </div>
                    <div className='contact--details'>
                        <p>{details}</p>
                    </div>
                    <div className='contact--contact'>
                        <h3>{contact}</h3>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}