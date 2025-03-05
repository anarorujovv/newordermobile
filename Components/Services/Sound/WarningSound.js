const Sound = require('react-native-sound');

const WarningSound = () => {
    const sound = new Sound(require('../../Shared/Sound/warning.wav'), (error) => {
        if (error) {
            console.log('Failed to load the sound', error);
            return;
        }
        sound.play(() => {
            sound.release();
        });
    });
}

export default WarningSound