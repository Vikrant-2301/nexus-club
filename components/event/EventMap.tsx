'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom marker icon with indigo color
const customIcon = new L.DivIcon({
  html: `
    <div style="
      width: 36px;
      height: 36px;
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      border: 3px solid white;
      box-shadow: 0 4px 20px rgba(99,102,241,0.6);
    ">
      <div style="
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        transform: rotate(45deg);
        font-size: 14px;
      ">📍</div>
    </div>
  `,
  className: '',
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -40],
});

interface EventMapProps {
  lat: number;
  lng: number;
  address: string;
}

export default function EventMap({ lat, lng, address }: EventMapProps) {
  return (
    <div className="h-64 sm:h-80 w-full">
      <MapContainer
        center={[lat, lng]}
        zoom={15}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]} icon={customIcon}>
          <Popup>
            <div style={{ fontFamily: 'var(--font-inter)', padding: '4px' }}>
              <p style={{ fontWeight: 700, color: '#fff', margin: '0 0 4px', fontSize: '13px' }}>
                📍 Event Venue
              </p>
              <p style={{ color: 'rgba(255,255,255,0.65)', margin: 0, fontSize: '12px', lineHeight: '1.5' }}>
                {address}
              </p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
