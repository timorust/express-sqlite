const express = require('express')

const path = require('path')

const bk_repo = require('./book-repo')

const port = 8080;
const app = express();



// to server STATIC page
app.use(express.static(path.join(__dirname, '/')))

// for POST json in body
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

app.get('/books', async(req, res) => {
  const book = await bk_repo.getAllBook(); // ('books').select('*').where('id', 1)
  res.status(200).json({book})

});

app.post('/books', async(req, res) => {
  try 
  {
    bk = req.body
    const result = await bk_repo.postBook();
    res.status(201).json({
      res: 'success',
      url: `localhost:8080/books/${bk.ID}`,
      result
    })
  }
  catch(e) {
    res.status(400).send({
      status: 'fail',
      message: e.message
    })
  }
})

app.listen(port, () => console.log(`Listening to port ${port}`))