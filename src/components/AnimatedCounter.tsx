import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface AnimatedCounterProps {
  value: number;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ value }) => {
  const scaleValue = useSharedValue(1);
  const colorValue = useSharedValue(0);
  const borderRadius = useSharedValue(60);

  const colors = ['#3B82F6', '#8B5CF6', '#EC4899', '#F97316', '#10B981'];
  const shapes = [20, 60, 40, 80];
  const colorIndex = value % colors.length;
  const shapeIndex = value % shapes.length;

  useEffect(() => {
    scaleValue.value = withTiming(1.25, {
      duration: 220,
      easing: Easing.out(Easing.linear),
    });

    setTimeout(() => {
      scaleValue.value = withTiming(1, {
        duration: 250,
        easing: Easing.out(Easing.linear),
      });
    }, 250);

    colorValue.value = withTiming(colorIndex, {
      duration: 220,
      easing: Easing.out(Easing.linear),
    });

    borderRadius.value = withTiming(shapes[shapeIndex], {
      duration: 220,
      easing: Easing.out(Easing.linear),
    });
  }, [value, colorIndex, shapeIndex, scaleValue, colorValue, borderRadius, shapes]);

  const animatedNumber = useSharedValue(value);
  const numberScale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      colorValue.value,
      [0, 1, 2, 3, 4],
      colors
    );

    return {
      transform: [
        { scale: scaleValue.value },
        { rotateZ: `${Math.sin(scaleValue.value * Math.PI) * 2}deg` },
      ],
      backgroundColor,
      borderRadius: borderRadius.value,
    };
  });

  const numberAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: numberScale.value }],
    };
  });

  useEffect(() => {
    animatedNumber.value = withTiming(value, {
      duration: 650,
      easing: Easing.out(Easing.cubic),
    });

    numberScale.value = withTiming(1.15, {
      duration: 180,
      easing: Easing.out(Easing.quad),
    }, () => {
      numberScale.value = withTiming(1, {
        duration: 260,
        easing: Easing.out(Easing.quad),
      });
    });
  }, [value, numberScale, animatedNumber]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Fetch Count</Text>
      <Animated.View
        style={[
          styles.counterBox,
          animatedStyle,
        ]}
      >
        <Animated.Text
          style={[
            styles.counter,
            numberAnimatedStyle,
            {
              fontSize: 48 + (value > 0 ? 8 : 0),
              color: '#FFFFFF',
            },
          ]}
        >
          {value}
        </Animated.Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#999',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  counterBox: {
    width: 120,
    height: 120,
    backgroundColor: '#1D1B20',
    borderWidth: 2,
    borderColor: '#6750A4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  counter: {
    fontWeight: '800',
    textAlign: 'center',
    color: '#FFFFFF',
  },
});
