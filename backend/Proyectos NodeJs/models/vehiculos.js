const db = require('../config/config');
const Vehiculos = {};




Vehiculos.create = (vehiculos, result) => {

    const sql = `
    INSERT INTO
        vehiculos(
            placa,
            numero_economico,
            vim,
            asientos,
            seguro,
            seguro_numero,
            brand,
            model,
            year,
            color
        )
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            
    `;
    db.query(
        sql,
        [
            vehiculos.placa,
            vehiculos.numero_economico,
            vehiculos.vim,
            vehiculos.asientos,
            vehiculos.seguro,
            vehiculos.seguro_numero,
            vehiculos.brand,
            vehiculos.model,
            vehiculos.year,
            vehiculos.color
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Id del nuevo vehiculo:', res.insertId);
                result(null, res.insertId);
            }
        }
    )
}


Vehiculos.update = (vehiculos, result) => {

    const sql = `
    UPDATE
        vehiculos
    SET
        placa = ? ,
        numero_economico = ? ,
        vim = ? ,
        asientos = ? ,
        seguro = ? ,
        seguro_numero = ? ,
        brand = ? ,
        model = ? ,
        year = ? ,
        color = ? 
    WHERE
        id = ? 
            
    `;
    db.query(
        sql,
        [
            vehiculos.placa,
            vehiculos.numero_economico,
            vehiculos.vim,
            vehiculos.asientos,
            vehiculos.seguro,
            vehiculos.seguro_numero,
            vehiculos.brand,
            vehiculos.model,
            vehiculos.year,
            vehiculos.color,
            vehiculos.id
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Id del vehiculo actualizado:', vehiculos.id);
                result(null, vehiculos.id);
            }
        }
    )
}



Vehiculos.delete = (id, result) => {

    const sql = `
    DELETE FROM
        vehiculos
    WHERE
        id = ?
    `;
    db.query(
        sql,
        [id],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Id del producto eliminado:', id);
                result(null, id);
            }
        }
    )
}



Vehiculos.findById = (id, result) => {
    const sql = `
        SELECT
            V.placa,
            V.numero_economico,
            V.vim,
            V.asientos,
            V.seguro,
            V.seguro_numero,
            V.brand,
            V.model,
            V.year,
            V.color
        FROM 
            vehiculos as V
        WHERE
            V.id = ?
    `;

    db.query(
        sql,
        [id],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Vehiculo encontrado:', JSON.stringify(res, null, 3));
                result(null, res);
            }
        }
    );
}

module.exports = Vehiculos;