export default function convertTime(inputTime) {
    try {
        const [date, time] = inputTime.split(' ');
        const [month, day] = date.split('/');
        console.log(month, day)
        const [hour, minute] = time.split(':');

        const hourInt = parseInt(hour);
        const period = hourInt >= 12 ? 'pm' : 'am';

        const formattedHour = (hourInt % 12 === 0) ? 12 : hourInt % 12;
        const formattedTime = `${formattedHour}:${minute} ${period}`;

        return formattedTime;
    } catch (error) {
        return "Invalid input format";
    }
}