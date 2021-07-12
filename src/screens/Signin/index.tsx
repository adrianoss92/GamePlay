import React from 'react';
import { 
  View, 
  Text, 
  Image,
  Alert,
  ActivityIndicator
} from 'react-native';
import IllustrationImg from '../../assets/illustration.png';
import { ButtonIcon } from '../../components/ButtonIcon';
import { styles } from './styles';
import { Background } from '../../components/Background';
import { useAuth } from '../../hooks/auth';
import { theme } from '../../global/theme';




export function SignIn(){


  const { loading, signIn } = useAuth();

  async  function handleSignIn(){
    try {
      await signIn();
    } catch (error){
      Alert.alert('Erro: ', error.message);
    }
  }

  return (
    <Background>

      <View style={styles.container}>

        <Image 
          source={IllustrationImg} 
          style={styles.image} 
          resizeMode="stretch"
        />

        <View style={styles.content}>
          <Text style={styles.title}>
            Conecte-se{'\n'}
            e organize suas{'\n'}
            jogatinas
          </Text>

          <Text style={styles.subTitle}>
            Crie Grupos para jogar seus games{'\n'}
            favoritos com seus amigos
          </Text>

          {
            loading 
            ? 
            <ActivityIndicator color={theme.colors.primary} /> 
            :
            <ButtonIcon 
              title="Entra com Discord"
              onPress={handleSignIn}
            />
          }
        </View>  
      </View>
    </Background>

  );
}