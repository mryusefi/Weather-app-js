const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const tempMassage = document.querySelector('#temp-message');
const conditionMassage = document.querySelector('#condition-message');
const locationMassage = document.querySelector('#location-message');
const dateMassage = document.querySelector('#date-message');
const firstMessage = document.querySelector('#first-message');
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    console.log(location);
    firstMessage.textContent = "loading .. ";
    locationMassage.textContent = '';
    tempMassage.textContent = '';
    conditionMassage.textContent = '';
    dateMassage.textContent = '';


    fetch('http://localhost:3000/weather?location=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                firstMessage.textContent = data.error;
                locationMassage.textContent = '';
                tempMassage.textContent = '';
                conditionMassage.textContent = '';
                dateMassage.textContent = '';
            } else {
                firstMessage.textContent = '';
                locationMassage.textContent = data.location;
                tempMassage.textContent = data.temp + "°C";
                conditionMassage.textContent = data.condition;
                dateMassage.textContent = data.date;
            }
        });
    })
})