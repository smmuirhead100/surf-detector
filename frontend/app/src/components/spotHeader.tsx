import './style/spotHeader.css';

export default function SpotHeader(props: any) {
    
    // Just capitalizes the first letter of the spot, since they are typically lower case. 
    const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
    };

    return (
        <div className='spot--header'>
        <h1>{capitalizeFirstLetter(props.spot)}</h1>
        </div>
    );
}