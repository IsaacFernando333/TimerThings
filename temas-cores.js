const Allwhite = document.querySelector('.one');
const Allblack = document.querySelector('.zero');
const purple = document.querySelector('.two');
const blue = document.querySelector('.three');
const pink = document.querySelector('.four');
const esqueletoThemes = document.querySelector('.esqueleto-theme');

const themeWhite = ['#FFFFFF', '#1a1a1a'];
const themeBlack = ['#1a1a1a', '#FFFFFF'];
const colorsBackground = {'purple': '#68279A', 'pink': '#976081', 'blue': '#2E5287'};
const rootElement = document.documentElement;

function theme(pri, secon) {
    rootElement.style.setProperty('--primary', `${pri}`);
    rootElement.style.setProperty('--secondary', `${secon}`);
}

esqueletoThemes.addEventListener('click', (e) => {
    if (e.target === Allwhite) {
        theme(themeWhite[0], themeWhite[1]);
    };

    if (e.target === Allblack) {
        theme(themeBlack[0], themeBlack[1]);
    };

    if (e.target === purple) {
        rootElement.style.setProperty('--background', `${colorsBackground.purple}`);
    };

    if (e.target === blue) {
        rootElement.style.setProperty('--background', `${colorsBackground.blue}`);
    };

    if (e.target === pink) {
        rootElement.style.setProperty('--background', `${colorsBackground.pink}`);
    };
});


