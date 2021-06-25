import React from 'react';
import { Background } from '../../components/Background';
import { Header } from '../../components/Header';
import { BorderlessButton, FlatList } from 'react-native-gesture-handler';
import { theme } from '../../global/theme';
import { Fontisto } from '@expo/vector-icons';
import { ImageBackground, Text, View } from 'react-native';
import  BannerImg  from '../../assets/banner.png';
import { styles } from './styles';
import { ListHeader } from '../../components/ListHeader';
import { Member } from '../../components/Member';
import { ListDivider } from '../../components/ListDivider';
import { ButtonIcon } from '../../components/ButtonIcon';




export function AppointmentDetails(){
  const members = [
    {
      id: '1',
      username: 'Adriano',
      avatar_url: 'https://github.com/adrianoss92.png',
      status: 'online'
    },
    {
      id: '2',
      username: 'Diego',
      avatar_url: 'https://github.com/adrianoss92.png',
      status: 'offline'
    },
    {
      id: '3',
      username: 'Sandy',
      avatar_url: 'https://github.com/adrianoss92.png',
      status: 'online'
    },
  ];
  return (
    <Background>
      <Header 
        title="Detalhes"
        action={
          <BorderlessButton>
            <Fontisto 
              name="share"
              size={24}
              color={theme.colors.primary}
            />
          </BorderlessButton>
        }
      />
      <ImageBackground 
        source={BannerImg}
        style={styles.banner}
      >
        <View style={styles.bannerComponent}> 
          <Text style={styles.title}>
            Lendários
          </Text>
          <Text style={styles.subTitle}>
            É hoje que vamos chegar ao chalenger sem perder uma partida da md10
          </Text>
        </View>
          
      </ImageBackground>
      <ListHeader 
        title="Jogadores"
        subtitle="Total 3"
      />

      <FlatList 
        data={members}
        keyExtractor={item => item.id}
        renderItem={({item}) =>(
          <Member data={item} />
        )}
        ItemSeparatorComponent={() => <ListDivider />}
        style={styles.members}
      />
      <View style={styles.footer}>
        <ButtonIcon title="Entrar na Partida"/>
      </View>
    
    </Background>
  );
}