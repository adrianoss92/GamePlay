import React from 'react';
import { TextInput, TextInputProps} from 'react-native';
import { styles } from './style';

type Props = {
  title: string;
  subtitle: string;
}

export function TextArea({...rest}: TextInputProps){
  return (
    <TextInput
      style={styles.container}
      {...rest}
    />
  );
}