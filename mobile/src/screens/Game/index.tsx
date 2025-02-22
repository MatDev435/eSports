import React from 'react';
import { useEffect, useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Background } from '../../components/Background';
import { View, TouchableOpacity, Image, FlatList, Text } from 'react-native';

import { Entypo } from '@expo/vector-icons';

import { styles } from './styles';
import { THEME } from '../../theme';

import logoImg from '../../assets/logo-nlw-esports.png';
import { GameParams } from '../../@types/navigation';
import { Heading } from '../../components/Heading';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { DuoMatch } from '../../components/DuoMatch';

export function Game() {
  const [duos, setDuos] = useState<DuoCardProps[]>([]);
  const [discordDuoSelected, setDiscordDuoSelected] = useState<string>('');

  const navigate = useNavigation();
  const route = useRoute();
  const game = route.params as GameParams;

  function handleGoBack() {
    navigate.goBack();
  }

  async function getDiscordUser(adsId: string) {
    fetch(`http://192.168.100.18:3333/ads/${adsId}/discord`)
    .then(res => res.json())
    .then(data => setDiscordDuoSelected(data.discord))
  }

  useEffect(() => {
    fetch(`http://192.168.100.18:3333/games/${game.id}/ads`)
    .then(res => res.json())
    .then(data => setDuos(data))
  }, [])

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name='chevron-thin-left'
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>

          <Image
            source={logoImg}
            style={styles.logo}
          />

          <View style={styles.right} />
        </View>

        <Image
          source={{ uri: game.bannerUrl }}
          style={styles.cover}
          resizeMode='cover'
        />

        <Heading
          title={game.title}
          subtitle='Conecte-se e comece a jogar!'
        />

        <FlatList
          data={duos}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <DuoCard
              data={item}
              onConnect={() => getDiscordUser(item.id)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[duos.length > 0 ? styles.contentList : { flex: 1, alignItems: 'center', justifyContent: 'center' }]}
          style={styles.containerList}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              Não há anúncios publicados no momento.
            </Text>
          )}
        />

        <DuoMatch
          animationType='slide'
          visible={discordDuoSelected.length > 0}
          discord={discordDuoSelected}
          onClose={() => setDiscordDuoSelected('')}
        />
      </SafeAreaView>
    </Background>
  );
}