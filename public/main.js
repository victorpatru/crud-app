const update = document.querySelector('#update-button')
const deleteButton = document.querySelector('#delete-button')
const messageDiv = document.querySelector('#message')

// Listen for a click on the update button in our ejs rendering of the html file
update.addEventListener('click', _ => {
    // Calling our own API (created in server.js)
  fetch('/quotes', {
      // These are just additional options tied to our API call of /quotes
      // We tell that we want to update and give it a content-type
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      // Besides metadata like contentype and method
      // we also actual information in the form of a JSON object (with a name and quote)
      // This is done creating a object and using the stringify method to ultimately send a JSON
      // What we send is name and quote => this is how we pass data
      body: JSON.stringify({
          name: 'Darth Vader',
          quote: 'I find your lack of faith disturbing.'
      })
  })
  .then(res => {
      // if our fetch returns a promise and that promise has ok (200 code) then create another promise with the json version
      if (res.ok) return res.json()
  })
  .then(response => {
      window.location.reload(true)
  })
})

// Our remove button
deleteButton.addEventListener('click', _ => {
    // Makes a fetch request to our quotes path
    fetch('/quotes', {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'Darth Vader' // here we only need the name as a way to match and remove the instance from our database
        })
    })
    .then(res => {
        if (res.ok) return res.json() // make sure what we pass is formatted in json
    })
    .then(response => {
        // This is how we are going to change the HTML file to let the user know there are no more 'Darth Vader' instances to remove
        // This info is done helping index.ejs
        if (response === 'No quote to delete') {
            messageDiv.textContent = 'No Darth Vader quote to delete'
        } else {
            window.location.reload()
        }
    })
})