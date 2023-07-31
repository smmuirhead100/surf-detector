export default async function getSpots(){
    console.log('getting spots')
    fetch(`https://goldfish-app-qsewy.ondigitalocean.app/wave?spots`)
      .then(response => response.json())
      .then(data => {
        return data
      })
      .catch(error => console.log(error))
}

