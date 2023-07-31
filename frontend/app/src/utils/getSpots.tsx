async function getSpots(): Promise<any[]> {
  console.log('getting spots');
  return fetch(`https://goldfish-app-qsewy.ondigitalocean.app/spots`)
    .then(response => response.json())
    .catch(error => {
      console.log(error);
      throw error; // Rethrow the error to handle it elsewhere if needed.
    });
}

export default getSpots
