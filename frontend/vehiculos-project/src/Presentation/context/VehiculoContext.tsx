import React from 'react';
import {Vehiculo} from "../../Domain/entities/Vehiculos"


export const VehiculoInitialState: Vehiculo = {

    id: '',
    placa: '',
    numero_economico:'',
    vin: '', 
    asientos: 0,
    seguro: '',
    seguro_numero: 0,
    brand: '',
    model: '',
    year: 0,
    color: ''
}


export interface VehiculosContextProps{
     vehiculo : Vehiculo,

     

}