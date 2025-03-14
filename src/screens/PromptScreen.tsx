import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions, StatusBar } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import TextTyping from '../components/TextTyping';
import CustomButton from '../components/CustomButton';

type PromptScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Prompt'>;

type Props = {
  navigation: PromptScreenNavigationProp;
};

const PromptScreen = ({ navigation }: Props) => {
  const promptText = "Create a Burger Restaurant logo with the brand name Goku";
  const fadeIn = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeIn, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const handleNext = () => {
    Animated.parallel([
      Animated.timing(fadeIn, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: -30,
        duration: 400,
        useNativeDriver: true,
      })
    ]).start(() => {
      navigation.navigate('Benefits');
    });
  };

  const logoGrid = Array(6).fill(null);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {/* Background with logo grid */}
      <View style={styles.logoGrid}>
        {logoGrid.map((_, index) => (
          <View key={index} style={styles.logoItem}>
            {/* You would replace this with actual sample logos */}
            <View style={[styles.dummyLogo, {
              backgroundColor: index % 2 === 0 ? '#111' : '#222',
              opacity: 0.7 + (Math.random() * 0.3)
            }]} />
          </View>
        ))}
      </View>
      <Animated.View
        style={[
          styles.contentContainer,
          {
            opacity: fadeIn,
            transform: [{ translateY }]
          }
        ]}
      >
        <TextTyping
          text={promptText}
          textStyle={styles.promptText}
          speed={50}
        />
        <View style={styles.buttonContainer}>
          <CustomButton
            title="Next"
            onPress={handleNext}
          />
        </View>
      </Animated.View>
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'flex-start', // Align items at the top
    alignItems: 'center',
  },
  logoGrid: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: '50%', // Adjust to keep logos in the top half
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 5,
  },
  logoItem: {
    width: width / 3 - 10,
    height: width / 4 - 10,
    padding: 5,
  },
  dummyLogo: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center', // Center content vertically
    alignItems: 'center',
    padding: 20,
    marginTop: height / 3, // Push content down
  },
   promptText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 50,
    lineHeight: 46,
    paddingHorizontal: 20, // Add horizontal padding
  },
  buttonContainer: {
    marginBottom: 32,
    borderRadius: 30,
    overflow: 'hidden',
    width: '80%', // Button width to 80% of the screen
    maxWidth: 400, // Maximum button width
  },
});

export default PromptScreen;
