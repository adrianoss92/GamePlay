import React from 'react';
import { Image } from 'react-native';
import { styles } from './style';





export function GuildIcon(){
  const uri = 'http://beeimg.com/images/s20517544803.jpg'
  return (    
     
    <Image 
      source={{uri}}
      style={styles.image}
      resizeMode= "cover"
    />


  );
}