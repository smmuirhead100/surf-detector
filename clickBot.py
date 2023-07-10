import pyautogui

image = './assets/continue.png'
# Locate and double-click on image
def click_image(image):
    try:
        # Get location of image
        location = pyautogui.locateOnScreen(image, confidence=0.9)
        
        # Make sure location was found
        if location is not None:
            print("Image found")
            print(location)
            
            # Center location 
            center = pyautogui.center(location)
            print(center)
            
            # Doouble click on image
            pyautogui.doubleClick(center.x / 2, center.y / 2)
            print("Image clicked")
        else:
            print("Image not found")
    except Exception as e:
        print("Error:", str(e))


