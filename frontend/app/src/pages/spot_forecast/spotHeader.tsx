import './style/spotHeader.css';

export default function SpotHeader(props: any) {
    
    // Just capitalizes the first letter of the spot, since they are typically lower case. 
    const capitalizeAfterUnderscore = (str) => {
      if (!str) return ''; // If the input string is empty or undefined, return an empty string
    
      const words = str.split('_'); // Split the string into words using underscores as separators
    
      // Capitalize the first letter of each word and concatenate them
      const capitalizedWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
    
      // Join the capitalized words with spaces
      const capitalizedString = capitalizedWords.join(' ');
    
      return capitalizedString;
    };

    return (
        <div
          className='spot--header'
          style={{
            backgroundImage: `url('/coverPhotos/${props.spot}.png')`
          }}
        >
          <h1>{capitalizeAfterUnderscore(props.spot)}</h1>
        </div>
      );
}
      