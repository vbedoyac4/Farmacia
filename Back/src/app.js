const cors = require('cors');
const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const bodyParser = require('body-parser')


app.use(bodyParser.urlencoded({extended: false}))
app.use(cors())
app.options('*', cors());
app.use(bodyParser.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
//Importar Rutas

const customerRoutes = require('./routes/customer');

//Configuracion
//Buscar purto etablecido, si no hay selleccionar 3000
app.set('port', process.env.PORT || 3000);
//Plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views') );

const connection = mysql.createConnection({
    host: 'localhost', 
    user: 'tester',
    password: 'clave123',
    database: 'farmacia',
   // multipleStatements: true
})


//////////////////////PROCEDIMIENTOS EMPLEADO ////////////////////////////

//Agregar empleado
app.post('/add_empleado', (req, res) =>{

    //Conexion
    console.log("Tratando de agregar empleado..")
    console.log("Nombre: "+ req.body.nombre)
    console.log("Cargo: "+ req.body.cargo)
    console.log("User: "+ req.body.user)
    console.log("Password: "+ req.body.password)
   
    const nombre = req.body.nombre
    const cargo = req.body.cargo
    const user = req.body.user
    const password = req.body.password

    const queryString = "INSERT INTO empleado (nombre, cargo, user, password)  VALUES  (?,?,?,?)"
    connection.query(queryString, [nombre, cargo, user, password], (err, results, fields) =>{
        if (err){
            console.log("Error el empleado: "+ err)
            res.sendStatus(500)
            return
        }

        console.log("Se agrego empleado con id: ", results.insertId);
        res.end() 
        
    } )
})

//Editar empleado
app.put('/edit_empleado/:id', (req, res) =>{

    //Conexion 
    console.log("Tratando de editar un empleado..")
    console.log("Nombre: "+ req.body.nombre)
    console.log("Cargo: "+ req.body.cargo)
    console.log("User: "+ req.body.user)
    console.log("Password: "+ req.body.password)
   
    const idempleado = req.params.id
    const nombre = req.body.nombre
    const cargo = req.body.cargo
    const user = req.body.user
    const password = req.body.password

    console.log(idempleado)
    const queryString = "UPDATE empleado SET nombre = ?, cargo = ?, user = ?, password = ? WHERE usuario = ?"
    connection.query(queryString, [nombre, cargo, user, password, idempleado], (err, results, fields) =>{
        if (err){
            console.log("Error al editar empleado: "+ err)
            res.sendStatus(400)
            return
        }

        console.log("Se edito empleado con id: ", results.affectedRows);
        res.end() 
        
    } )
})


//Eliminar empleado
app.delete('/delete_empleado/:id', (req, res) => {
    console.log("Eliminar empleado con id: "+ req.params.id)
//Conexion

const idempleado = req.params.id
const queryString = "DELETE FROM empleado WHERE idempleado =?"
connection.query(queryString, [idempleado],(err, rows, fields) => {
    if(err){
        console.log("No existe empleado " + err)
        res.sendStatus(500)
        res.end()
        return
    }
    console.log("empleado Eliminado")
    res.json(rows)
})
});

//Seleccionar empleado
app.get('/empleado/:id', (req, res) => {
    console.log("Seleccionar empleado con id: "+ req.params.id)
//Conexion

const idempleado= req.params.id
const queryString = "SELECT nombre, user FROM empleado WHERE user = ?"
connection.query(queryString, [idempleado],(err, rows, fields) => {
    if(err){
        console.log("No existe la empleado " + err)
        res.sendStatus(500)
        res.end()
        return
    }
    console.log("empleado Seleccionada")
    res.json(rows)
})
});


//Seleccionar todos los empleados
app.get('/empleados', (req, res) => {
    console.log("Seleccionar todos los empleados")
//Conexion

const queryString = "SELECT idempleado, nombre, cargo, user FROM empleado"
connection.query(queryString,(err, rows, fields) => {
    if(err){
        console.log("No hay empleados " + err)
        res.sendStatus(500)
        res.end()
        return
    }
    console.log("Empleados Seleccionados")
    res.json(rows)
})
});


//////////////////////////////////////////////////////////

////////////////////////PROCEDIMIENTOS SUCURSAL///////////////////////////////////

//Agregar Sucursal
app.post('/add_sucursal', (req, res) =>{

    //Conexion
    console.log("Tratando de agregar sucursal..")
    console.log("Nombre: "+ req.body.nombre)
    console.log("Direccion: "+ req.body.direccion)
    console.log("Ciudad: "+ req.body.ciudad)
    console.log("Telefono: "+ req.body.telefono)
   
    const nombre = req.body.nombre
    const direccion = req.body.direccion
    const ciudad = req.body.ciudad
    const telefono = req.body.telefono

    const queryString = "INSERT INTO sucursal (nombre, direccion, ciudad, telefono)  VALUES  (?,?,?,?)"
    connection.query(queryString, [nombre, direccion, ciudad, telefono], (err, results, fields) =>{
        if (err){
            console.log("Error el sucursal: "+ err)
            res.sendStatus(500)
            return
        }

        console.log("Se agrego sucursal con id: ", results.insertId);
        res.end() 
        
    } )
})

//Editar Sucursal
app.put('/edit_sucursal/:id', (req, res) =>{

    //Conexion 
    console.log("Nombre: "+ req.body.nombre)
    console.log("Direccion: "+ req.body.direccion)
    console.log("Ciudad: "+ req.body.ciudad)
    console.log("Telefono: "+ req.body.telefono)
   
    const idsucursal = req.params.id
    const nombre = req.body.nombre
    const direccion = req.body.direccion
    const ciudad = req.body.ciudad
    const telefono = req.body.telefono
   
    
    console.log(idsucursal)
    const queryString = "UPDATE sucursal SET nombre = ?, direccion = ?, ciudad = ?, telefono = ? WHERE idsucursal = ?"
    connection.query(queryString, [nombre, direccion, ciudad, telefono, idsucursal], (err, results, fields) =>{
        if (err){
            console.log("Error al editar sucursal: "+ err)
            res.sendStatus(400)
            return
        }

        console.log("Se edito sucursal con id: ", results.affectedRows);
        res.end() 
        
    } )
})

//Eliminar sucursal
app.delete('/delete_sucursal/:id', (req, res) => {
    console.log("Eliminar sucursal con id: "+ req.params.id)
//Conexion

const idsucursal = req.params.id
const queryString = "DELETE FROM sucursal WHERE idsucursal =?"
connection.query(queryString, [idsucursal],(err, rows, fields) => {
    if(err){
        console.log("No existe sucursal " + err)
        res.sendStatus(500)
        res.end()
        return
    }
    console.log("sucursal Eliminado")
    res.json(rows)
})
});

//Seleccionar sucursal
app.get('/sucursal/:id', (req, res) => {
    console.log("Seleccionar sucursal con id: "+ req.params.id)
//Conexion

const idsucursal= req.params.id
const queryString = "SELECT nombre, direccion, ciudad, telefono FROM sucursal WHERE idsucursal = ?"
connection.query(queryString, [idsucursal],(err, rows, fields) => {
    if(err){
        console.log("No existe la sucursal " + err)
        res.sendStatus(500)
        res.end()
        return
    }
    console.log("sucursal Seleccionada")
    res.json(rows)
})
});


//Seleccionar todos los sucursals
app.get('/sucursales', (req, res) => {
    console.log("Seleccionar todos los sucursales")
//Conexion

const queryString = "SELECT * FROM sucursal"
connection.query(queryString,(err, rows, fields) => {
    if(err){
        console.log("No hay sucursals " + err)
        res.sendStatus(500)
        res.end()
        return
    }
    console.log("sucursals Seleccionados")
    res.json(rows)
})
});

//////////////////////////////////////////////////////////

////////////////////////PROCEDIMIENTOS MEDICAMENTO///////////////////////////////////

//Agregar medicamento
app.post('/add_medicamento', (req, res) =>{

    //Conexion
    console.log("Tratando de agregar medicamento..")
    console.log("Nombre: "+ req.body.medicamento) 
    console.log("Existencia: "+ req.body.existencia)
    console.log("IdSucursal: "+ req.body.sucursal)
    console.log("RegSanitario: "+ req.body.reg_sanitario)
    console.log("Lote: "+ req.body.lote)
    console.log("F_manu: "+ req.body.f_manu)
    console.log("IF_expi: "+ req.body.f_expi)
    console.log("IF_expi: "+ req.body.presentacion)

   
    const nombre = req.body.medicamento
    const existencia = req.body.existencia
    const idsucursal = req.body.sucursal
    const reg_sanitario = req.body.reg_sanitario
    const lote = req.body.lote
    const f_manu = req.body.f_manu
    const f_expi = req.body.f_expi
    const presentacion = req.body.presentacion

    const queryString = "INSERT INTO medicamento (nombre , existencia, idsucursal, reg_sanitario, lote, f_manu, f_expi, presentacion) VALUES (?,?,(Select idsucursal from sucursal  where nombre = ?),?,?,?,?,?)"
    connection.query(queryString, [nombre, existencia, idsucursal, reg_sanitario, lote, f_manu, f_expi, presentacion], (err, results, fields) =>{
        if (err){
            console.log("Error el medicamento: "+ err)
            res.sendStatus(500)
            return
        }

        console.log("Se agrego medicamento con id: ", results.insertId);
        res.end() 
        
    } )
})

//Editar medicamento
app.put('/edit_medicamento/:id', (req, res) =>{

    //Conexion 
    console.log("Tratando de agregar medicamento..")
    console.log("Nombre: "+ req.body.nombre)
    console.log("Existencia: "+ req.body.existencia)
    console.log("Precio: "+ req.body.precio)
    console.log("Costo: "+ req.body.costo)
    console.log("IdSucursal: "+ req.body.idsucursal)
    console.log("Lote: "+ req.body.lote)
    console.log("F_manu: "+ req.body.f_manu)
    console.log("IF_expi: "+ req.body.f_expi)

    const idmedicamento = req.params.id
    const nombre = req.body.nombre
    const existencia = req.body.existencia
    const precio = req.body.precio
    const costo = req.body.costo
    const idsucursal = req.body.idsucursal
    const lote = req.body.lote
    const f_manu = req.body.f_manu
    const f_expi = req.body.f_expi
   
       
    console.log(idmedicamento)
    const queryString = "UPDATE medicamento SET nombre = ?, existencia = ?, precio = ?, costo = ?, idsucursal = ?, lote = ?, f_manu = ?, f_expi = ? WHERE idmedicamento = ?"
    connection.query(queryString, [nombre, existencia, precio, costo, idsucursal, idmedicamento], (err, results, fields) =>{
        if (err){
            console.log("Error al editar medicamento: "+ err)
            res.sendStatus(400)
            return
        }

        console.log("Se edito medicamento con id: ", results.affectedRows);
        res.end() 
        
    } )
})

//Eliminar medicamento
app.delete('/delete_medicamento/:id', (req, res) => {
    console.log("Eliminar medicamento con id: "+ req.params.id)
//Conexion

const idmedicamento = req.params.id
const queryString = "DELETE FROM medicamento WHERE idmedicamento =?"
connection.query(queryString, [idmedicamento],(err, rows, fields) => {
    if(err){
        console.log("No existe medicamento " + err)
        res.sendStatus(500)
        res.end()
        return
    }
    console.log("medicamento Eliminado")
    res.json(rows)
})
});

//Seleccionar medicamento
app.get('/medicamento/:id', (req, res) => {
    console.log("Seleccionar medicamento con id: "+ req.params.id)
//Conexion

const idmedicamento= req.params.id
const queryString = "SELECT m.nombre, m.existencia, s.nombre, m.reg_sanitario as reg_sanitario, m.lote as lote, m.f_manu as f_manu, m.f_expi as f_expi, m.presentacion as presentacion FROM medicamento AS m INNER JOIN sucursal AS s ON m.idsucursal = s.idsucursal WHERE s.nombre = ?"
connection.query(queryString, [idmedicamento],(err, rows, fields) => {
    if(err){
        console.log("No existe la medicamento " + err)
        res.sendStatus(500)
        res.end()
        return
    }
    console.log("medicamento Seleccionada")
    res.json(rows)
})
});


//Seleccionar todos los medicamentos
app.get('/medicamentos', (req, res) => {
    console.log("Seleccionar todos los medicamentoes")
//Conexion

const queryString = "SELECT m.idmedicamento as idmedicamento ,m.nombre as medicamento, m.existencia, s.nombre as sucursal, m.reg_sanitario as reg_sanitario, m.lote as lote, m.f_manu as f_manu, m.f_expi as f_expi, m.presentacion as presentacion FROM medicamento AS m INNER JOIN sucursal AS s ON m.idsucursal = s.idsucursal"
connection.query(queryString,(err, rows, fields) => {
    if(err){
        console.log("No hay medicamentos " + err)
        res.sendStatus(500)
        res.end()
        return
    }
    console.log("medicamentos Seleccionados")
    res.json(rows)
})
});

//////////////////////////////////////////////////////////

////////////////////////PROCEDIMIENTOS cliente///////////////////////////////////

//Agregar cliente
app.post('/add_cliente', (req, res) =>{

    //Conexion
    console.log("Tratando de agregar cliente..")
    console.log("Nombre: "+ req.body.nombre)
    console.log("Identidad: "+ req.body.identidad)
    console.log("Direccion: "+ req.body.direccion)
    console.log("Ciudad: "+ req.body.ciudad)
    console.log("Telefono: "+ req.body.telefono)
   
    const nombre = req.body.nombre
    const identidad = req.body.identidad
    const direccion = req.body.direccion
    const ciudad = req.body.ciudad
    const telefono = req.body.telefono

    const queryString = "INSERT INTO cliente (nombre,identidad, direccion, ciudad, telefono)  VALUES  (?,?,?,?,?)"
    connection.query(queryString, [nombre, identidad, direccion, ciudad, telefono], (err, results, fields) =>{
        if (err){
            console.log("Error el cliente: "+ err)
            res.sendStatus(500)
            return
        }

        console.log("Se agrego cliente con id: ", results.insertId);
        res.end() 
        
    } )
})

//Editar cliente
app.put('/edit_cliente/:id', (req, res) =>{

    //Conexion 
    console.log("Nombre: "+ req.body.nombre)
    console.log("Identidad: "+ req.body.identidad)
    console.log("Direccion: "+ req.body.direccion)
    console.log("Ciudad: "+ req.body.ciudad)
    console.log("Telefono: "+ req.body.telefono)
   
    const idcliente = req.params.id
    const identidad = req.body.identidad
    const nombre = req.body.nombre
    const direccion = req.body.direccion
    const ciudad = req.body.ciudad
    const telefono = req.body.telefono
   
    
    console.log(idcliente)
    const queryString = "UPDATE cliente SET nombre = ?, identidad = ? , direccion = ?, ciudad = ?, telefono = ? WHERE idcliente = ?"
    connection.query(queryString, [nombre, identidad, direccion, ciudad, telefono, idcliente], (err, results, fields) =>{
        if (err){
            console.log("Error al editar cliente: "+ err)
            res.sendStatus(400)
            return
        }

        console.log("Se edito cliente con id: ", results.affectedRows);
        res.end() 
        
    } )
})

//Eliminar cliente
app.delete('/delete_cliente/:id', (req, res) => {
    console.log("Eliminar cliente con id: "+ req.params.id)
//Conexion

const idcliente = req.params.id
const queryString = "DELETE FROM cliente WHERE idcliente =?"
connection.query(queryString, [idcliente],(err, rows, fields) => {
    if(err){
        console.log("No existe cliente " + err)
        res.sendStatus(500)
        res.end()
        return
    }
    console.log("cliente Eliminado")
    res.json(rows)
})
});

//Seleccionar cliente
app.get('/cliente/:id', (req, res) => {
    console.log("Seleccionar cliente con id: "+ req.params.id)
//Conexion

const idcliente= req.params.id
const queryString = "SELECT nombre,identidad, direccion, ciudad, telefono FROM cliente WHERE idcliente = ?"
connection.query(queryString, [idcliente],(err, rows, fields) => {
    if(err){
        console.log("No existe la cliente " + err)
        res.sendStatus(500)
        res.end()
        return
    }
    console.log("cliente Seleccionada")
    res.json(rows)
})
});


//Seleccionar todos los clientes
app.get('/clientes', (req, res) => {
    console.log("Seleccionar todos los clientes")
//Conexion

const queryString = "SELECT * FROM cliente"
connection.query(queryString,(err, rows, fields) => {
    if(err){
        console.log("No hay clientes " + err)
        res.sendStatus(500)
        res.end()
        return
    }
    console.log("clientes Seleccionados")
    res.json(rows)
})
});

//////////////////////////////////////////////////////////

////////////////////////PROCEDIMIENTOS medico///////////////////////////////////

//Agregar medico
app.post('/add_medico', (req, res) =>{

    //Conexion
    console.log("Tratando de agregar medico..")
    console.log("Nombre: "+ req.body.nombre)
    console.log("Identidad: "+ req.body.identidad)
    console.log("Tarjeta Profesional: "+ req.body.t_profesional)
    console.log("Direccion: "+ req.body.direccion)
    console.log("Centro de Salud: "+ req.body.centro_s)
    console.log("Ciudad: "+ req.body.ciudad)
    console.log("Telefono: "+ req.body.telefono)
   
    const nombre = req.body.nombre
    const identidad = req.body.identidad
    const t_profesional = req.body.t_profesional
    const direccion = req.body.direccion
    const centro_s = req.body.centro_s
    const ciudad = req.body.ciudad
    const telefono = req.body.telefono

    const queryString = "INSERT INTO medico (nombre,identidad, t_profesional, direccion, centro_s, ciudad, telefono)  VALUES  (?,?,?,?,?,?,?)"
    connection.query(queryString, [nombre, identidad,t_profesional, direccion, centro_s, ciudad, telefono], (err, results, fields) =>{
        if (err){
            console.log("Error el medico: "+ err)
            res.sendStatus(500)
            return
        }

        console.log("Se agrego medico con id: ", results.insertId);
        res.end() 
        
    } )
})

//Editar medico
app.put('/edit_medico/:id', (req, res) =>{

    //Conexion 
    console.log("Tratando de agregar medico..")
    console.log("Nombre: "+ req.body.nombre)
    console.log("Identidad: "+ req.body.identidad)
    console.log("Identidad: "+ req.body.t_profesional)
    console.log("Direccion: "+ req.body.direccion)
    console.log("Centro de Salud: "+ req.body.centro_s)
    console.log("Ciudad: "+ req.body.ciudad)
    console.log("Telefono: "+ req.body.telefono)
   
    const idmedico = req.params.id
    const nombre = req.body.nombre
    const identidad = req.body.identidad
    const t_profesional = req.body.t_profesional
    const direccion = req.body.direccion
    const centro_s = req.body.centro_s
    const ciudad = req.body.ciudad
    const telefono = req.body.telefono
   
    
    console.log(idmedico)
    const queryString = "UPDATE medico SET nombre = ?, identidad = ? , t_profesional = ?, direccion = ?, centro_s = ?, ciudad = ?, telefono = ? WHERE idmedico = ?"
    connection.query(queryString, [nombre, identidad, t_profesional, direccion,centro_s, ciudad, telefono, idmedico], (err, results, fields) =>{
        if (err){
            console.log("Error al editar medico: "+ err)
            res.sendStatus(400)
            return
        }

        console.log("Se edito medico con id: ", results.affectedRows);
        res.end() 
        
    } )
})

//Eliminar medico
app.delete('/delete_medico/:id', (req, res) => {
    console.log("Eliminar medico con id: "+ req.params.id)
//Conexion

const idmedico = req.params.id
const queryString = "DELETE FROM medico WHERE idmedico =?"
connection.query(queryString, [idmedico],(err, rows, fields) => {
    if(err){
        console.log("No existe medico " + err)
        res.sendStatus(500)
        res.end()
        return
    }
    console.log("medico Eliminado")
    res.json(rows)
})
});

//Seleccionar medico
app.get('/medico/:id', (req, res) => {
    console.log("Seleccionar medico con id: "+ req.params.id)
//Conexion

const idmedico= req.params.id
const queryString = "SELECT nombre,identidad, t_profesional, direccion, centro_s, ciudad, telefono FROM medico WHERE idmedico = ?"
connection.query(queryString, [idmedico],(err, rows, fields) => {
    if(err){
        console.log("No existe la medico " + err)
        res.sendStatus(500)
        res.end()
        return
    }
    console.log("medico Seleccionada")
    res.json(rows)
})
});


//Seleccionar todos los medicos
app.get('/medicos', (req, res) => {
    console.log("Seleccionar todos los medicos")
//Conexion

const queryString = "SELECT * FROM medico"
connection.query(queryString,(err, rows, fields) => {
    if(err){
        console.log("No hay medicos " + err)
        res.sendStatus(500)
        res.end()
        return
    }
    console.log("medicos Seleccionados")
    res.json(rows)
})
});

////////////////////////PROCEDIMIENTOS entrega///////////////////////////////////

//Agregar entrega
app.post('/add_entrega', (req, res) =>{

    //Conexion
    console.log("Tratando de agregar entrega..")
    console.log("fecha_entrega: "+ req.body.fecha_entrega)
    console.log("f_formula: "+ req.body.f_formula)
    console.log("IdMedico: "+ req.body.idmedico)
    console.log("IdCliente: " + req.body.idempleado)
    console.log("IdEmpleado: "+ req.body.idempleado)
    console.log("IdMedicamento: "+ req.body.idmedicamento)
    console.log("IdSucursal: "+ req.body.idsucursal)
   
    const fecha_entrega = req.body.fecha_entrega
    const f_formula = req.body.f_formula
    const idmedico = req.body.idmedico
    const idcliente = req.body.idcliente
    const idempleado = req.body.idempleado
    const idmedicamento = req.body.idmedicamento
    const idsucursal = req.body.idsucursal

    const queryString = "INSERT INTO entrega (fecha_entrega,f_formula, idmedico, idcliente, idempleado, idmedicamento, idsucursal)  VALUES  (?,?,(SELECT idmedico FROM medico WHERE nombre = ?),(SELECT idcliente FROM cliente WHERE nombre = ?),(SELECT idempleado FROM empleado WHERE nombre = ?),(SELECT idmedicamento FROM medicamento WHERE nombre = ?),(SELECT idsucursal FROM sucursal WHERE nombre = ?))"
    connection.query(queryString, [fecha_entrega, f_formula, idmedico, idcliente, idempleado, idmedicamento, idsucursal], (err, results, fields) =>{
        if (err){
            console.log("Error el entrega: "+ err)
            res.sendStatus(500)
            return
        }

        console.log("Se agrego entrega con id: ", results.insertId);
        res.end() 
        
    } )
})

//Editar entrega
app.put('/edit_entrega/:id', (req, res) =>{

    //Conexion 
    console.log("fecha_entrega: "+ req.body.fecha_entrega)
    console.log("f_formula: "+ req.body.f_formula)
    console.log("IdMedico: "+ req.body.idmedico)
    console.log("IdEmpleado: "+ req.body.idempleado)
    console.log("IdMedicamento: "+ req.body.idmedicamento)
    console.log("IdSucursal: "+ req.body.idsucursal)
   
    const identrega = req.params.id
    const fecha_entrega = req.body.fecha_entrega
    const f_formula = req.body.f_formula
    const idcliente = req.body.idcliente
    const idempleado = req.body.idempleado
    const idmedicamento = req.body.idmedicamento
    const idsucursal = req.body.idsucursal
   
    
    console.log(identrega)
    const queryString = "UPDATE entrega SET nombre = ?, identidad = ? , t_profesional = ?, direccion = ?, centro_s = ?, ciudad = ?, telefono = ? WHERE identrega = ?"
    connection.query(queryString, [nombre, identidad, t_profesional, direccion,centro_s, ciudad, telefono, identrega], (err, results, fields) =>{
        if (err){
            console.log("Error al editar entrega: "+ err)
            res.sendStatus(400)
            return
        }

        console.log("Se edito entrega con id: ", results.affectedRows);
        res.end() 
        
    } )
})

//Eliminar entrega
app.delete('/delete_entrega/:id', (req, res) => {
    console.log("Eliminar entrega con id: "+ req.params.id)
//Conexion

const identrega = req.params.id
const queryString = "DELETE FROM entrega WHERE identrega =?"
connection.query(queryString, [identrega],(err, rows, fields) => {
    if(err){
        console.log("No existe entrega " + err)
        res.sendStatus(500)
        res.end()
        return
    }
    console.log("entrega Eliminado")
    res.json(rows)
})
});

//Seleccionar entrega
app.get('/entrega/:cliente', (req, res) => {
    console.log("Seleccionar entrega con id: "+ req.params.id);
//Conexion
const cliente = req.params.cliente
const identrega= req.params.id
const queryString = "SELECT e.fecha_entrega as fecha_entrega , e.f_formula as f_formula, m.nombre as medico, c.nombre as cliente, em.nombre as empleado, me.nombre as medicamento, s.nombre as sucursal FROM entrega as e INNER JOIN medico as m ON e.idmedico = m.idmedico  INNER JOIN cliente as c ON e.idcliente = c.idcliente INNER JOIN empleado as em ON e.idempleado = em.idempleado INNER JOIN medicamento as me ON e.idmedicamento = me.idmedicamento INNER JOIN sucursal as s ON e.idsucursal = s.idsucursal WHERE c.nombre = ?"
connection.query(queryString, [cliente],(err, rows, fields) => {
    if(err){
        console.log("No existe la entrega " + err)
        res.sendStatus(500)
        res.end()
        return
    }
    console.log("entrega Seleccionada")
    res.json(rows)
})
});


//Seleccionar todos los entregas
app.get('/entregas', (req, res) => {
    console.log("Seleccionar todos los entregas")
//Conexion

const queryString = "SELECT e.fecha_entrega as fecha_entrega , e.f_formula as f_formula, m.nombre as medico, c.nombre as cliente, em.nombre as empleado, me.nombre as medicamento, s.nombre as sucursal FROM entrega as e INNER JOIN medico as m ON e.idmedico = m.idmedico  INNER JOIN cliente as c ON e.idcliente = c.idcliente INNER JOIN empleado as em ON e.idempleado = em.idempleado INNER JOIN medicamento as me ON e.idmedicamento = me.idmedicamento INNER JOIN sucursal as s ON e.idsucursal = s.idsucursal"
connection.query(queryString,(err, rows, fields) => {
    if(err){
        console.log("No hay entregas " + err)
        res.sendStatus(500)
        res.end()
        return
    }
    console.log("entregas Seleccionados")
    res.json(rows)
})
});

//////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////

app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () =>{
    console.log('Server on port 3000');
});