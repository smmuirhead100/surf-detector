import subprocess

def capture_video_segment(spotName: str, duration: int = 30):
    savePath = f'./assets/recentCaptures/{spotName}_{duration}s.mp4'
    
    command = [
        'ffmpeg',
        '-i',
        f'https://cams.cdn-surfline.com/cdn-wc/wc-{spotName}/playlist.m3u8',
        '-t',
        str(duration),  # Duration of the segment in seconds
        '-c:v',
        'copy',  # Copy video codec, no re-encoding
        '-y',  # Overwrite output file without asking
        savePath
    ]

    try:
        subprocess.run(command, check=True)
        print("FFmpeg command executed successfully!")
    except subprocess.CalledProcessError as e:
        print("An error occurred while executing the FFmpeg command:", e)

    return savePath
