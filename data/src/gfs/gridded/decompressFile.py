import xarray as xr
import matplotlib.pyplot as plt
import cartopy.crs as ccrs

# Load the GRIB2 dataset
grib_file_path = "gfswave.t12z.wcoast.0p16.f069.grib2"
ds = xr.open_dataset(grib_file_path, engine="cfgrib")

# Choose a variable to visualize, for example, significant wave height (swh)
swh = ds["swh"]

# Create a map plot using cartopy
plt.figure(figsize=(12, 8))
ax = plt.axes(projection=ccrs.PlateCarree())
swh.plot(ax=ax, transform=ccrs.PlateCarree(), cmap="viridis")

# Add map features
ax.coastlines()
ax.gridlines(draw_labels=True)

plt.title("Significant Wave Height")
plt.show()
