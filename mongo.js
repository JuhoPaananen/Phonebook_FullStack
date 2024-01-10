const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
  `mongodb+srv://juhopaananen:${password}@cluster0.y2ks6iw.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', noteSchema)

if (process.argv.length === 3) {
  console.log('phonebook:')
  Person
    .find({})
    .then(result => {
      result.forEach(note => {
        console.log(note.name, note.number)
      })
      mongoose.connection.close()
      process.exit(1)
    }
    )
} else if (process.argv.length === 5) {
  const note = new Person({
    name: name,
    number: number,
  })

  note.save().then(result => {
    console.log('note saved!')
    mongoose.connection.close()
    process.exit(1)
  })
} else {
  console.log('wrong number of arguments')
  process.exit(1)
}

