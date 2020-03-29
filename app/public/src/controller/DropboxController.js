class DropboxController{
    constructor(){
        this.btnSendFileEl = document.querySelector('#btn-send-file');
        this.inputFilesEl = document.querySelector('#files');
        this.snackBarModalEl = document.querySelector('#react-snackbar-root');
        this.progressBarEl = this.snackBarModalEl.querySelector('.mc-progress-bar-fg')
        this.nameFileEl = this.snackBarModalEl.querySelector('.filename');
        this.timeLeftEl = this.snackBarModalEl.querySelector('.timeleft');
        this.initEvents();
    }

    initEvents()
    {
        this.btnSendFileEl.addEventListener('click', event => {
            this.inputFilesEl.click();
        });

        this.inputFilesEl.addEventListener('change', event => {

            this.uploadTask(event.target.files);

            this.modalShow();

            this.inputFilesEl.value = '';
        });
    }

    modalShow(show = true)
    {
        this.snackBarModalEl.style.display = (show) ? 'block' : 'none'
    }

    uploadTask(files)
    {
        let promises = [];

        [...files].forEach(file => {
            promises.push( new Promise((resolve,reject)=>{
                let ajax = new XMLHttpRequest();
                ajax.open('POST', '/upload');

                ajax.onload = event => {
                    this.modalShow(false);
                    try {
                        resolve(JSON.parse(ajax.responseText))
                    } catch (error) {
                        reject(error)
                    }
                }

                ajax.onerror = event => {
                    this.modalShow(false);
                    reject(event);
                }

                ajax.upload.onprogress = event => {
                    this.uploadProgress(event,file);
                }

                let formData = new FormData();

                formData.append('input-file',file);

                this.startUploadTime = Date.now();

                ajax.send(formData);

            }));
        })

        return Promise.all(promises);
    }


    uploadProgress(event,file)
    {

        let timespent = Date.now() - this.startUploadTime;
        let loaded = event.loaded;
        let total = event.total;

        let porcent = parseInt((loaded / total) * 100);
        let timeLeft = ((100 - porcent) * timespent) / porcent; 
        this.progressBarEl.style.width = `${porcent}%`;

        this.nameFileEl.innerHTML = file.name;
        this.timeLeftEl.innerHTML = this.formatTimeToHuman(timeLeft);

        
        
    }

    formatTimeToHuman(duration)
    {
        let seconds = parseInt((duration / 1000) % 60);
        let minutes = parseInt((duration / (1000 * 60 )) % 60);
        let hours = parseInt((duration / (1000 * 60 * 60)) % 24);

        if(hours > 0 )
        {
            return `${hours} horas, ${minutes} minutos e ${seconds} segundos`;
        }
        if(minutes > 0 )
        {
            return `${minutes} minutos e ${seconds} segundos`;
        }
        if(seconds > 0 )
        {
            return `${seconds} segundos`;
        }

        return '';


    }
}