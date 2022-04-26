const task = document.querySelector('.karaokeWrapper')
const startRecord = task.querySelector('#record')
const music = task.querySelector('.music')

navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
        const mediaRecorder = new MediaRecorder(stream);
        let record = false

        startRecord.addEventListener('click', function(e) {
            startRecord.classList.toggle('active')
            task.querySelector('.myrecord') ? task.querySelector('audio').remove() : null;
            if (!record) {
                record = !record
                music.play()
                mediaRecorder.start();

            } else {
                mediaRecorder.stop();
                music.pause()
                music.currentTime = 0
                record = !record
            }
        });

        music.addEventListener('ended', (e) => {
            mediaRecorder.stop();
            startRecord.classList.remove('active')
            music.pause()
            music.currentTime = 0
            record = !record
        })

        let audioChunks = [];
        mediaRecorder.addEventListener("dataavailable", function(event) {
            audioChunks.push(event.data);
        });

        mediaRecorder.addEventListener("stop", function() {
            const audioBlob = new Blob(audioChunks, {
                type: 'audio/wav'
            });
            const audioUrl = URL.createObjectURL(audioBlob);
            let audio = document.createElement('audio');
            audio.src = audioUrl;
            audio.controls = true;
            audio.autoplay = false;
            audio.classList.add('myrecord')
            document.querySelector('#audio').append(audio);
            audioChunks = [];
        });
        document.querySelector('#stop').addEventListener('click', function() {
            mediaRecorder.stop();
            music.pause()
            music.currentTime = 0
        });
    });