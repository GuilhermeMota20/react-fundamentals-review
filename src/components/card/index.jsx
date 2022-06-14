import './style.scss';

export default function Card({name, time}) {
    return(
        <div className='card'>
            <strong>{name}</strong>
            <small>{time}</small>
        </div>
    )
}