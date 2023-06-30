import * as Location from "expo-location";

// Function to update the user's location on the map
export const userLocation = async (
  setViewLocation,
  setMapRegion,
  mapRegion,
  vendors,
  callback
) => {
  // Request permission to access the user's location
  let { status } = await Location.requestForegroundPermissionsAsync();

  // Check if permission was granted
  if (status !== "granted") {
    setErrorMsg("Permission to access location was denied");
    return;
  }

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
    // Check if the new region is significantly different from the current region
    const isRegionSignificantlyDifferent =
      Math.abs(mapRegion.latitude - newRegion.latitude) > 0.0001 ||
      Math.abs(mapRegion.longitude - newRegion.longitude) > 0.0001;

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
