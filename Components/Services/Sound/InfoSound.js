const Sound = require('react-native-sound');

const InfoSound = () => {
    const sound = new Sound(require('../../Shared/Sound/info.wav'), (error) => {
        if (error) {
            console.log('Failed to load the sound', error);
            return;
        }
        sound.play(() => {
            sound.release();
        });
    });
}

export default InfoSound