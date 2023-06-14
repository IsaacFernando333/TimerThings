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
    return [pri, secon];
}

esqueletoThemes.addEventListener('click', (e) => {
    if (e.target === Allwhite) {
        theme(themeWhite[0], themeWhite[1]);
        localStorage.setItem('THEME', JSON.stringify(theme(themeWhite[0], themeWhite[1])));
    };

    if (e.target === Allblack) {
        theme(themeBlack[0], themeBlack[1]);
        localStorage.setItem('THEME', JSON.stringify(theme(themeWhite[1], themeWhite[0])));
    };

    if (e.target === purple) {
        rootElement.style.setProperty('--background', `${colorsBackground.purple}`);
        localStorage.setItem('COLOR', JSON.stringify([colorsBackground.purple]));
    };

    if (e.target === blue) {
        rootElement.style.setProperty('--background', `${colorsBackground.blue}`);
        localStorage.setItem('COLOR', JSON.stringify([colorsBackground.blue]));
    };

    if (e.target === pink) {
        rootElement.style.setProperty('--background', `${colorsBackground.pink}`);
        localStorage.setItem('COLOR', JSON.stringify([colorsBackground.pink]));
    };
});


function garanteThemeAndColor() {
    const th = JSON.parse(localStorage.getItem('THEME'));
    const cl = JSON.parse(localStorage.getItem('COLOR'));
    rootElement.style.setProperty('--background', cl[0]);
    rootElement.style.setProperty('--primary', th[0]);
    rootElement.style.setProperty('--secondary', th[1]);
}

garanteThemeAndColor();