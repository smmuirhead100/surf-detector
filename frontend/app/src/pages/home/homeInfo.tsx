import './style/homeInfo.css'
import dashboard from '../../assets/dashboardExample.png'
import bullet from '../../assets/blueBullet.svg'

export default function HomeInfo(){

    return (
        <div className="flex flex-col">
            <div className="flex items-center gap-3">
                <div className="">
                    <div className="flex gap-1 hover:animate-ping">
                        <img className="" src={bullet} />
                        <div>Wave Conditions</div>
                    </div>
                    <p>Get live surf conditions and forecasts updated hourly. Height, wind, and tide data.</p>
                </div>
                <div>
                    <h3><img src={bullet} />New Spots</h3>
                    <p>Request new spots to include and have them added in less than 24 hours!</p>
                </div>
            </div>
            <img src={dashboard} />
            <div className='flex items-center'>
                    <div>
                        <h3><img src={bullet} />Current Crowd</h3>
                        <p>Crowd prediction available at specific spots during Beta. </p>
                    </div>
                    <div>
                        <h3><img src={bullet} />AI Forecast</h3>
                        <p>If you're the tech type, there's also an AI surf reporter.</p>
                    </div>
            </div>
            </div>
    )
}