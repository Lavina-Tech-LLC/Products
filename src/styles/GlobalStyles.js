import {StyleSheet} from 'react-native';

export default (size) =>
  StyleSheet.create({
    shadow: {
      borderRadius: 25 * size,
      backgroundColor: 'white',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 10 * size,
      },
      shadowRadius: 15 * size,
      shadowOpacity: 1.0,
      elevation: 3,
    },
    selected: {
      backgroundColor: 'rgba(51, 42, 124, 1)',
    },
    selectedText: {
      color: 'white',
    },
  });
