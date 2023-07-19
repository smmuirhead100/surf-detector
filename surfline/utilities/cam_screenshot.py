import subprocess

# This runs the FFmpeg command to take a screenshot of the specified cam. Saves it to currCam.jpg. 

def takeScreenshot(spotName: str):
    savePath = './assets/recentCaptures/' + spotName + '.jpg'
    command = [
    'ffmpeg',
    '-i',
    'https://cams.cdn-surfline.com/cdn-wc/wc-' + spotName + '/playlist.m3u8',
    '-vframes',
    '1',
    '-s',
    '1920x1080',
    '-q:v',
    '2',
    '-y', # Overwrite output file without asking
    savePath
    ]


    try:
        subprocess.run(command, check=True)
        print("FFmpeg command executed successfully!")
    except subprocess.CalledProcessError as e:
        print("An error occurred while executing the FFmpeg command:", e)  
        
    return savePath

takeScreenshot('malibuclose')