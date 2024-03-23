import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { setUpPlayer,addTrack } from '../musicPlayerServices';
import ControlCenter from './components/ControlCenter';
import MusicPlayer from './screens/MusicPlayer';

function App(): React.JSX.Element {

  const [isPlayerReady,setIsPlayerReady] = useState(false);

  async function setup() {
    
    const isSetup = await setUpPlayer();

    if(isSetup){
      await addTrack();
    }

    setIsPlayerReady(isSetup);
  }

  useEffect(()=>{
    setup();
  },[])

  if(!isPlayerReady){
    return (
      <SafeAreaView>
        <ActivityIndicator/>
      </SafeAreaView>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle={"light-content"}/>
      <MusicPlayer/>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1
  }
});

export default App;
