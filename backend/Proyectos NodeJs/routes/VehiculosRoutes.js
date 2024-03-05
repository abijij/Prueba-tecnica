
const vehiculosController = require('../controllers/vehiculosController');

module.exports = (app, upload) => {


    app.post('/api/vehiculos/create', vehiculosController.create);

    app.delete('/api/vehiculos/delete/:id', vehiculosController.delete);

    app.put('/api/vehiculos/update',  vehiculosController.update);

    app.get('/api/vehiculos/findById/:id',  vehiculosController.findById);

    

}