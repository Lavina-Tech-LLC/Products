import {StyleSheet} from 'react-native';

export const styles = (size) =>
  StyleSheet.create({
    constainer: {
      flex: 1,
      padding: 20 * size,
      alignItems: 'flex-end',
    },
    content: {
      flex: 1,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    overheadContainer: {
      width: 290 * size,
      height: '100%',
    },
    overHeadText: {
      width: '100%',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: 'black',
      padding: 10 * size,
    },
    productContainer: {
      width: 820 * size,
      height: '100%',
      padding: 15 * size,
      paddingBottom: 30 * size,
    },
    barCode: {
      width: 431 * size,
      height: 61 * size,
      borderRadius: 15 * size,
      borderWidth: 1,
      borderColor: 'rgba(51, 42, 124, 1)',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginRight: 30 * size,
      marginBottom: 25 * size,
    },
    input: {
      fontSize: 27 * size,
      flex: 1,
      padding: 0,
      paddingLeft: 5,
    },
    barCodeButton: {
      width: 60 * size,
      height: 60 * size,
      position: 'relative',
      top: 1 * size,
      right: -4 * size,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: 'rgba(51, 42, 124, 1)',
      borderWidth: 20 * size,
      borderRadius: 15 * size,
    },
    Number: {fontSize: 18 * size, fontWeight: 'bold'},
    Date: {
      fontSize: 18 * size,
      fontWeight: 'bold',
    },
    writeOffContainer: {
      width: 290 * size,
      height: 70 * size,
    },
  });
