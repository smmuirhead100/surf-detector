import './style/spotHeader.css';
import capitalizeAfterUnderscore from '../../utils/capitalizeAfterUnderscore';

export default function SpotHeader(props: any) {
    return (
        <div className='spot--header'style={{ backgroundImage: `url('/coverPhotos/${props.spot}.png')`}}>
          <h1>{capitalizeAfterUnderscore(props.spot)}</h1>
        </div>
      );
}
      