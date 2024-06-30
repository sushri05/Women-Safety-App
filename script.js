let mediaRecorder;
let audioChunks = [];
let sirenAudio;

document.getElementById('sosButton').addEventListener('click', function() {
    alert('SOS Alert Sent!');
});

document.getElementById('recordButton').addEventListener('click', function() {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
        this.textContent = 'Start Voice Recording';
    } else {
        startRecording();
        this.textContent = 'Stop Recording';
    }
});

document.getElementById('sirenButton').addEventListener('click', function() {
    sirenAudio = new Audio('siren.mp3');
    sirenAudio.loop = true; // Loop the siren sound
    sirenAudio.play();
});

document.getElementById('stopSirenButton').addEventListener('click', function() {
    if (sirenAudio) {
        sirenAudio.pause();
        sirenAudio.currentTime = 0; // Reset the audio to the beginning
    }
});

function startRecording() {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start();

            mediaRecorder.addEventListener('dataavailable', event => {
                audioChunks.push(event.data);
            });

            mediaRecorder.addEventListener('stop', () => {
                const audioBlob = new Blob(audioChunks);
                const audioUrl = URL.createObjectURL(audioBlob);
                const audio = new Audio(audioUrl);
                audio.play();
                audioChunks = [];
            });
        })
        .catch(error => {
            console.error('Error accessing microphone:', error);
            alert('Microphone access is required for recording.');
        });
}
