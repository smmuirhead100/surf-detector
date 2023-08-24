export default function capitalizeAfterUnderscore(str) {
    if (!str) return ''; 
    const words = str.split('_');
    const capitalizedWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
    const capitalizedString = capitalizedWords.join(' ');
    return capitalizedString;
  };