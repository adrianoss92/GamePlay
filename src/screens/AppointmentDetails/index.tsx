import React, { useEffect } from 'react';
import { Background } from '../../components/Background';
import { Header } from '../../components/Header';
import { BorderlessButton, FlatList } from 'react-native-gesture-handler';
import { theme } from '../../global/theme';
import { Fontisto } from '@expo/vector-icons';
import { Alert, ImageBackground, Text, View,Platform, Share } from 'react-native';
import  BannerImg  from '../../assets/banner.png';
import { styles } from './styles';
import { ListHeader } from '../../components/ListHeader';
import { Member, MemberProps } from '../../components/Member';
import { ListDivider } from '../../components/ListDivider';
import { ButtonIcon } from '../../components/ButtonIcon';
import { AppointmentProps } from '../../components/Appointment';
import { useRoute } from '@react-navigation/native';
import { api } from '../../service/api';
import { useState } from 'react';
import { Load } from '../../components/Load';
import * as linking from 'expo-linking';


type Params = {
  guildSelected: AppointmentProps
}

type GuildWidget = {
  id: string;
  name: string;
  instant_invite: string;
  members: MemberProps[];

}

export function AppointmentDetails(){

  const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget);

  const [loading, setLoading] = useState(true);

  const route = useRoute();

  const { guildSelected } = route.params as Params 

  async function fetchGuildWidget(){
    try {
      const response = await api.get(`/guilds/${guildSelected.guild.id}/widget.json`);
      setWidget(response.data);
      
    } catch {
      Alert.alert('Verifique as configurações do servidor. Será que o Widdget está habilitado ?')
    } finally {
      setLoading(false);
    }
  }

  function handleShareInvitation(){
    const message = Platform.OS === 'ios'
      ? `Junte-se a ${guildSelected.guild.name}`
      : widget.instant_invite;

    Share.share({
      // message,
      // url: widget.instant_invite
      title: 'GamePlay',
      message: `Junte-se a ${guildSelected.guild.name}`,
      url:widget.instant_invite,
    });
  }

  function handleOpenGuild(){
    linking.openURL(widget.instant_invite);
  }

  useEffect(()=> {
    fetchGuildWidget();
  })

 
  return (
    <Background>
      <Header 
        title="Detalhes"
        action={
          guildSelected.guild.owner && 
          <BorderlessButton onPress={handleShareInvitation}>
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
            {guildSelected.guild.name}
          </Text>
          <Text style={styles.subTitle}>
            {guildSelected.description}
          </Text>
        </View>
          
      </ImageBackground>
      {
        
          loading ? <Load /> :
          <>
            {
              guildSelected.guild.owner &&
              <ListHeader 
              title="Jogadores"
              subtitle={`Total ${widget.members.length}`}
            />
            }

            <FlatList 
              data={widget.members}
              keyExtractor={item => item.id}
              renderItem={({item}) =>(
                <Member data={item} />
              )}
              ItemSeparatorComponent={() => <ListDivider />}
              style={styles.members}
            />
           
          </>
      }

      {
        guildSelected.guild.owner && 
        <View style={styles.footer}>
          <ButtonIcon 
            title="Entrar na Partida"
            onPress={handleOpenGuild}
          />
        </View>
      }
    
    </Background>
  );
}