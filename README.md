<h1>Open Source Surf Report</h1>
<h2>TODO</h2>
<ul>
    <li>Implement object detection model that can detect how many surfers are in water. :white_check_mark:</li>
    <li>Connect to cloud db (CockroachDB). :white_check_mark:</li>
    <li>Fetch swell and weather data from NOAA and relative databases, given specific location. :white_check_mark:</li>
    <li>Define db methods. :white_check_mark:</li>
    <li>Add NOAA historical buoy data to the db.</li>
    <li>Implement crowd prediction model: Predict crowd based on given conditions. 
        <ol>
            <li>Define data types and tables to be sent to db. :white_check_mark:</li>
            <li>Create new table with defined data types. :white_check_mark:</li>d
            <li>Add relevant data to table (May require running server continously).</li>
            <li>Fetch data from db and train using ML package (Ex. scikit-learn.)</li>
        </ol>
    </li>
    <li>Create visualization of crowd prediction model.</li>
    <li>Configure data collection from bouys other than SCRIPPS.</li>
    <li>Frontend implementation.</li>
</ul>
