const changeThemeButton = document.querySelector('#change-theme-button');
const body = document.querySelector('body');
const changeThemeButtonImage = document.querySelector('.button-image')

changeThemeButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    body.classList.contains('dark-mode') 
        ? changeThemeButtonImage.setAttribute('src', './src/images/moon.png') 
        : changeThemeButtonImage.setAttribute('src', './src/images/sun.png');
});
