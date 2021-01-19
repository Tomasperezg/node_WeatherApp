const weatherForm = document.querySelector('form')

const searchTerm = document.querySelector('input')

const msgOne = document.querySelector('#msg-One')
const msgTwo = document.querySelector('#msg-Two')

// msgOne.textContent = 'From JS'

weatherForm.addEventListener('submit', (event) => {

    event.preventDefault()

    const location = searchTerm.value
    msgOne.textContent = 'Loading.....'
    msgTwo.textContent = ''
    fetch('http://localhost:3000/weather?address='+ encodeURIComponent(location)).then((response) => {
    response.json().then((data) => {
        if (data.error){
            msgOne.textContent = data.error
            msgTwo.textContent = ''
        } else{
            msgOne.textContent = data.location
            msgTwo.textContent = data.forecast
        }
    })
})
})