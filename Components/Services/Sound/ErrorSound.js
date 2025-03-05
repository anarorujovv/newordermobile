const Sound = require('react-native-sound');

const ErrorSound = () => {
    const sound = new Sound(require('../../Shared/Sound/error.wav'), (error) => {
        if (error) {
            console.log('Failed to load the sound', error);
            return;
        }
        sound.play(() => {
            sound.release();
        });
    });
}

export default ErrorSound