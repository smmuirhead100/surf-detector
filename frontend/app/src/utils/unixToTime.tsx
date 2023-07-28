 // Converts unix time to formatted time: month/day, hour:minute
 export default function unixToTime(unixTime: number) {
    const date = new Date(unixTime * 1000);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    const formattedTime = `${month}/${day} ${hours}:${minutes.substr(-2)}`;
    return formattedTime;
}