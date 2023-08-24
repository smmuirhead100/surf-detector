import TideChart from "./tideChart"

export default function TideForecast(props: any) {
    return (
        <TideForecast spot={props.spot} handleTide={props.handleTide} minTimestamp={props.minTimestamp} maxTimestamp={props.maxTimestamp} data={props.tideData} />
    )
}