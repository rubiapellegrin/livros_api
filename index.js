const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { pool } = require('./config')

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

const getLivros = (request, response) => {
    pool.query('SELECT * FROM livros', (error, results) => {
        if (error) {
            return response.status(401).json({status: 'error', 
            message: 'Erro: ' + error});
        }
        response.status(200).json(results.rows)
    })
}

const addLivros = (request, response) => {
    const { titulo, preco, estoque } = request.body

    pool.query(
        'INSERT INTO livros (titulo, preco, estoque) VALUES ($1, $2, $3)',
        [titulo, preco, estoque],
        (error) => {
            if (error) {
                return response.status(401).json({ status: 'error', 
                message: 'Erro: ' + error });
            }
            response.status(201).json({ status: 'success', message: 'Livro criado.' })
        },
    )
}

const updateLivro = (request, response) => {
    const { codigo, titulo, preco, estoque } = request.body
    pool.query('UPDATE livros set titulo=$1, preco=$2, estoque=$3 where codigo=$4',
        [titulo, preco, estoque, codigo], error => {
            if (error) {
                return response.status(401).json({ status: 'error', 
                message: 'Erro: ' + error });
            }
            response.status(201).json({ status: 'success', message: 'Livro atualizado.' })
        })
}

const deleteLivro = (request, response) => {    
    const codigo = parseInt(request.params.id);
    pool.query('DELETE FROM livros where codigo = $1', [codigo], error => {
        if (error) {
            return response.status(401).json({ status: 'error', 
            message: 'Erro: ' + error });
        }
        response.status(201).json({ status: 'success', message: 'Livro apagado.' })
    })
}

const getLivroPorID = (request, response) => {
    const codigo = parseInt(request.params.id);
    pool.query('SELECT * FROM livros where codigo = $1', [codigo], (error, results) => {
        if (error) {
            return response.status(401).json({ status: 'error', 
            message: 'Erro: ' + error });
        }
        response.status(200).json(results.rows)
    })
}

app
    .route('/livros')
    // GET endpoint
    .get(getLivros)
    // POST endpoint
    .post(addLivros)
    // PUT
    .put(updateLivro)  

app.route('/livros/:id')
    .get(getLivroPorID) 
    .delete(deleteLivro) 


// Start server
app.listen(process.env.PORT || 3002, () => {
    console.log(`Servidor rodando na porta 3002`)
})