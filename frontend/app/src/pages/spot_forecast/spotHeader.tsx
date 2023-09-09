import './style/spotHeader.css';
import capitalizeAfterUnderscore from '../../utils/capitalizeAfterUnderscore';

export default function SpotHeader(props: any) {
    return (
        <div className='mt-5 flex h-28 bg-cover mx-3 rounded-2xl'style={{ backgroundImage: `url('/coverPhotos/${props.spot}.png')`}}>
          <div className='my-2 text-3xl text-white px-5'>{capitalizeAfterUnderscore(props.spot)}</div>
        </div>
      );
}
      