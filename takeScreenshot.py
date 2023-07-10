import numpy as np
import pyautogui
from PIL import Image

def screenshot():
    # Located starting point
    location = pyautogui.locateOnScreen('./assets/surfCam.png', confidence=.6)
    print(location)
    im1 = pyautogui.screenshot()
    im1.save('my_ss.png')
    
    # Resize image using numpy
    img = Image.open('my_ss.png')
    img.resize((100, 100))
    img.save('my_ss.png')

    return None

screenshot()
