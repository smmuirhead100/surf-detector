import numpy as np
import pyautogui
from PIL import Image

def screenshot():
    im1 = pyautogui.screenshot()
    im1.save('my_ss.png')
    # Crop image
    im = Image.open('my_ss.png')

    im2= im.crop((1450, 700, 3200, 1600))

    im2.save('cropped.png')

    return None
