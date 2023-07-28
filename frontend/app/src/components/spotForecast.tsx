import './style/spotForecast.css'
import SwellChart from './swellChart'
import GeneralNavbar from './generalNavbar'

export default function SpotForecast(props: any) {
    return (
        <div className="spot--forecast--wrapper">
            <GeneralNavbar />
            <div className="spot--forecast--content">
                <div className='spot--forecast--swell--chart--wrapper'>
                    <h3>Wave Height</h3>
                    <div className='spot--forecast--swell--chart'>
                        <SwellChart spot={props.spot}/>
                    </div>
                </div>
            </div>
        </div>
    )
}