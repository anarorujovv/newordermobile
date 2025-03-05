const Sound = require('react-native-sound');

const SuccessSound = () => {
    const sound = new Sound(require('../../Shared/Sound/success.wav'), (error) => {
        if (error) {
            console.log('Failed to load the sound', error);
            return;
        }
        sound.play(() => {
            sound.release();
        });
    });
}

export default SuccessSound