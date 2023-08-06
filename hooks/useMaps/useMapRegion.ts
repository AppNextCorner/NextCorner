// useMapRegion.ts
import { useState, useRef, useCallback } from "react";
import { mapRegion } from "../../typeDefinitions/interfaces/mapRegion.interface";

export const useMapRegion = (): [mapRegion, (region: mapRegion) => void] => {
  const mapRegionRef = useRef<mapRegion>({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0,
  });

  const setMapRegion = useCallback((region: mapRegion) => {
    mapRegionRef.current = region;
  }, []);

  return [mapRegionRef.current, setMapRegion];
};
