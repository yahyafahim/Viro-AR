import {
  Viro3DObject,
  ViroAmbientLight,
  ViroARScene,
  ViroARSceneNavigator,
  ViroOmniLight,
  ViroText,
  ViroTrackingReason,
  ViroTrackingStateConstants,
} from '@reactvision/react-viro';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

const HelloWorldSceneAR = () => {
  const [text, setText] = useState('Initializing AR...');

  function onInitialized(state: any, reason: ViroTrackingReason) {
    console.log('onInitialized', state, reason);
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setText('Hello World!');
    } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
      console.log('Tracking Unavailable');
    }
  }

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      <ViroText
        text={text}
        scale={[0.5, 0.5, 0.5]}
        position={[0, 0, -1]}
        style={styles.helloWorldTextStyle}
      />

      <ViroAmbientLight color={'#FFFFFF'} />
      <ViroOmniLight
        intensity={30}
        position={[2, 2, 0.4]}
        color={'#FFFFFF'}
        attenuationStartDistance={0}
        attenuationEndDistance={20}
      />

      <Viro3DObject
        source={require('./resources/start_flag.glb')}
        position={[0, 0, 0]}
        scale={[1, 1, 1]}
        type="GLB"
        lightReceivingBitMask={3}
        shadowCastingBitMask={2}
        onLoadEnd={() => console.log('3D loaded')}
        onError={err => console.log('3D load error:', err)}
      />
    </ViroARScene>
  );
};

export default () => {
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
