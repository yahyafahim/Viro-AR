import {
  Viro3DObject,
  ViroAmbientLight,
  ViroARScene,
  ViroARSceneNavigator,
  ViroOmniLight,
  ViroTrackingReason,
} from '@reactvision/react-viro';
import assets from './resources';
import React, { useEffect, useState } from 'react';
import { AppState, StyleSheet, View } from 'react-native';

const HelloWorldSceneAR = () => {
  function onInitialized(state: any, reason: ViroTrackingReason) {
    console.log('onInitialized', state, reason);
  }

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      <ViroAmbientLight color={'#FFFFFF'} />
      <ViroOmniLight
        intensity={30}
        color={'#FFFFFF'}
        position={[2, 2, 0.4]}
        attenuationEndDistance={20}
        attenuationStartDistance={0}
      />

      {assets.ironManUrl && (
        <Viro3DObject
          type="OBJ"
          position={[0, 0, -0.5]}
          shadowCastingBitMask={2}
          lightReceivingBitMask={3}
          scale={[0.002, 0.002, 0.002]}
          source={{ uri: assets.ironManUrl }}
          onLoadEnd={() => console.log('3D loaded')}
          onError={err => console.log('3D load error:', err)}
        />
      )}
    </ViroARScene>
  );
};

export default () => {
  const [showAR, setShowAR] = useState(true);
  const [isResuming, setIsResuming] = useState(false);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextState => {
      if (nextState !== 'active') {
        setShowAR(false);
      } else {
        setIsResuming(true);
        setTimeout(() => {
          setShowAR(true);
          setIsResuming(false);
        }, 1200);
      }
    });

    return () => subscription.remove();
  }, []);

  if (!showAR || isResuming) {
    return <View style={{ flex: 1, backgroundColor: 'black' }} />;
  }
  return (
    <ViroARSceneNavigator
      autofocus={true}
      initialScene={{
        scene: HelloWorldSceneAR,
      }}
      style={styles.f1}
    />
  );
};

var styles = StyleSheet.create({
  f1: { flex: 1 },
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
