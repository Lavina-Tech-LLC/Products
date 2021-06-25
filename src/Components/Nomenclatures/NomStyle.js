import {StyleSheet} from 'react-native';

export const NomStyle = (size) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20 * size,
    },
    content: {
      alignItems: 'center',
    },
    Nomenclature: {
      width: 650 * size,
      height: 80 * size,
      marginRight: 35 * size,
      marginTop: 25 * size,
      padding: 10 * size,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRadius: 25 * size,
      borderColor: '#332A7C',
      borderWidth: 4 * size,
    },
    NomenclaturesContainer: {
      paddingBottom: 25 * size,
      width: '100%',
    },
    SearchInputContainer: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderRadius: 25 * size,
    },
    SearchInput: {flex: 9, paddingLeft: 35 * size},
    clear: {flex: 1, alignItems: 'center', justifyContent: 'center'},
    NomName: {fontSize: 25 * size},
    buttonContainer: {
      width: '100%',
      alignItems: 'center',
      borderTopWidth: 2 * size,
      borderTopColor: '#332A7C',
      borderRadius: 25 * size,
      paddingTop: 20 * size,
    },
    button: {
      width: 280 * size,
      borderRadius: 24 * size,
      height: 60 * size,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
