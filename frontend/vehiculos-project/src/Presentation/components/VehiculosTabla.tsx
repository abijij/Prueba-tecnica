// VehicleTable.tsx

import React from 'react';
import { Vehiculo } from '../../Domain/entities/Vehiculos';

interface VehicleTableProps {
    vehicles: Vehiculo[];
    openModal: (op: number, id: string, placa: string, numero_economico: string, vim: string, asientos: number, seguro: string, seguro_numero: number, brand: string, model: string, year: number, color: string, lat: string, lng: string, ubicacion: string) => void;
    deleteVehiculo: (vehiculo: Vehiculo) => void;
    currentPage: number;
    vehiclesPerPage: number;
    handlePageChange: (page: number) => void;
}

const VehicleTable: React.FC<VehicleTableProps> = ({ vehicles, openModal, deleteVehiculo, currentPage, vehiclesPerPage, handlePageChange }) => {
    const indexOfLastVehicle = currentPage * vehiclesPerPage;
    const indexOfFirstVehicle = indexOfLastVehicle - vehiclesPerPage;
    const currentVehicles = vehicles.slice(indexOfFirstVehicle, indexOfLastVehicle);

    return (
        <div className='table-responsive'>
            <table className='table table-bordered table-sm'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Placa</th>
                        <th>Numero economico</th>
                        <th>Vim</th>
                        <th>Asientos</th>
                        <th>Seguro</th>
                        <th>Numero Seguro</th>
                        <th>Brand</th>
                        <th>Model</th>
                        <th>Year</th>
                        <th>Color</th>
                    </tr>
                </thead>
                <tbody className='table-group-divider'>
                    {currentVehicles.map((vehiculo) => (
                        <tr key={vehiculo.id}>
                            <td className='table-cell'>{vehiculo.id}</td>
                            <td className='table-cell'>{vehiculo.placa}</td>
                            <td className='table-cell'>{vehiculo.numero_economico}</td>
                            <td className='table-cell'>{vehiculo.vim}</td>
                            <td>{vehiculo.asientos}</td>
                            <td className='table-cell'>{vehiculo.seguro}</td>
                            <td className='table-cell'>{vehiculo.seguro_numero}</td>
                            <td className='table-cell'>{vehiculo.brand}</td>
                            <td>{vehiculo.model}</td>
                            <td className='table-cell'>{vehiculo.year}</td>
                            <td className='table-cell'>{vehiculo.color}</td>
                            <td className='table-cell'>
                                <button onClick={() => openModal(2, vehiculo.id || '', vehiculo.placa || '', vehiculo.numero_economico || '', vehiculo.vim || '', vehiculo.asientos || 0, vehiculo.seguro || '', vehiculo.seguro_numero || 0, vehiculo.brand || '', vehiculo.model || '', vehiculo.year || 0, vehiculo.color || '', vehiculo.lat || '', vehiculo.lng || '', vehiculo.ubicacion || '')} className='btn btn-warning' data-bs-toggle='modal' data-bs-target='#modalVehiculos'>
                                    <i className='fa-solid fa-edit'></i>
                                </button>
                            </td>
                            <td className='table-cell'>
                                <button
                                    onClick={() => deleteVehiculo(vehiculo)}
                                    className='btn btn-danger'>
                                    <i className='fa-solid fa-trash'></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <nav>
                <ul className="pagination">
                    {Array.from({ length: Math.ceil(vehicles.length / vehiclesPerPage) }, (_, index) => (
                        <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                                {index + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default VehicleTable;
