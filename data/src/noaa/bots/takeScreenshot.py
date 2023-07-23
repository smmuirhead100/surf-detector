import numpy as np
import pyautogui
from PIL import Image

# Screenshots the current surfcam and saves it under assets/currSurf.png
def screenshot():
    
    # Located starting point. In this case, pyautogui locates an image that looks like a surf cam on the desktop.
    location = pyautogui.locateOnScreen('./assets/Cam1.png', grayscale=True, confidence=.4)
    
    # Make sure the image was found. If so, take the creenshot and save it. 
    if location is not None:
        print("Image found")
        print(location)
        im1 = pyautogui.screenshot()
        crop_area = (location.left, location.top, location.left + location.width, location.top + location.height)
        cropped_img = im1.crop(crop_area)
        cropped_img.save('../assets/currSurf.png')
    else:
        print("Image not found")
