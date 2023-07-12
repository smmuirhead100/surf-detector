<h1>Mock Surfline</h1>

<h2>High Level Goals</h2>
<h3>These are broad goals that need to be broken down into more parts themselves</h3>

<ul>
    <li>Train object detection model to predict crowd size based on live surf cams. :white_check_mark:</li>
    <li>Fetch relevant swell and weather data from various APIs (NOAA, etc.). :white_check_mark:</li>
    <li>Create bot that automatically captures this data on a schedule.
    :white_check_mark:</li>
    <li>Add data the bot has gathered to a database. (MongoDB)</li>
    <li>Make it so you don't need to have surf cam open on desktop for the bots to work</li>
    <li>Deploy the bot using some service (AWS, Azure, etc.). Data will be automatically added to databases.</li>
    <li>Train surf prediction models:
        <ul>
            <li>Model that predicts conditions based on swell and weather input.</li>
            <li>Model that predicts crowd size based on conditions, day of the week, etc.</li>
        </ul>
    </li>
    <li>Visualize Models (Ex. Average crowd graph for each day at particular spot).</li>
    <li>Build front end.</li>