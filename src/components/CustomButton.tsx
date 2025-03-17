import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type Props = {
  title: string;
  onPress: () => void;
};

import { LinearGradient } from 'expo-linear-gradient';

const CustomButton = ({ title, onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress} activeOpacity={0.8}>
      <LinearGradient
        colors={['#9C2CF3', '#FF6B00']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientButton}
      >
        <Text style={styles.buttonText}>{title}</Text>
        <Text style={styles.arrowIcon}>→</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    buttonContainer: {
      marginBottom: 32,
      borderRadius: 30,
      overflow: 'hidden',
      width: '80%', // Button width to 80% of the screen
      maxWidth: 400, // Maximum button width
    },
    gradientButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 18, // Slightly larger padding
      paddingHorizontal: 24,
      borderRadius: 30,
    },
    buttonText: {
      color: '#fff',
      fontSize: 20, // Slightly larger font size
      fontWeight: '600',
      marginRight: 10, // Increased margin
      textAlign: 'center',
    },
    arrowIcon: {
      color: '#fff',
      fontSize: 20, // Slightly larger font size
      fontWeight: '600',
    },
  });

export default CustomButton;
