import './style/infoBox.css'

export default function InfoBox(props: any) {
    return (
        <div className="info--box">
            <div className="info--box--title">{props.title}</div>
            <div className="info--box--content">{props.content}</div>
        </div>
    )
}