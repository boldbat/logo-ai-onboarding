import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions, Image, ImageSourcePropType } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  Easing,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

type Props = {
  logos: ImageSourcePropType[];
};

const AnimatedLogoFlow = ({ logos }: Props) => {
    // Create animated values for each logo
    const animatedValues = logos.map(() => ({
        x: useSharedValue(Math.random() * width),
        y: useSharedValue(Math.random() * height),
        opacity: useSharedValue(0),
        scale: useSharedValue(0.5 + Math.random() * 0.5), // Varying scales
        rotation: useSharedValue(Math.random() * 360)
    }));

    useEffect(() => {
        animatedValues.forEach((values, index) => {
            // Fade in
            values.opacity.value = withTiming(0.7 + Math.random()*0.3, { duration: 1000 + Math.random() * 1000 });

            // Continuous random movement
            values.x.value = withRepeat(withTiming(Math.random() * width, { duration: 5000 + Math.random() * 5000, easing: Easing.linear }), -1, true);
            values.y.value = withRepeat(withTiming(Math.random() * height, { duration: 5000 + Math.random() * 5000, easing: Easing.linear }), -1, true);
            values.rotation.value = withRepeat(withTiming(Math.random() * 360, {duration: 10000 + Math.random() * 5000, easing: Easing.linear}), -1, false);
        });
    }, []);

  return (
    <View style={styles.container}>
      {animatedValues.map((values, index) => {
        const animatedStyle = useAnimatedStyle(() => {
          return {
            transform: [
              { translateX: values.x.value },
              { translateY: values.y.value },
              { scale: values.scale.value },
              { rotate: `${values.rotation.value}deg` }
            ],
            opacity: values.opacity.value,
          };
        });

        return (
          <Animated.Image
            key={index}
            source={logos[index % logos.length]}
            style={[styles.logo, animatedStyle]}
            resizeMode="contain"
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1, // Ensure it's behind other content
  },
  logo: {
    position: 'absolute',
    width: width * 0.2, // Adjust size as needed
    height: width * 0.2,
  },
});

export default AnimatedLogoFlow;
