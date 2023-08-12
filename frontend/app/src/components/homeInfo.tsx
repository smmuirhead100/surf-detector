import './style/homeInfo.css'
import dashboard from '../assets/dashboardExample.png'

export default function HomeInfo(){
    
    return (
        <div className="home--info--container">
            <div className="info1">
                <div>
                    <h3>Wave Conditions</h3>
                    <p>Get live surf conditions and forecasts updated hourly. Height, wind, and tide data.</p>
                </div>
                <div>
                    <h3>New Spots</h3>
                    <p>Request new spots to include and have them added in less than 24 hours!</p>
                </div>
            </div>
            <img src={dashboard} />
            <div className='info1'>
                    <div>
                        <h3>Current Crowd</h3>
                        <p>Crowd prediction available at specific spots during Beta. </p>
                    </div>
                    <div>
                        <h3>AI Forecast</h3>
                        <p>If you're the tech type, there's also an AI surf reporter.</p>
                    </div>
            </div>
            </div>
    )
}