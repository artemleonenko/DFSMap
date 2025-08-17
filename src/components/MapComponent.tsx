import { forwardRef } from 'react';
import { MarkerData } from '../types/markers.interface';
import YaMap, { Marker } from 'react-native-yamap';
import { RegionInt } from '../types/region.interface';

interface MapComponentProps {
	initialRegion: RegionInt;
  markers: MarkerData[];
	onLoadInitial: (lat: number, lon: number, zoom: number) => void;
	onMarkerPress: (marker: MarkerData) => void;
}

export const MapComponent = forwardRef<
  YaMap,
  MapComponentProps
>(({ initialRegion, markers, onLoadInitial, onMarkerPress }, ref) => {

  return (
		<YaMap
			ref={ref}
			initialRegion={{
				lat: initialRegion.lat,
				lon: initialRegion.lon,
				zoom: initialRegion.zoom,
				azimuth: initialRegion.azimuth,
				tilt: initialRegion.tilt
			}}
			style={{ flex: 1, zIndex: 0 }}
			onMapLoaded={() => onLoadInitial(initialRegion.lat, initialRegion.lon, 11.5)}
		>
			{markers.map(marker => (
				<Marker
					key={marker.id}
					point={{ lat: marker.lat, lon: marker.lon }}
					scale={1}
					source={marker.icon}
					anchor={marker.anchor}
					onPress={() => onMarkerPress(marker)}
				/>
			))}
		</YaMap>
  );
});