const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')

weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather?address='+location).then((response) =>{
    response.json().then((data) => {
        if (data.error) {
            return messageOne.textContent = data.error
           //return console.log(data.error)
        }
        messageOne.textContent= data.location
        messageTwo.textContent= data.forecast
    })
})

    console.log(location)
})