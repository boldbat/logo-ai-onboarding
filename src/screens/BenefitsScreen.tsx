import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated, Dimensions } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import CustomButton from '../components/CustomButton';

type BenefitsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Benefits'>;

type Props = {
  navigation: BenefitsScreenNavigationProp;
};

const { width } = Dimensions.get('window');

const benefits = [
  {
    title: 'Lightning Fast',
    description: 'Generate unique logos in seconds with AI'
  },
  {
    title: 'Professional Quality',
    description: 'Get high-quality, scalable logo designs'
  },
  {
    title: 'Unlimited Options',
    description: 'Explore endless design possibilities'
  },
  {
    title: 'Easy Customization',
    description: 'Fine-tune your logo to perfection'
  }
];

const BenefitItem = ({ title, description, index, fadeAnim }: any) => {
  const translateY = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    const delay = index * 200;
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 800,
        delay,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.benefitItem,
        {
          opacity: fadeAnim,
          transform: [{ translateY }]
        }
      ]}
    >
      <Text style={styles.benefitTitle}>{title}</Text>
      <Text style={styles.benefitText}>{description}</Text>
    </Animated.View>
  );
};

const BenefitsScreen = ({ navigation }: Props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const handleNext = () => {
    navigation.navigate('Pricing');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Why Choose Oyu AI?</Text>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {benefits.map((benefit, index) => (
          <BenefitItem
            key={index}
            title={benefit.title}
            description={benefit.description}
            index={index}
            fadeAnim={fadeAnim}
          />
        ))}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <CustomButton title="Next" onPress={handleNext} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginVertical: 30,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  benefitItem: {
    borderWidth: 1,
    borderColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  benefitTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 10,
  },
  benefitText: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
  },
  buttonContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
});

export default BenefitsScreen;
