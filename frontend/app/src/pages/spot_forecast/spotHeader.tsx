import './style/spotHeader.css';
import capitalizeAfterUnderscore from '../../utils/capitalizeAfterUnderscore';

export default function SpotHeader(props: any) {
    return (
        <div className='flex h-28 bg-cover items-center mx-3 rounded-2xl justify-center'style={{ backgroundImage: `url('/coverPhotos/${props.spot}.png')`}}>
          <div className='text-3xl text-white px-5'>{capitalizeAfterUnderscore(props.spot)}</div>
        </div>
      );
}
      