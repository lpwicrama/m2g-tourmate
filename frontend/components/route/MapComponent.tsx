'use client';

import { MapContainer, TileLayer, Marker, Polyline, Popup, Circle, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Location, RoutePoint } from '@/types';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapComponentProps {
  waypoints: RoutePoint[];
  setWaypoints: (waypoints: RoutePoint[]) => void;
  locations: Location[];
  radius: number;
}

function MapClickHandler({ onMapClick }: { onMapClick: (e: any) => void }) {
  useMapEvents({
    click: onMapClick,
  });
  return null;
}

export default function MapComponent({ waypoints, setWaypoints, locations, radius }: MapComponentProps) {
  const center: [number, number] = [7.8731, 80.7718];

  const handleMapClick = (e: any) => {
    const newPoint: RoutePoint = {
      lat: e.latlng.lat,
      lng: e.latlng.lng,
    };
    setWaypoints([...waypoints, newPoint]);
  };

  return (
    <MapContainer
      center={center}
      zoom={8}
      style={{ height: '600px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      
      <MapClickHandler onMapClick={handleMapClick} />
      
      {waypoints.map((point, idx) => (
        <Marker key={idx} position={[point.lat, point.lng]}>
          <Popup>Waypoint {idx + 1}</Popup>
        </Marker>
      ))}
      
      {waypoints.length > 1 && (
        <Polyline
          positions={waypoints.map(p => [p.lat, p.lng])}
          color="blue"
          weight={3}
        />
      )}
      
      {waypoints.map((point, idx) => (
        <Circle
          key={`circle-${idx}`}
          center={[point.lat, point.lng]}
          radius={radius * 1000}
          fillColor="blue"
          fillOpacity={0.1}
          color="blue"
          weight={1}
        />
      ))}
      
      {locations.map((location) => (
        <Marker
          key={location._id}
          position={[
            location.coordinates.coordinates[1],
            location.coordinates.coordinates[0],
          ]}
        >
          <Popup>
            <div>
              <h3 className="font-bold">{location.name}</h3>
              <p className="text-sm">{location.category}</p>
              <p className="text-sm">Rating: {location.rating} ⭐</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
