const express=require('express');
const cors=require('cors');

const models=require('./models');

const app=express();
app.use(cors());
app.use(express.json());

let cliente=models.Cliente;
let servico=models.Servico;
let pedido=models.Pedido;

app.post('/servicos',async(req,res)=>{
    let create=await servico.create(
         req.body
    );
    res.send('Serviço foi inserido!');
});

//DesafioAula3:
app.post('/clientes',async(req,res)=>{
    let create=await cliente.create(
        req.body
        );
    res.send('Cliente foi inserido!');
});

//DesafioAula3:
app.post('/pedidos',async(req,res)=>{
    let create=await pedido.create(
        req.body
        );
    res.send('Pedido foi inserido!');
});

app.get('/', function(req,res){
    res.send('Olá Mundo!');
});

app.get('/Listacliente', function(req,res){
    res.send('Lista de clientes!');
});

app.get('/Listapedido', function(req,res){
    res.send('Lista de pedidos!');
});

app.get('/Listaservico', function(req,res){
    res.send('Lista de serviços!');
});

app.get('/listaservicos', async(req,res)=>{
    await servico.findAll({
     //   raw:true
        order: [['nome','DESC']]
    }).then(function(servicos){
        res.json({servicos})
    });
});

app.get('/ofertas', async(req,res)=>{
    await servico.count('id')
    .then(function(servicos){
        res.json(servicos);
    });
});

app.get('/servico/:id', async(req,res)=>{
    servico.findByPk(req.params.id)
    .then(servico =>{
        return res.json({
            error: false,
            servico
        });
    }).catch(function(erro){
        return res.status(400).json({
            error:true,
            message: "Código não cadastrado!"
        });
    });
});

//ex1:
app.get('/listaclientes', async(req,res)=>{
    await cliente.findAll({
        raw:true
    }).then(function(clientes){
        res.json({clientes})
    });
}); 

//ex2:
app.get('/clientesantq', async(req,res)=>{
    await cliente.findAll({
        order: [['createdAt']]
    }).then(function(clientes){
        res.json({clientes})
    });
});

//ex3:
app.get('/listapedidos', async(req,res)=>{
    await pedido.findAll({
        raw:true
    }).then(function(pedidos){
        res.json({pedidos})
    });
}); 

//ex4:
app.get('/listavalor', async(req,res)=>{
    await pedido.findAll({  
        order: [['valor','DESC']]
    }).then(function(pedidos){
        res.json({pedidos})
    });
}); 


//ex5:
app.get('/qtdclientes', async(req,res)=>{
    await cliente.count('id')
    .then(function(clientes){
        res.json(clientes);
    });
});

//ex6:
app.get('/qtdpedidos', async(req,res)=>{
    await pedido.count('id')
    .then(function(pedidos){
        res.json(pedidos);
    });
});

//DesafioAula4:
app.get('/valorpedidos/:id', async(req,res)=>{
    await pedido.sum('valor', { where: { ClienteId:(req.params.id)} 
    }).then(function(pedidos){
        res.json(pedidos);
    });
});

app.get('/atualizaservico', async(req,res)=>{
    await servico.findByPk(1)
    .then(servico =>{
        servico.nome='HTML/CSS/JS';
        servico.descricao="Páginas estáticas e dinâmicas estilizadas";
        servico.save();
        return res.json({servico});
    });
});

app.put('/editarservico',(req,res)=>{
    servico.update(req.body,{
        where: {id: req.body.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Serviço foi alterado com sucesso."
        });
        }).catch(function(erro){
            return res.status(400).json({
            error: true, 
            message: "Erro na alteração do serviço."
        });
    });
});

app.get('/servicospedidos', async(req,res)=>{
    await servico.findByPk(1, {include:[{all:true}]
    }).then(servico =>{
        return res.json({servico});
    });
});

app.put('/editarpedido', (req,res)=>{
    pedido.update(req.body,{
        where: {ServicoId: req.body.ServicoId}
    }).then(function(){
        return res.json({
            error: false,
            message: "Pedido modificado com sucesso."
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Não foi possível modificar o pedido."
        });
    });
});

//ex.1
app.get('/servicoscliente/:id', async (req, res)=>{     
    await servico.findAll({ where: { ClienteId: [req.params.id]  } })
    .then(function(servicos){
        res.json(servicos)        
    });
    console.log(servicos)
    });

//ex.2
app.put('/editarcliente',(req,res)=>{
    cliente.update(req.body,{
        where: {id: req.body.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Cliente foi alterado com sucesso."
        });
        }).catch(function(erro){
            return res.status(400).json({
            error: true, 
            message: "Erro na alteração do serviço."
        });
    });
});

//ex3
app.put('/editarpedido',(req,res)=>{
    pedido.update(req.body,{
        where: {id: req.body.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Serviço foi alterado com sucesso."
        });
        }).catch(function(erro){
            return res.status(400).json({
            error: true, 
            message: "Erro na alteração do serviço."
        });
    });
});

app.get('/excluircliente', async(req,res)=>{
    cliente.destroy({
        where:{id: 2}
    });
});

app.delete('/apagarcliente/:id', (req,res)=>{
    cliente.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Cliente foi excluído com sucesso."
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Não foi possível excluir o cliente."
        });
    });
});

//desafio aula 5-1: 
app.get('/pedidoscliente/:id', async (req, res)=>{     
    await pedido.findAll({ where: { ClienteId: [req.params.id]  } })
    .then(function(pedidos){
        res.json(pedidos)        
    });
    console.log(pedidos,valor,ClienteId)
    });

//desafio aula 5-2: 
app.put('/editarpedidocliente/:id',(req,res)=>{
    pedido.update(req.body,{
            where: {id: req.params.id}
        }).then(function(){
            return res.json({
                error: false,
                message: "Pedido alterado com sucesso."
            });
        }).catch(function(erro){
            return res.status(400).json({
                error: true,
                message: "Não foi possível editar o pedido."
            });
        });
    });

let port=process.env.PORT || 3000;

app.listen(port,(req,res)=>{
    console.log('Servidor ativo');
});