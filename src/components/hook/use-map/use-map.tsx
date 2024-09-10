import { MutableRefObject, useEffect, useRef, useState } from 'react';
import leaflet from 'leaflet';

function UseMap(mapRef: MutableRefObject<HTMLElement | null>, city) {
  const [map, setMap] = useState<leaflet.Map | null>(null);
  const isRenderRef = useRef<boolean>(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderRef.current) {
      const instance = leaflet.map(mapRef.current, {
        center: {
          lat: city.loaction.coords
        }
      });
    }
  }, []);
}
