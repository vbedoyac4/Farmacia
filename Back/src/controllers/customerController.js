const controller = {};

controller.list = (req, res) => {
   req.getConnection((err, conn) => {
    conn.query('SELECT * FROM Empleado', (err, customers) => {
        if(err) {
            res.json(err);
        }
        console.log(customers);
        res.render('customers', {
            data: customers
        });
    });
   });  
};






module.exports = controller; 

