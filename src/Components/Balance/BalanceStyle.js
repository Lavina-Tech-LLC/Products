import {StyleSheet} from 'react-native';

export const styles = (size) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 5 * size,
      paddingBottom: 25 * size,
    },
    headerText: {
      fontSize: 40 * size,
      fontWeight: 'bold',
    },
    balanceTable: {
      padding: 5 * size,
      paddingTop: 40 * size,
      alignItems: 'center',
    },
    balanceTableHead: {
      borderTopColor: 'rgba(51, 42, 124, 1)',
      borderBottomColor: 'rgba(51, 42, 124, 1)',
      borderTopWidth: 0.5,
      borderBottomWidth: 0.5,
    },
    balanceColumn: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 12 * size,
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
    item: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      paddingLeft: 10 * size,
      paddingRight: 10 * size,
      alignItems: 'center',
      height: 40 * size,
    },
    //Бар код
    barCode: {
      width: 150 * size,
    },

    //Название
    name: {
      width: 206 * size,
    },

    //Начало ост
    startRem: {
      width: 110 * size,
    },

    // Приход
    coming: {
      width: 110 * size,
    },

    // Продажа
    sale: {
      width: 110 * size,
    },

    // списать
    writeOff: {
      width: 110 * size,
    },

    // Остаток
    remainder: {
      width: 110 * size,
    },

    // Разница
    difference: {
      width: 110 * size,
    },

    // Цена
    price: {
      width: 150 * size,
    },

    // Сумма
    amount: {
      width: 150 * size,
    },

    // footer
    footerContainer: {
      width: '100%',
      padding: 40 * size,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(1,1,1,.4)',
    },
    footer: {
      width: 1450 * size,
      height: 60 * size,
      marginTop: 15 * size,
      marginRight: 15 * size,
      marginLeft: 15 * size,
      paddingTop: 10 * size,
      paddingRight: 30 * size,
      paddingBottom: 10 * size,
      paddingLeft: 30 * size,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    footerText: {
      fontSize: 20 * size,
      fontWeight: 'bold',
      color: '#F5540B',
    },
    footerText2: {
      fontSize: 20 * size,
      fontWeight: 'bold',

      color: 'rgba(192, 0, 0, 1)',
    },
    footerText3: {
      fontSize: 20 * size,
      fontWeight: 'bold',
      color: 'white',
    },
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
