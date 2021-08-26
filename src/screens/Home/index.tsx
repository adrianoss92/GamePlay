import React, { useCallback, useState } from 'react';
import { FlatList, View, Text } from 'react-native'; 

import { Appointment, AppointmentProps } from '../../components/Appointment';
import { ButtonAdd } from '../../components/ButtonAdd';
import { CategorySelect } from '../../components/CategorySelect';
import { ListDivider } from '../../components/ListDivider';
import { ListHeader } from '../../components/ListHeader';
import { Profile } from '../../components/Profile';
import { Background } from '../../components/Background';
import { COLLECTION_APPOINTMENTS } from '../../configs/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { styles } from './styles'
import { Load } from '../../components/Load';


export function Home(){
  const[loading, setLoading] = useState(true);

  const [category, setCategory] = useState('');

  const [ appointments, setAppointments ] = useState<AppointmentProps[]>([]);

  const navigation = useNavigation();

  function handleAppointmentDetails(guildSelected: AppointmentProps){
    navigation.navigate('AppointmentDetails', { guildSelected });
  }

  function handleAppointmentCreate(){
    navigation.navigate('AppointmentCreate');
  }
  
  // const appointments = [
  //   {
  //     id:'1',
  //     guild:{
  //       id:'1',
  //       name: 'Lendários',
  //       icon: null,
  //       owner: true
  //     },
  //     category: '1',
  //     date: '22/06 as 20:40h',
  //     description: 'É hoje que vamos chegar ao challenger sem perder uma partida da md10'
  //   },
  //   {
  //     id:'2',
  //     guild:{
  //       id:'1',
  //       name: 'Lendários',
  //       icon: null,
  //       owner: true
  //     },
  //     category: '1',
  //     date: '22/06 as 20:40h',
  //     description: 'É hoje que vamos chegar ao challenger sem perder uma partida da md10'
  //   },
  //   {
  //     id:'3',
  //     guild:{
  //       id:'1',
  //       name: 'Lendários',
  //       icon: null,
  //       owner: true
  //     },
  //     category: '1',
  //     date: '22/06 as 20:40h',
  //     description: 'É hoje que vamos chegar ao challenger sem perder uma partida da md10'
  //   },
  //   {
  //     id:'4',
  //     guild:{
  //       id:'1',
  //       name: 'Lendários',
  //       icon: null,
  //       owner: true
  //     },
  //     category: '1',
  //     date: '22/06 as 20:40h',
  //     description: 'É hoje que vamos chegar ao challenger sem perder uma partida da md10'
  //   },
  //   {
  //     id:'5',
  //     guild:{
  //       id:'1',
  //       name: 'Lendários',
  //       icon: null,
  //       owner: true
  //     },
  //     category: '1',
  //     date: '22/06 as 20:40h',
  //     description: 'É hoje que vamos chegar ao challenger sem perder uma partida da md10'
  //   },
  //   {
  //     id:'6',
  //     guild:{
  //       id:'1',
  //       name: 'Lendários',
  //       icon: null,
  //       owner: true
  //     },
  //     category: '1',
  //     date: '22/06 as 20:40h',
  //     description: 'É hoje que vamos chegar ao challenger sem perder uma partida da md10'
  //   }
  // ]

  function handleCategorySelect(categoryId: string){

    categoryId === category ? setCategory('') : setCategory(categoryId);
  }

  async function loadAppointments(){
    const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
      const storage: AppointmentProps[] = response ? JSON.parse(response) : [];
  
      if(category){
        setAppointments(storage.filter(item => item.category === category));
      } else {
        setAppointments(storage);
      }
  
      setLoading(false);
  
    }
  
    useFocusEffect(useCallback( () => {
      loadAppointments();
    },[category]));

  return(
    <Background>
      <View style={styles.header}>
        <Profile />
        <ButtonAdd onPress={handleAppointmentCreate}/>
      </View>

      <CategorySelect 
        categorySelected={category}
        setCategory={handleCategorySelect}
      />

      {
        loading ? <Load /> :
        <>
          <ListHeader 
            title="Patidas agendadas"
            subtitle={`Total ${appointments.length}`}
          />
          <FlatList 
            data={appointments}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <Appointment 
                data={item}
                onPress={() => handleAppointmentDetails(item)}
              />
            )}
            ItemSeparatorComponent={()=> <ListDivider />}
            contentContainerStyle={{ paddingBottom: 69 }}
            style={styles.matches} 
            showsVerticalScrollIndicator = {false}
          />
        </>
      }
    </Background>
  );
}