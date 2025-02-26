
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const ProjectMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    try {
      // Initialize map
      mapboxgl.accessToken = 'YOUR_MAPBOX_TOKEN';
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [37.9062, 0.0236], // Kenya coordinates
        zoom: 5.5,
      });

      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl(),
        'top-right'
      );

      // Handle map load errors
      map.current.on('error', (e) => {
        console.error('Map error:', e);
        setMapError('Failed to load map. Please check your connection and try again.');
      });

    } catch (error) {
      console.error('Map initialization error:', error);
      setMapError('Failed to initialize map. Please check your connection and try again.');
    }

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, []);

  if (mapError) {
    return (
      <div className="relative w-full h-[500px] rounded-xl overflow-hidden shadow-lg bg-muted flex items-center justify-center">
        <div className="text-center p-6">
          <p className="text-muted-foreground">{mapError}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[500px] rounded-xl overflow-hidden shadow-lg">
      <div ref={mapContainer} className="absolute inset-0" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-background/10" />
    </div>
  );
};

export default ProjectMap;
