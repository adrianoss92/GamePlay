import React, { useState, useEffect }  from 'react';
import { 
  View, 
  FlatList
} from 'react-native';
import { Guild, GuildProps } from '../../components/Guild';
import { styles } from './styles';
import { ListDivider } from '../../components/ListDivider';
import { Load } from '../../components/Load';
import { api } from '../../service/api';

type Props = {
  handleGuildSelect: (guild: GuildProps) => void;
}

export function Guilds({handleGuildSelect}: Props){

  const [guilds, setGuilds] = useState<GuildProps[]>([]);
  const [loading, setloading] = useState(true);

  async function fetchGuild(){
    const response = await api.get('/users/@me/guilds');

    setGuilds(response.data);
    setloading(false);
  }

  useEffect(()=> {
    fetchGuild();
  },[]);

  return (
    <View style={styles.container}>
      { 
        loading ? <Load/>  :

        <FlatList 
          data={guilds}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <Guild 
              data={item}
              onPress={() => handleGuildSelect(item)}
            />
          )}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <ListDivider isCentered />}
          ListHeaderComponent={() => <ListDivider isCentered />}
          contentContainerStyle={{ paddingBottom: 68, paddingTop: 103 }}
          style={styles.guilds}
        />
      }
    </View>
  );

}