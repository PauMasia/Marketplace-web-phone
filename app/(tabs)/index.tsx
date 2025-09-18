import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';


import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
      <h1> Holiwi UWU</h1>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
