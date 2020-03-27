class DropboxController{
    constructor(){
        this.btnSendFileEl = document.querySelector('#btn-send-file');
        this.inputFilesEl = document.querySelector('#files');
        this.snackBarModalEl = document.querySelector('#react-snackbar-root');
        this.progressBarEl = this.snackBarModalEl.querySelector('.mc-progress-bar-fg')

        this.initEvents();
    }

    initEvents()
    {
        this.btnSendFileEl.addEventListener('click', event => {
            this.inputFilesEl.click();
        });

        this.inputFilesEl.addEventListener('change', event => {

            this.uploadTask(event.target.files);

            this.snackBarModalEl.style.display = 'block';
        });
    }

    uploadTask(files)
    {
        let promises = [];

        [...files].forEach(file => {
            promises.push( new Promise((resolve,reject)=>{
                let ajax = new XMLHttpRequest();
                ajax.open('POST', '/upload');

                ajax.onload = event => {
                    try {
                        resolve(JSON.parse(ajax.responseText))
                    } catch (error) {
                        reject(error)
                    }
                }

                ajax.onerror = event => {
                    reject(event);
                }

                ajax.upload.onprogress = event => {
                    this.uploadProgress(event,file);
                }

                let formData = new FormData();

                formData.append('input-file',file);


                ajax.send(formData);

            }));
        })

        return Promise.all(promises);
    }


    uploadProgress(event,file)
    {
        let loaded = event.loaded;
        let total = event.total;

        let porcent = parseInt((loaded / total) * 100);

        this.progressBarEl.style.width = `${porcent}%`;
        
    }
}