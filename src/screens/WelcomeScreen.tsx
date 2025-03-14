import React, { useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Linking, 
  Animated, 
  Dimensions, 
  StatusBar 
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { LinearGradient } from 'expo-linear-gradient';

type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

type Props = {
  navigation: WelcomeScreenNavigationProp;
};

const { width, height } = Dimensions.get('window');

const WelcomeScreen = ({ navigation }: Props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
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

  const handleGetStarted = () => {
    navigation.navigate('Prompt');
  };

  const openTerms = () => {
    Linking.openURL('https://www.oyu-intelligence.com');
  };

  const openPrivacy = () => {
    Linking.openURL('https://www.oyu-intelligence.com/privacy');
  };

  // Sample logos for the background grid
  const logoGrid = Array(8).fill(null);

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
      
      {/* Bottom content with welcome text and button */}
      <Animated.View 
        style={[
          styles.bottomContent,
          {
            opacity: fadeAnim,
            transform: [{ translateY }]
          }
        ]}
      >
        <Text style={styles.welcomeText}>Welcome to Oyu</Text>
        <Text style={styles.subtitleText}>
          With the power of Oyu AI, craft logos that captivate.
        </Text>
        
        <TouchableOpacity 
          style={styles.buttonContainer} 
          onPress={handleGetStarted}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#9C2CF3', '#FF6B00']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientButton}
          >
            <Text style={styles.buttonText}>Get Started</Text>
            <Text style={styles.arrowIcon}>→</Text>
          </LinearGradient>
        </TouchableOpacity>
        
        <View style={styles.footerLinks}>
          <TouchableOpacity onPress={openTerms}>
            <Text style={styles.linkText}>Terms of Use</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={openPrivacy}>
            <Text style={styles.linkText}>Privacy Policy</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
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
  bottomContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    paddingBottom: 40,
    backgroundColor: 'rgba(0,0,0,0.6)', // Slightly darker background
    alignItems: 'center', // Center content horizontally
  },
  welcomeText: {
    fontSize: 36, // Slightly larger font size
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12, // Increased margin
    textAlign: 'center', // Center text
  },
  subtitleText: {
    fontSize: 18, // Slightly larger font size
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 40, // Increased margin
    textAlign: 'center', // Center text
    paddingHorizontal: 20, // Add horizontal padding for narrower text on wide screens
  },
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
  footerLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 30, // Increased gap
    marginBottom: 20, // Add margin bottom for footer links
  },
  linkText: {
    color: 'rgba(255,255,255,0.7)', // Slightly brighter link color
    fontSize: 15, // Slightly larger font size
    textDecorationLine: 'underline',
  }
});

export default WelcomeScreen;
