import PySide6.QtWidgets as QtWidgets
import vlc
import time
import os
import numpy as np
import pyautogui
from PIL import Image
import sys
from dotenv import load_dotenv
load_dotenv()
import threading

# Append directories to current path so can access assets folder
sys.path.append('../')

# This function runs the current cam for a given location on your desktop. spotNames are specific to Surfline API.  
# @source https://stackoverflow.com/questions/18308384/vlc-mac-python-binding-no-video-output
# --------------------------------------------------------------------- #

class CamBot:
    def __init__(self, spotName: str):
        self.spotName = spotName
    
    # Runs a live cam on desktop.
    def run(self):
        
        # Premium Surfline Key
        premiumKey = os.environ.get('PREMIUM_KEY')
        
        # Create new instance of vlc and media player.
        Instance = vlc.Instance()
        player = Instance.media_player_new()
        Media = Instance.media_new("https://cams.cdn-surfline.com/cdn-wc/wc-" + self.spotName + "/playlist.m3u8?accessToken=" + premiumKey)
        player.set_media(Media)

        # Need to use widget for vlc to show up properly.
        vlcApp = QtWidgets.QApplication([])
        vlcWidget = QtWidgets.QFrame()
        vlcWidget.resize(700,700)
        vlcWidget.show()
        player.set_nsobject(vlcWidget.winId()) 
        player.play()
        
        # Create a new thread for takeScreenshot and start it
        # screenshot_thread = threading.Thread(target=self.takeScreenshot)
        # screenshot_thread.start()
        
        vlcApp.exec()
        
        # Stop the player and close the widget and application
        player.stop()
        vlcWidget.close()
        vlcApp.quit()
        sys.exit()
    