document.getElementById('start-button').addEventListener('click', () => {
    let countdown = 10;
    const countdownElement = document.getElementById('countdown');

    const interval = setInterval(() => {
        countdown--;
        countdownElement.textContent = countdown;

        if (countdown <= 0) {
            clearInterval(interval);
            countdownElement.textContent = 'Time is up!';
        }
    }, 1000);
});
