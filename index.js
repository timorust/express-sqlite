const express = require('express')
const path = require('path')
// const connectedKnex = require('./knex-connector')
const bks_repo = require('./book-repo')

const port = 8080;
const app = express();

// ############ to server STATIC page ############
app.use(express.static(path.join(__dirname, '/')))

// ############## for POST json in body #############
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

// ############ CONNECT TO KNEX  ################
// const connectedKnex = require('./knex-connector')

// app.get('/books', async(req, res) => {
//     const book = await connectedKnex('books').select('*')// .where("id", 1)
//     res.status(200).json({book})
// });

// app.post('/books', async(req, res) => {
//   try 
//   {
//     bks = req.body
//     const result = await connectedKnex('books').insert(bks)
//     res.status(201).json({
//       res: 'success',
//       url: `localhost:8080/books/${bks.ID}`,
//       result
//     })
//   }
//   catch(e) {
//     res.status(400).send({
//       status: 'fail',
//       message: e.message
//     })
//   }
// })

// app.put('/books', async(req, res) => {
//     try
//     {   
//         bks = req.body
//         const result = await connectedKnex("books").where('ID', bks.ID).update(bks);
//         res.status(200).json({
//             res: 'success',
//             url: `localhost:8080/books/${bks.ID}`,
//             result
//         })
//     }
//     catch(e) {
//         res.status(400).send({
//             status: 'fail',
//             message: e.message
//         })
//     }
// })

// app.delete('/books', async(req, res) => {
//     try
//     {
//         bks = req.body
//         const result = await connectedKnex("books").where('ID', bks.ID).del()

//         res.status(200).json({
//             res: 'success',
//             url: `localhost:8080/books/${bks.ID}`,
//             result
//         })
//     }
//     catch(e) {
//         res.status(400).send({
//             status: 'fail',
//             message: e.message
//         })
//     }
// });


// ############### PARAMS #####################
// const connectedKnex = require('./knex-connector')

// app.get('/books/:bk_id', async(req, res) => {
//   const id = req.params.bk_id;
//   const book = await connectedKnex('books').select('*').where('ID', id);
//   res.status(200).json({book})
// })

// app.post('/books/:bk_id', async (req, res) => {
//     try
//     {
//         const id = req.params.bk_id
//         bks = req.body
//         const result = await connectedKnex('books').where('ID', id).insert(bks)
//         res.status(201).json({
//             res: 'success',
//             url: `localhost:8080/books/${id}`,
//             result
//         })
//     }
//     catch(e) {
//         res.status(400).send({
//             status: 'fail',
//             message: e.message
//         })
//     }
// })

// app.put('/books/:bk_id', async(req, res) => {
//     try
//     {
//         const id = req.params.bk_id
//         bks = req.body
//         const result = await connectedKnex("books").where('ID', id).update(bks);
//         res.status(201).json({
//             res: 'success',
//             url: `localhost:8080/books/${id}`,
//             result
//         })
//     }
//     catch(e) {
//         res.status(400).send({
//             status: 'fail',
//             message: e.message
//         })
//     }
// });

// app.delete('/books/:bk_id', async(req, res) => {
//     try
//     {
//         const id = req.params.bk_id
//         bks = req.body
//         const result = await connectedKnex('books').where('ID', id).del(bks)
//         res.status(201).json({
//             res: 'Delete success',
//             url: `localhost:8080/books/${id}`,
//             result
//         })
//     }
//     catch(e) {
//         res.status(400).send({
//             status: 'fail',
//             message: e.message
//         })
//     }
// });

// ############################ REPO PATTERN ####################################################
// const bks_repo = require('./book-repo')

app.get('/books', async(req, res) => {
  const book_list = await bks_repo.getAllBook(); // ('books').select('*').where('id', 1)
  res.status(200).json({book_list})

});

app.post('/books', async (req, res) => {
    try
    {
        bks = req.body
        console.log(bks)
        const result = await bks_repo.addBook(bks)
        res.status(201).json({
            res: 'success',
            url: `localhost:8080/books/${bks.ID}`,
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

app.put('/books/:bks_id', async(req, res) => {
    try
    {
        const bks_id = req.params.bks_id
        bks = req.body
        const result = await bks_repo.updateBook(bks, bks_id)
        res.status(200).json({
            res: 'success',
            url: `localhost:8080/books/${bks.ID}`,
            result
        })
    }
    catch(e) {
        res.status(400).send({
            status: 'fail',
            message: e.message
        })
    }
});

app.delete('/books/:bks_id', async(req, res) => {
    try
    {
        const bks_id = req.params.bks_id
        const result = await bks_repo.deleteBook(bks_id)
        res.status(200).json({
            res: 'success',
            url: `localhost:8080/books/${bks_id}`,
            result
        })
    }
    catch(e) {
        res.status(400).send({
            status: 'fail',
            message: e.message
        })
    }
});

app.listen(port, () => console.log(`Listening to port ${port}`))