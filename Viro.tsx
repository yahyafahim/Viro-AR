import {
  Viro3DObject,
  ViroAmbientLight,
  ViroARScene,
  ViroARSceneNavigator,
  ViroOmniLight,
  ViroTrackingReason,
  ViroTrackingStateConstants,
} from '@reactvision/react-viro';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import RNFS from 'react-native-fs';
import assets from './resources';

const getLocalModelPath = async (remoteUrl: string) => {
  const filename = remoteUrl.split('/').pop();
  const localPath = `${RNFS.CachesDirectoryPath}/${filename}`;

  try {
    const exists = await RNFS.exists(localPath);
    if (exists) {
      return `file://${localPath}`;
    }

    console.log('Downloading model to cache...');
    const download = RNFS.downloadFile({
      fromUrl: remoteUrl,
      toFile: localPath,
    });

    await download.promise;
    return `file://${localPath}`;
  } catch (error) {
    console.error('Caching error:', error);
    return remoteUrl;
  }
};

const HelloWorldSceneAR = () => {
  const [text, setText] = useState('Initializing AR...');
  const [asset, setAsset] = useState<string | null>(null);

  function onInitialized(state: any, reason: ViroTrackingReason) {
    console.log('onInitialized', state, reason);
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setText('Hello World!');
    } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
      console.log('Tracking Unavailable');
    }
  }

  useEffect(() => {
    getLocalModelPath(assets.ironManUrl).then(setAsset).catch(console.error);
  }, []);

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

      {asset && (
        <Viro3DObject
          type="OBJ"
          source={{ uri: asset }}
          // source={assets.ironMan}
          position={[0, 0, -0.5]}
          shadowCastingBitMask={2}
          lightReceivingBitMask={3}
          scale={[0.002, 0.002, 0.002]}
          onLoadEnd={() => console.log('3D loaded')}
          onError={err => console.log('3D load error:', err)}
        />
      )}
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
