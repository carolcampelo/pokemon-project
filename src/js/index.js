const changeThemeButton = document.querySelector('#change-theme-button');
const body = document.querySelector('body');
const changeThemeButtonImage = document.querySelector('.button-image')

changeThemeButton.addEventListener('click', () => {
    if (body.classList.length === 0) {
        body.classList.add('dark-mode');
        changeThemeButtonImage.setAttribute('src', './src/images/moon.png');
    } else {
        body.classList.remove('dark-mode');
        changeThemeButtonImage.setAttribute('src', './src/images/sun.png');
    }
});
