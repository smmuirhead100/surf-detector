import sys
import time

# Add path to surfline package
sys.path.append('../../../')

# Import models and surfline package
from surfline.utilities.cam_stream import CamBot

camName = 'malibuclose'

stream = CamBot(camName)
stream.run()

# To stop the the stream, you have to manually X out of the window.