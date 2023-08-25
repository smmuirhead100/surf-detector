import Stream from "../../components/stream"

export default function LiveCam(props: any) {
    return (
        <div className='tide--forecast'>
            <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#A8A6A7', marginBottom: '1rem'}}>Live Cam</div>
            <Stream path={props.path} />
      </div>
    )
}