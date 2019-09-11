////////////////////////PROCEDIMIENTOS entrega///////////////////////////////////

//Agregar entrega
app.post('/add_entrega', (req, res) =>{

    //Conexion
    console.log("Tratando de agregar entrega..")
    console.log("fecha_entrega: "+ req.body.fecha_entrega)
    console.log("f_formula: "+ req.body.f_formula)
    console.log("IdMedico: "+ req.body.idmedico)
    console.log("IdEmpleado: "+ req.body.idempleado)
    console.log("IdMedicamento: "+ req.body.idmedicamento)
    console.log("IdSucursal: "+ req.body.idsucursal)
   
    const fecha_entrega = req.body.fecha_entrega
    const f_formula = req.body.f_formula
    const idcliente = req.body.idcliente
    const idempleado = req.body.idempleado
    const idmedicamento = req.body.idmedicamento
    const idsucursal = req.body.idsucursal

    const queryString = "INSERT INTO entrega (fecha_entrega,f_formula, idcliente, idempleado, idmedicamento, idsucursal)  VALUES  (?,?,(SELECT idcliente FROM cliente WHERE identidad = ?),(SELECT idempleado FROM empleado WHERE nombre = ?),(SELECT idmedico FROM medico WHERE nombre = ?),(SELECT idsucursal FROM sucursal WHERE nombre = ?))"
    connection.query(queryString, [fecha_entrega, f_formula,idcliente, idempleado, idmedicamento, idsucursal], (err, results, fields) =>{
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
app.get('/entrega/:id', (req, res) => {
    console.log("Seleccionar entrega con id: "+ req.params.id)
//Conexion

const identrega= req.params.id
const queryString = "SELECT e.fecha_entrega as fecha_entrega , e.f_formula as f_formula, m.nombre as medico, c.nombre as cliente, em.nombre as empleado, me.nombre as medicamento, s.nombre as sucursal FROM entrega as e INNER JOIN medico as m ON e.idmedico = m.idmedico  INNER JOIN cliente as c ON e.idcliente = c.idcliente INNER JOIN empleado as em ON e.idempleado = em.idempleado INNER JOIN medicamento as me ON e.idmedicamento = me.idmedicamento INNER JOIN sucursal as s ON e.idsucursal = s.idsucursal WHERE identrega = ?"
connection.query(queryString, [identrega],(err, rows, fields) => {
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