import React from 'react';
import { View, StyleSheet } from 'react-native';

type Props = {
  numPages: number;
  currentPage: number;
};

const PageIndicator = ({ numPages, currentPage }: Props) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: numPages }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            index === currentPage ? styles.activeDot : styles.inactiveDot,
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#fff',
  },
  inactiveDot: {
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
});

export default PageIndicator;
