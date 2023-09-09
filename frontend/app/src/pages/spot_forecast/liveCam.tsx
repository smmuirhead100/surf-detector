import Stream from "../../components/stream"

export default function LiveCam(props: any) {
    return (
        <div className='flex flex-col p-3'>
            <div className="text-2xl text-gray-600">Live Cam</div>
            <Stream path={props.path} />
      </div>
    )
}