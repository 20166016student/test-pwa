if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js').then(registration => {
        console.log('Service Worker registered:', registration);

        // Lắng nghe thông điệp từ Service Worker
        navigator.serviceWorker.addEventListener('message', event => {
            const log = document.getElementById('sw-log');
            const message = event.data;

            if (message.type === 'CACHE_HIT') {
                const li = document.createElement('li');
                li.textContent = `Cache hit: ${message.url}`;
                log.appendChild(li);
            } else if (message.type === 'NETWORK_FETCH') {
                const li = document.createElement('li');
                li.textContent = `Network fetch: ${message.url}`;
                log.appendChild(li);
            }
        });
    }).catch(error => {
        console.error('Service Worker registration failed:', error);
    });
}

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
