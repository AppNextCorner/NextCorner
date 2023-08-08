import * as Location from "expo-location";

// Function to update the user's location on the map
export const userLocation = async (
  setViewLocation,
  setMapRegion,
  mapRegion,
  vendors,
  callback
) => {


  // Get the user's current location
  let location = await Location.getCurrentPositionAsync({
    enableHighAccuracy: true,
  });

  // Create a new region object with the user's coordinates and deltas
  const newRegion = {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    latitudeDelta: 0.0106,
    longitudeDelta: 0.0121,
  };

  // Check if the mapRegion is already set
  if (mapRegion && mapRegion.latitude) {
    // Calculate the threshold based on deltas
const latitudeThreshold = mapRegion.latitudeDelta * 0.1;
const longitudeThreshold = mapRegion.longitudeDelta * 0.1;

// Check if the new region is significantly different from the current region
const isRegionSignificantlyDifferent =
  Math.abs(mapRegion.latitude - newRegion.latitude) > latitudeThreshold ||
  Math.abs(mapRegion.longitude - newRegion.longitude) > longitudeThreshold;

// If the region is significantly different, update the mapRegion
if (isRegionSignificantlyDifferent) {
  setMapRegion(newRegion);
}
  } else {
    // If the mapRegion is not set, update it with the new region
    setMapRegion(newRegion);
  }


  // Set the viewLocation flag to true
  setViewLocation(true);

  // Invoke the callback function with the new region if provided
  if (callback && typeof callback === "function") {
    callback(newRegion);
  }
  return newRegion
};
