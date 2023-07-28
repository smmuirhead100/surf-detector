import './style/spotForecast.css'
import SwellChart from './swellChart'
import GeneralNavbar from './generalNavbar'
import TideChart from './tideChart'

export default function SpotForecast(props: any) {
    return (
        <div className="spot--forecast--wrapper">
            <GeneralNavbar />
            <div className="spot--forecast--content">
               
                <div className='spot--forecast--chart--wrapper'>
                    <h3>Wave Height</h3>
                    <div className='spot--forecast--chart'>
                        <SwellChart spot={props.spot}/>
                    </div>
                </div>

                <div className='spot--forecast--chart--wrapper'>
                    <h3>Tide</h3>
                    <div className='spot--forecast--chart'>
                        <TideChart spot={props.spot} />
                    </div>
                </div>
            </div>
        </div>
    )
}