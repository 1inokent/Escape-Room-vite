import { MutableRefObject, useEffect, useRef, useState } from 'react';
import leaflet from 'leaflet';
import { Location } from '../../../types/booking-types/booking-types';

function UseMap(mapRef: MutableRefObject<HTMLElement | null>, location: Location) {
  const [map, setMap] = useState<leaflet.Map | null>(null);
  const isRenderRef = useRef<boolean>(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderRef.current) {
      const instance = leaflet.map(mapRef.current, {
        center: {
          lat: location.Coords[0],
          lng: location.Coords[1],
        },
        zoom: 10
      });

      leaflet
        .tileLayer(
          'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
          {
            attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          }
        )
        .addTo(instance);

      setMap(instance);
      isRenderRef.current = true;
    }
  }, [location, mapRef]);

  return map;
}

export default UseMap;
