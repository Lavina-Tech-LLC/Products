import {StyleSheet} from 'react-native';

export const styles = (size) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 25 * size,
      paddingBottom: 25 * size,
    },
    buttonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingLeft: 30 * size,
      paddingRight: 30 * size,
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: 'rgba(51, 42, 124, 1)',
      borderWidth: 3 * size,
      width: 220 * size,
      height: 70 * size,
      borderRadius: 25 * size,
    },
    headerText: {
      fontSize: 20 * size,
      fontWeight: 'bold',
    },
    balanceTable: {
      padding: 5 * size,
      paddingTop: 10 * size,
      alignItems: 'center',
    },
    balanceTableHead: {
      borderTopColor: 'rgba(51, 42, 124, 1)',
      borderBottomColor: 'rgba(51, 42, 124, 1)',
      borderTopWidth: 0.5,
      borderBottomWidth: 0.5,
      paddingTop: 12 * size,
      paddingBottom: 12 * size,
    },
    balanceColumn: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 35 * size,
      paddingLeft: 24 * size,
      paddingRight: 24 * size,
    },
    // header text style
    headText: {
      fontSize: 18 * size,
      fontWeight: 'bold',
    },
    // text style for all column
    balanceColumnText: {
      fontSize: 14 * size,
      fontWeight: '800',
    },
    sort: {
      width: 160 * size,
    },
    delete: {
      width: 100 * size,
    },
    name: {
      width: 270 * size,
    },
    text: {
      fontSize: 22 * size,
    },
    textInput: {
      width: 105 * size,
      height: 50 * size,
      padding: 0,
      textAlign: 'center',
      fontSize: 28 * size,
    },
    inputText: {
      width: 120 * size,
    },
    iconText: {
      fontSize: 30 * size,
      fontWeight: 'bold',
    },
    item: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      height: 60 * size,
    },
    Average: {
      width: 220 * size,
    },

    // footer
    iconStyle: {
      width: 20 * size,
      height: 20 * size,
      marginTop: 5 * size,
      marginRight: 5 * size,
    },
    shadow: {
      borderRadius: 8 * size,
      backgroundColor: 'white',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2 * size,
      },
      shadowRadius: 3 * size,
      shadowOpacity: 1.0,
      elevation: 1,
    },
  });

export const modalStyles = (size) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    modalCard: {
      width: 1400 * size,
      height: '80%',
      padding: 25 * size,
    },
    headerContainer: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    headerText: {
      fontSize: 36 * size,
      fontWeight: 'bold',
    },
    searchContainer: {
      width: '100%',
      alignItems: 'flex-end',
      marginTop: 20 * size,
    },
    productsContainer: {
      flexDirection: 'row',
      paddingTop: 25 * size,
      paddingBottom: 25 * size,
      flexWrap: 'wrap',
      width: '100%',
    },
  });
