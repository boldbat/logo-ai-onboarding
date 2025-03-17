import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, StatusBar } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import TextTyping from '../components/TextTyping';
import CustomButton from '../components/CustomButton';
import AnimatedLogoFlow from '../components/AnimatedLogoFlow'; // Import the new component
import PageIndicator from '../components/PageIndicator';

type PromptScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Prompt'>;

type Props = {
  navigation: PromptScreenNavigationProp;
};

const { width, height } = Dimensions.get('window');

const PromptScreen = ({ navigation }: Props) => {
  const promptText = "Create a Burger Restaurant logo with the brand name Goku";
  const fadeIn = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(30)).current;
    const [typingDone, setTypingDone] = React.useState(false);

    const logoPaths = [
        require('../../assets/logo01.png'),
        require('../../assets/Logo02.png'),
        require('../../assets/Logo03.png'),
        require('../../assets/logo04.png'),
        require('../../assets/logo05.png'),
        require('../../assets/logo06.png'),
        require('../../assets/logo07.png'),
        require('../../assets/logo08.png'),
        require('../../assets/logo09.png'),
    ];

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
      navigation.navigate('Benefits');
  };

    const onTypingComplete = () => {
        setTypingDone(true);
    }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

       {typingDone && <AnimatedLogoFlow logos={logoPaths} />}

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
                    onComplete={onTypingComplete}
        />
        <View style={styles.buttonContainer}>
          <CustomButton
            title="Next"
            onPress={handleNext}
          />
        </View>
        <PageIndicator numPages={4} currentPage={1} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: height / 4, // Adjust positioning as needed
  },
  promptText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 50,
    lineHeight: 46,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    marginBottom: 32,
    borderRadius: 30,
    overflow: 'hidden',
    width: '80%',
    maxWidth: 400,
  },
});

export default PromptScreen;
