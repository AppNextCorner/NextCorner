import * as Location from "expo-location";
import { location } from "../../typeDefinitions/interfaces/location.interface";

// Function to update the user's location on the map
export const userLocation = async (vendorLocation: location, callback) => {
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

  // Check if the vendorLocation is already set
  if (vendorLocation && vendorLocation.latitude) {
    // Calculate the threshold based on deltas
    const latitudeThreshold = vendorLocation.latitudeDelta as number * 0.1;
    const longitudeThreshold = vendorLocation.longitudeDelta as number * 0.1;

    // Check if the new region is significantly different from the current region
    const isRegionSignificantlyDifferent =
      Math.abs(vendorLocation.latitude as number - newRegion.latitude) > latitudeThreshold ||
      Math.abs(vendorLocation.longitude as number - newRegion.longitude) > longitudeThreshold;

    // If the region is significantly different, update the vendorLocation
    if (isRegionSignificantlyDifferent) {
      return newRegion;
    }
  } else {
    // If the vendorLocation is not set, update it with the new region
    return vendorLocation;
  }
};
