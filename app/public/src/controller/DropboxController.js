class DropboxController{
    constructor(){
        this.btnSendFileEl = document.querySelector('#btn-send-file');
        this.inputFilesEl = document.querySelector('#files');
        this.snackBarModalEl = document.querySelector('#react-snackbar-root');


        this.iniEvents();
    }

    iniEvents()
    {
        this.btnSendFileEl.addEventListener('click', event => {
            this.inputFilesEl.click();
        });

        this.inputFilesEl.addEventListener('change', event => {

            console.log(event.target.files);

            this.snackBarModalEl.style.display = 'block';
        });
    }
}