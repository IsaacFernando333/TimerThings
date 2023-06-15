const start = document.querySelector('.start');
const pause = document.querySelector('.pause');
const reset = document.querySelector('.reset');

document.addEventListener('click', function(e) {
    if (e.target === start) {
        start.classList = 'clicado';
    } else {
        start.classList = 'btns-tempo'
    };

    if (e.target === pause) {
        pause.classList = 'clicado';
    } else {
        pause.classList = 'btns-tempo';
    };

    if (e.target === reset) {
        reset.classList = 'clicado';
    } else {
        reset.classList = 'btns-tempo';
    };
});