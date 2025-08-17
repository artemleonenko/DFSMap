import { Image, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { forwardRef, useCallback, useMemo } from 'react';
import { MarkerData } from '../types/markers.interface';
import Icon from "react-native-vector-icons/MaterialIcons"
import { SharedValue } from 'react-native-reanimated';
import { Text } from 'react-native';

interface MarkerDetailProps {
  marker: MarkerData | null;
	onClose: () => void;
	animIndex: SharedValue<number>;
	animPosition: SharedValue<number>;
}

export const MarkerDetailBottomSheet = forwardRef<
  BottomSheetModal,
  MarkerDetailProps
>(({ marker, onClose, animIndex, animPosition }, ref) => {
	const snapPoints = useMemo(() => ['30%'], []);
	const sheetStyle = useMemo(
		() => ({
			...styles.sheetContainer,
			...styles.sheetContainerShadow,
			shadowColor: 'black',
		}),
		[]
	);

	const HeaderInfo = useCallback(() => (
		<View style={[styles.header, { justifyContent: 'flex-end' }]}>
			<TouchableOpacity onPress={onClose} activeOpacity={0.8} style={styles.button}>
				<Icon name="close" size={14} color="white" />
			</TouchableOpacity>
		</View>
	), [onClose]);


  return (
		<BottomSheetModal
			ref={ref}
			snapPoints={snapPoints}
			index={0}
			animatedIndex={animIndex}
			animatedPosition={animPosition}
			enableDynamicSizing={false}
			handleIndicatorStyle={{backgroundColor: 'rgba(189, 189, 189, 1)', height: 4}}
			style={sheetStyle}
			stackBehavior='switch'
			footerComponent={HeaderInfo}
		>
			<BottomSheetView style={styles.infoContainerDetail}>
				<View style={styles.contentRowDetail}>
					<Image
					source={{uri: marker?.image}}  
					style={{height: 160, width: 160, borderRadius: 14}}
				/>
					<View style={{ flex: 1, marginLeft: 12, alignContent: 'center' }}>
						<Text style={styles.text_name_detail}>{marker?.name}</Text>
						<Text style={styles.text_additional_detail}>Адрес</Text>
						<Text style={[styles.text_additional_detail, {color: 'black'}]}>{marker?.street}</Text>
						<Text style={styles.text_additional_detail}>Режим работы</Text>
						<Text style={[styles.text_additional_detail, {color: 'black'}]}>{marker?.is_open}</Text>
						<Text style={styles.text_additional_detail}>Телефон</Text>
						<Text style={[styles.text_additional_detail, {color: 'black'}]}>{marker?.phone_number}</Text>
						<Text style={styles.text_additional_detail}>E-mail</Text>
						<Text style={[styles.text_additional_detail, {color: 'black'}]}>{marker?.email}</Text>
					</View>
				</View>
			</BottomSheetView>
		</BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  infoContainerDetail: {
    flex: 2,
    paddingHorizontal: 8,
    paddingVertical: 12,
    gap: 2,
  },
  text_name_detail: {
    fontWeight: 'semibold',
    fontSize: 18,
  },
  text_additional_detail: {
    color: 'grey',
    fontSize: 12,
  },
  contentRowDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
	sheetContainer: {
    backgroundColor: 'white',
    borderTopStartRadius: 24,
    borderTopEndRadius: 24,
  },
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
	button: {
		padding: 4, 
		backgroundColor: 'rgba(189, 189, 189, 1)', 
		borderRadius: 18
	}
});