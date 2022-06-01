(() => {
    const task = document.querySelector('.recordWrapper')
    const startRecord = task.querySelector('.recordButton')
    const audioLine = task.querySelector('.audioWrapper')

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
                    task.querySelector('.delite').remove()
                }
                if (!record) {
                    record = !record
                    mediaRecorder.start();

                } else {
                    mediaRecorder.stop();
                    record = !record
                }
            });


            let audioChunks = [];
            mediaRecorder.addEventListener("dataavailable", function(event) {
                audioChunks.push(event.data);
                const audioBlob = new Blob(audioChunks, {
                    type: 'audio/wav'
                });
                const audioUrl = URL.createObjectURL(audioBlob);
                createAudio(audioUrl)
                createDownload(audioUrl)
                createDelite()
                audioChunks = [];
            });

            function createAudio(audioUrl) {
                let audio = document.createElement('audio');
                audio.src = audioUrl;
                audio.controls = true;
                audio.classList.add('myrecord')
                audioLine.append(audio);
            }

            function createDownload(audioUrl) {
                let link = document.createElement('a')
                link.href = audioUrl
                link.download = 'myAudio'
                link.classList.add('download', 'audiocontrolBtn')
                link.style.backgroundImage = `url(Images_1/record/download.png)`
                audioLine.append(link);
            }

            function createDelite() {
                let delite = document.createElement('button');
                delite.classList.add('delite', 'audiocontrolBtn')
                delite.style.backgroundImage = `url(Images_1/record/delite.png)`
                delite.addEventListener('click', () => {
                    audioLine.innerHTML = ''
                })
                audioLine.append(delite);
            }
        });
})()