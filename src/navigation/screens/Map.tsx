import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import YaMap, { Animation } from 'react-native-yamap';
import { useNavigation } from '@react-navigation/native';
import { useDerivedValue, useSharedValue } from 'react-native-reanimated';
import BackButton from '../../components/BackButton';
import { AllMarker, initialRegion } from '../../components/MarkerData';
import { MarkerData } from '../../types/markers.interface';
import { MarkerListBottomSheet } from '../../components/MarkerListBottomSheet';
import { MarkerDetailBottomSheet } from '../../components/MarkerDetailBottomSheet';
import { RegionInt } from '../../types/region.interface';
import { MapComponent } from '../../components/MapComponent';

export function Map() {
  const mapRef = useRef<YaMap>(null);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const bottomSheetModalRefInfo = useRef<BottomSheetModal>(null);
  
  const markers: MarkerData[] = AllMarker; 
  const initialPoints: RegionInt = initialRegion;

  const navigation = useNavigation();
  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);
  const { height: SCREEN_HEIGHT } = Dimensions.get('window');

  const animatedListIndex = useSharedValue<number>(0);
  const animatedListPosition = useSharedValue<number>(SCREEN_HEIGHT);
  const animatedDetailsIndex = useSharedValue<number>(0);
  const animatedDetailsPosition = useSharedValue<number>(SCREEN_HEIGHT);

  const buttonAnimatedIndex = useDerivedValue(() =>
    animatedListIndex.value > animatedDetailsIndex.value
      ? animatedListPosition.value
      : animatedDetailsIndex.value
  );
  const buttonAnimatedPosition = useDerivedValue(() =>
    animatedListPosition.value < animatedDetailsPosition.value
      ? animatedListPosition.value
      : animatedDetailsPosition.value
  );

  useEffect(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const zoomToPoint = useCallback((marker: MarkerData) => {
    if (mapRef.current) {
      mapRef.current.setCenter(
        { lat: marker.lat, lon: marker.lon },
        marker.zoom, 
        0,
        0, 
        0.5, 
        Animation.SMOOTH
      );
    }
    setSelectedMarker(marker);
    bottomSheetModalRefInfo.current?.present();
  }, []);

  const zoomToInitial = useCallback((lat: number, lon: number, zoom: number) => {
    if (mapRef.current) {
      mapRef.current.setCenter({ lat, lon }, zoom, 0, 0, 0.5, Animation.SMOOTH); 
    }
  }, []);

  const zoomBack = useCallback(() => {
    zoomToInitial(initialPoints.lat, initialPoints.lon, 11.5);
    bottomSheetModalRefInfo.current?.dismiss();
  }, []);

  return (
    <View style={styles.container}>
        <MapComponent 
          ref={mapRef}
          markers={markers}
          initialRegion={initialPoints}
          onLoadInitial={zoomToInitial}
          onMarkerPress={zoomToPoint}
        />
        <BackButton
          animatedIndex={buttonAnimatedIndex}
          animatedPosition={buttonAnimatedPosition}
          onPress={() => navigation.goBack()}
        />
        <MarkerListBottomSheet 
          markers={markers} 
          onMarkerPress={zoomToPoint} 
          ref={bottomSheetModalRef} 
          animIndex={animatedListIndex} 
          animPosition={animatedListPosition} 
        />
        <MarkerDetailBottomSheet
          marker={selectedMarker}
          onClose={zoomBack}
          ref={bottomSheetModalRefInfo}
          animIndex={animatedDetailsIndex}
          animPosition={animatedDetailsPosition}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
