// Importing the required modules: express for our server, body-parse as middleware and mongodb for our database
const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const PORT = 3000

// Initialize our server
const app = express()

// How we are going to connect to our database (using existing name and pass info)
const connectionString = '' // insert the code from MongoDB Atlas here

MongoClient.connect(connectionString, { useUnifiedTopology: true })
    .then(client => {
        // .then handler runs only when we have successfully connected to the database
        // the console.log allows us to know whether we are connected to our Mongo DB
        console.log('Connected to Database')
        // Get the quotes from our database
        const db = client.db('star-wars-quotes')
        const quotesCollection = db.collection('quotes')
        // We set up ejs in order to be able to dynamically server content to a HTML file
        app.set('view engine', 'ejs')

        // Middleware => everything that goes between the request we get and the response we send
        app.use(bodyParser.json()) // how our server is able to accept JSON data
        app.use(express.static('public'))
        app.use(bodyParser.urlencoded({ extended: true }))

        // Setting up the listening port
        app.listen(process.env.PORT || PORT , () => {
            console.log(`Listening on port ${PORT}!`)
        })
        // Setting up our landing page
        app.get('/', (req, res) => {
            // Get out of our database the collection of quotes and place them in an array
            db.collection('quotes').find().toArray()
                .then(results => {
                    // Rendering our index.ejs file with the quotes we got from our database
                    // res.render(view, locals) where view is the file we're rendering and locals is the data passed to the file
                    res.render('index.ejs', { quotes: results})
                })
                .catch(error => console.error(error))
            
        })
        // Creating our quotes
        app.post('/quotes', (req, res) => {
            quotesCollection.insertOne(req.body)
                .then(result => {
                    res.redirect('/')
                })
                .catch(error => console.error(error))
        })

        // Updating our database
        app.put('/quotes', (req, res) => {
            quotesCollection.findOneAndUpdate(
                { name: 'Yoda' }, // allows us to filter our database for instances of the name "Yoda"
                {
                    $set: { // this is the new information we use to update the instances of the "Yoda" object
                        // For instance, here we use Darth Vader quotes
                        name: req.body.name,
                        quote: req.body.quote
                    }
                },
                {
                    upsert: true // if there are no instances of "Yoda" name in our database then create a new instance of Darth Vader instead
                }
            )
            .then(result => res.json('Success')) // Given that we update the database what we send back as our response to express is just the stringify version of 'Success'
            .catch(error => console.error(error))
        })

        app.delete('/quotes', (req, res) => {
            // MongoDB collections method that allows us to remove a document from the datavase
            quotesCollection.deleteOne(
                { name: req.body.name } // name we want to match; we're not using hard coded "Darth Vader" because get that from out fetch
            )
                .then(result => {
                    // Check whether there are any more quotes to delete
                    // Notice how what we return (hint: res.json()) is formatted in
                    if (result.deletedCount === 0) {
                        return res.json('No quote to delete')
                    }
                    res.json(`Delete Darth Vadar's quote`)
                })
                .catch(error => console.error(error))
        })
    })
    .catch(error => console.log(error))

