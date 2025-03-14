import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import CustomButton from '../components/CustomButton';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type PricingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Pricing'>;

type Props = {
  navigation: PricingScreenNavigationProp;
};

interface PlanProps {
  title: string;
  price: string;
  period: string;
  features: string[];
  isPopular?: boolean;
  index: number;
}

const PricingPlan = ({ title, price, period, features, isPopular, index }: PlanProps) => {
  const fadeIn = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    const delay = index * 200;
    Animated.parallel([
      Animated.timing(fadeIn, {
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
        styles.planContainer,
        isPopular && styles.popularPlan,
        {
          opacity: fadeIn,
          transform: [{ translateY }]
        }
      ]}
    >
      {isPopular && <View style={styles.popularBadge}><Text style={styles.popularText}>Popular</Text></View>}
      <Text style={styles.planTitle}>{title}</Text>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>{price}</Text>
        <Text style={styles.period}>/{period}</Text>
      </View>
      {features.map((feature, idx) => (
        <Text key={idx} style={styles.feature}>• {feature}</Text>
      ))}
    </Animated.View>
  );
};

const PricingScreen = ({ navigation }: Props) => {
  const handleSubscribe = () => {
    // Handle subscription logic here
  };

  const plans = [
    {
      title: 'Monthly',
      price: '$9.99',
      period: 'month',
      features: ['Unlimited logos', 'High-resolution exports', 'Full customization'],
    },
    {
      title: 'Annual',
      price: '$99.99',
      period: 'year',
      features: ['Everything in Monthly', '2 months free', 'Priority support'],
      isPopular: true,
    }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Plan</Text>
      {plans.map((plan, index) => (
        <PricingPlan
          key={index}
          {...plan}
          index={index}
        />
      ))}
      <CustomButton title="Subscribe Now" onPress={handleSubscribe} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
  },
  planContainer: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#fff',
  },
  popularPlan: {
    borderColor: '#fff',
    borderWidth: 2,
  },
  popularBadge: {
    position: 'absolute',
    top: -12,
    right: 20,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  popularText: {
    color: '#000',
    fontWeight: 'bold',
  },
  planTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 20,
  },
  price: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
  period: {
    fontSize: 18,
    color: '#fff',
    opacity: 0.8,
    marginLeft: 4,
  },
  feature: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
    marginBottom: 8,
  },
});

export default PricingScreen;
