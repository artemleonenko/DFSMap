import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { BottomSheetFlatList, BottomSheetModal } from '@gorhom/bottom-sheet';
import { forwardRef, useCallback, useMemo } from 'react';
import { MarkerData } from '../types/markers.interface';
import Icon from "react-native-vector-icons/MaterialIcons"
import { SharedValue } from 'react-native-reanimated';
import { Text } from 'react-native';

interface MarkerListProps {
  markers: MarkerData[];
	onMarkerPress: (marker: MarkerData) => void;
	animIndex: SharedValue<number>;
	animPosition: SharedValue<number>;
}

export const MarkerListBottomSheet = forwardRef<
  BottomSheetModal,
  MarkerListProps
>(({ markers, onMarkerPress, animIndex, animPosition }, ref) => {
	const snapPoints = useMemo(() => ['40%'], []);
	const sheetStyle = useMemo(
		() => ({
			...styles.sheetContainer,
			...styles.sheetContainerShadow,
			shadowColor: 'black',
		}),
		[]
	);

	const Header = useMemo(() => (
		<View style={[styles.header, {paddingBottom: 8, borderBottomWidth: 0.5}]}>
			<Text style={styles.headerText}>Наши магазины</Text>
		</View>
	), []);

	const renderItem = useCallback(
		({ item }: { item: MarkerData }) => (
			<TouchableOpacity activeOpacity={0.8} onPress={() => onMarkerPress(item)} style={styles.infoContainer}>
				<View style={styles.contentRow}>
					<View style={{ flex: 1 }}>
						<Text style={styles.text_name}>{item.name}</Text>
						<Text style={styles.text_additional}>{item.street}</Text>
						<Text style={styles.text_additional}>{item.is_open}</Text>
					</View>
				<Icon name="arrow-forward-ios" size={16} color="rgba(189, 189, 189, 1)" />
			</View>
			</TouchableOpacity>
		),
		[onMarkerPress]
	);

  return (
		<BottomSheetModal
			ref={ref}
			snapPoints={snapPoints}
			index={0}
			animatedIndex={animIndex}
			animatedPosition={animPosition}
			enablePanDownToClose={false}
			enableDynamicSizing={false}
			handleIndicatorStyle={{backgroundColor: 'rgba(189, 189, 189, 1)', height: 4}}
			style={sheetStyle}
			stackBehavior='switch'
		>
			<BottomSheetFlatList
				data={markers}
				keyExtractor={(item) => item.id.toString()}
				renderItem={renderItem}
				showsVerticalScrollIndicator={false}
				ListHeaderComponent={Header}
			/>
		</BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  infoContainer: {
    flex: 2,
    paddingHorizontal: 8,
    paddingVertical: 12,
    gap: 2,
    borderBottomWidth: 0.5,
    borderColor: 'rgba(189, 189, 189, 1)',
  },
  text_name: {
    fontSize: 16,
  },
  text_additional: {
    color: 'grey',
    fontSize: 12,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
	sheetContainer: {
		backgroundColor: 'white',
		borderTopStartRadius: 24,
		borderTopEndRadius: 24,
	},
	sheetContainerShadow: Platform.select({
		ios: {
			shadowOffset: {
				width: 0,
				height: 12,
			},
			shadowOpacity: 0.75,
			shadowRadius: 16.0,
			shadowColor: 'black',
		},
		android: {
			elevation: 24,
		},
	}) as any,
	header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 8,
    alignItems: 'center',
    borderColor: 'rgba(189, 189, 189, 1)',
  },
  headerText: {
    fontSize: 20,
    fontWeight: '500'
  }
});