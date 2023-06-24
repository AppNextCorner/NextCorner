import * as Location from "expo-location";
import { useEffect } from "react";

export const userLocation = async (setViewLocation, setMapRegion, mapRegion) => {
  let { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== "granted") {
    setErrorMsg("Permission to access location was denied");
    return;
  }

  let location = await Location.getCurrentPositionAsync({
    enableHighAccuracy: true,
  });

  const newRegion = {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    latitudeDelta: 0.0106,
    longitudeDelta: 0.0121,
  };
  const isRegionSignificantlyDifferent =
    Math.abs(mapRegion.latitude - newRegion.latitude) > 0.0001 ||
    Math.abs(mapRegion.longitude - newRegion.longitude) > 0.0001;

  if (isRegionSignificantlyDifferent) {
    setMapRegion(newRegion);
    console.log(
      'new region: ', newRegion,
      'map region: ', mapRegion

    )
  }

  setViewLocation(true);
};
