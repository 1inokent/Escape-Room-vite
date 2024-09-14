import leaflet, { LayerGroup, PointTuple } from 'leaflet';
import { DEFAULT_LOCATION_FOR_CONTACTS, PATH_MARKER_CURRENT, PATH_MARKER_DEFAULT } from '../../const';
import { Bookings } from '../../types/booking-types/booking-types';
import { useEffect, useRef } from 'react';
import useMap from '../hook/use-map/use-map';

type MapProps = {
  availableQuests?: Bookings;
  selectedPlaceId?: string;
  onPlaceSelect?: (id: string) => void;
}

const ICON_SIZE: PointTuple = [23, 42];
const ICON_ANCHOR: PointTuple = [23, 42];

function Map({ availableQuests = [], selectedPlaceId, onPlaceSelect }: MapProps):JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(
    mapRef,
    availableQuests.length > 0 ?
      availableQuests[0].location
      : DEFAULT_LOCATION_FOR_CONTACTS
  );
  const markerLayer = useRef<LayerGroup>(leaflet.layerGroup());

  const defaultIcon = leaflet.icon({
    iconUrl: PATH_MARKER_DEFAULT,
    iconSize: ICON_SIZE,
    iconAnchor: ICON_ANCHOR
  });

  const currentIcon = leaflet.icon({
    iconUrl: PATH_MARKER_CURRENT,
    iconSize: ICON_SIZE,
    iconAnchor: ICON_ANCHOR
  });

  useEffect(() => {
    if (map) {
      markerLayer.current.addTo(map);
    }
  }, [map]);

  useEffect(() => {
    if (map && availableQuests.length > 0) {
      markerLayer.current.clearLayers();

      availableQuests.forEach((quest) => {
        const isSelected = quest.id === selectedPlaceId;
        const marker = leaflet
          .marker(
            {
              lat: quest.location.coords[0],
              lng: quest.location.coords[1],
            }, {
              icon: (isSelected) ? currentIcon : defaultIcon
            }
          ).on('click', () => {
            if (onPlaceSelect) {
              onPlaceSelect(quest.id);
            }
          });

        marker.addTo(markerLayer.current);
      });
    } else {
      leaflet
        .marker(
          {
            lat: DEFAULT_LOCATION_FOR_CONTACTS.coords[0],
            lng: DEFAULT_LOCATION_FOR_CONTACTS.coords[1],
          }, {
            icon: currentIcon
          }
        ).addTo(markerLayer.current);
    }
  }, [availableQuests, currentIcon, defaultIcon, map, onPlaceSelect, selectedPlaceId]);

  return (
    <div className="map__container" ref={mapRef}></div>
  );
}

export default Map;
