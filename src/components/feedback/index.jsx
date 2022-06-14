import './style.scss'

export default function Feedback(props) {
    return(
        <div className="feedback">
            <span>{props.message}</span>
        </div>
    )
}