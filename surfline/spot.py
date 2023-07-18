# A class to define spots in Surfline's database.

class Spot:
    def __init__(self, commonName: str, spotId: str, camName: str, nearestBuoyId: str):
        self.commonName = commonName        # Ex. 'Huntington Beach'
        self.spotId = spotId                # Ex. '5842041f4e65fad6a7709b9d'
        self.camName = camName              # Ex. 'goldenwest'
        self.nearestBuoyId = nearestBuoyId  # Ex. '46222'