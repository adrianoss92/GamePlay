import { StyleSheet } from 'react-native';
import { theme } from '../../global/theme';
import { getStatusBarHeight } from 'react-native-iphone-x-helper'

export const styles = StyleSheet.create({
  container:{
    flex: 1
  },
  header:{
    width: '100%',
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: getStatusBarHeight() + 26, 
    marginBottom: 42
  },
  matches:{
    marginTop: 24,
    marginLeft:24
  }

})

// O comando getStatusBar é utilizado para contar o top da    tela a partir do Note + 26 px para baixo, o memso não é aplicado no caso dos androids