(() => {
    const task = document.querySelector('.karaokeWrapper')
    const startRecord = task.querySelector('#record')
    const music = task.querySelector('.music')

    navigator.mediaDevices.getUserMedia({
            audio: true
        })
        .then(stream => {
            const mediaRecorder = new MediaRecorder(stream);
            let record = false

            startRecord.addEventListener('click', function(e) {
                startRecord.classList.toggle('active')
                if (task.querySelector('.myrecord')) {
                    task.querySelector('.myrecord').remove()
                    task.querySelector('.download').remove()
                }
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
                console.log(event.data)
                const audioBlob = new Blob(audioChunks, {
                    type: 'audio/wav'
                });
                const audioUrl = URL.createObjectURL(audioBlob);
                let audio = document.createElement('audio');
                let link = document.createElement('a')
                link.href = audioUrl
                link.download = 'myAudio'
                link.classList.add('download')
                link.style.display = 'block'
                link.style.width = '40px'
                link.style.height = '40px'
                link.style.backgroundImage = `url(Images_1/download.png)`
                audio.src = audioUrl;
                audio.controls = true;
                audio.classList.add('myrecord')
                document.querySelector('#audio').append(audio);
                document.querySelector('#audio').append(link);
                audioChunks = [];
            });

            mediaRecorder.addEventListener("stop", function() {

                let myrecord = document.querySelector('.myrecord')
                myrecord.duration = 25
            });

        });
})()