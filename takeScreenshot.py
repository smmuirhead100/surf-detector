import numpy as np
import pyautogui
from PIL import Image

def screenshot():
    # Located starting point
    location = pyautogui.locateOnScreen('./assets/Cam1.png', grayscale=True, confidence=.7)
    
    if location is not None:
        print("Image found")
        print(location)
        im1 = pyautogui.screenshot()
        crop_area = (location.left, location.top, location.left + location.width, location.top + location.height)
        cropped_img = im1.crop(crop_area)
        cropped_img.save('currSurf.png')
    else:
        print("Image not found")

screenshot()
