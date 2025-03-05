const Sound = require('react-native-sound');

const BeepSound = () => {
    const sound = new Sound(require('../../Shared/Sound/beep.wav'), (error) => {
        if (error) {
            console.log('Failed to load the sound', error);
            return;
        }
        sound.play(() => {
            sound.release();
        });
    });
}

export default BeepSound