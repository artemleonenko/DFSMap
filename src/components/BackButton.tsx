import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Animated, { SharedValue, useAnimatedStyle } from 'react-native-reanimated';

interface BackButtonProps {
  animatedIndex: SharedValue<number>;    
  animatedPosition: SharedValue<number>;    
  onPress: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({
  animatedPosition,
  onPress,
}) => {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: animatedPosition.value - 48, 
      },
    ],
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.button}
        onPress={onPress}
      >
        <Icon name="arrow-back" size={20} color="black" />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 8,
    zIndex: 30,
  },
  button: {
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default BackButton;
