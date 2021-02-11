class Toast {
    static Success(message){
        const div = document.querySelector('.toast');
        div.textContent = message;
        div.classList.add('success');
        div.classList.add('show');

        setTimeout(() => {
            div.addEventListener('transitionend', Toast.ResetToast)
            div.classList.remove('show');
        },3000);
    }

    static Error(message){
        const div = document.querySelector('.toast');
        div.textContent = message;
        div.classList.add('error');
        div.classList.add('show');

        setTimeout(() => {
            div.addEventListener('transitionend', Toast.ResetToast)
            div.classList.remove('show');
        },3000);
    }

    static ResetToast(){
        const div = document.querySelector('.toast');
        div.removeEventListener('transitionend', Toast.ResetToast);
        div.classList.remove('success');
        div.classList.remove('error');
    }
}