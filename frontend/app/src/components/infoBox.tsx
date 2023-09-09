import './style/infoBox.css'

export default function InfoBox(props: any) {
    return (
        <div className="flex flex-col justify-center items-center border-solid border-2 border-gray-300 p-3 h-20 m-4 w-40 rounded-lg">
            <div className="-translate-y-10 -translate-x-8 px-1 absolute bg-white text-gray-400">{props.title}</div>
            <div className="">{props.content}</div>
        </div>
    )
}