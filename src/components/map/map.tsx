import leaflet, { PointTuple } from 'leaflet';
import { PATH_MARKER_CURRENT, PATH_MARKER_DEFAULT } from '../../const';

type MapProps = {
  
}

const ICON_SIZE: PointTuple = [23, 42];
const ICON_ANCHOR: PointTuple = [23, 42];

function Map():JSX.Element {
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
}

export default Map;
