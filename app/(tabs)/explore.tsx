import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';


import { Fonts } from '@/constants/theme';

export default function TabTwoScreen() {
  return (<>
      <h2>Carita de guapa :D</h2>
      <button onClick={myFunction}>Alternar</button>
    </>
  );
    function myFunction() {
        let element = document.body;
        element.classList.toggle("dark");
    }
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
