import React, { useEffect, useState } from 'react';

interface VehicleModalProps {
  title: string;
  values: {
    id: string;
    placa: string;
    numero_economico: string;
    vim: string;
    asientos: number;
    seguro: string;
    seguro_numero: number;
    brand: string;
    model: string;
    year: number;
    color: string;
    lat: string;
    lng: string;
    ubicacion: string;
  };
  onChanget: (property: string, value: any) => void;
  validar: () => void;
}

const VehicleModal: React.FC<VehicleModalProps> = ({ title, values, onChanget, validar }) => {

    const marcasDeVehiculos = [
        "Audi",
        "BMW",
        "Chevrolet",
        "Fiat",
        "Ford",
        "Honda",
        "Hyundai",
        "Jaguar",
        "Kia",
        "Land Rover",
        "Mazda",
        "Mercedes-Benz",
        "Nissan",
        "Peugeot",
        "Renault",
        "Subaru",
        "Tesla",
        "Toyota",
        "Volkswagen",
        "Volvo"
      ];

  const [years, setYears] = useState<number[]>([]);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const startingYear = 1960;
    const yearsArray = Array.from({ length: currentYear - startingYear + 1 }, (_, index) => startingYear + index).reverse();
    setYears(yearsArray);
  }, []);

  return (
    <div className='modal-content'>
      <div className='modal-header'>
              <label className='h5'>{title}</label>
              <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
            </div>
      <div className='modal-body'>
      <input type="hidden" id='id' ></input>
              <div className='input-group mb-3'>
                <span className='input-group-text'><i className='fa-solid fa-car'></i></span>
                <input
                  type="text"
                  id='placa'
                  className='form-control'
                  placeholder='Placa'
                  value={values.placa}
                  onChange={(e) => onChanget('placa', e.target.value)}
                />
              </div>

              <div className='input-group mb-3'>
                <span className='input-group-text'><i className='fa-solid fa-dollar-sign'></i></span>
                <input
                  type="text"
                  id='numero_economico'
                  className='form-control'
                  placeholder='Número Económico'
                  value={values.numero_economico}
                  onChange={(e) => onChanget('numero_economico', e.target.value)}
                />
              </div>

              <div className='input-group mb-3'>
                <span className='input-group-text'><i className='fa-solid fa-note-sticky'></i></span>
                <input
                  type="text"
                  id='vim'
                  className='form-control'
                  placeholder='VIM'
                  value={values.vim}
                  onChange={(e) => onChanget('vim', e.target.value)}
                />
              </div>

              <div className='input-group mb-3'>
                <span className='input-group-text'><i className='fa-solid fa-chair'></i></span>
                <input
                  type="number"
                  id='asientos'
                  className='form-control'
                  placeholder='Asientos'
                  value={values.asientos}
                  onChange={(e) => onChanget('asientos', parseInt(e.target.value, 10))}
                />
              </div>

              <div className='input-group mb-3'>
                <span className='input-group-text'><i className='fa-brands fa-digital-ocean'></i></span>
                <input
                  type="text"
                  id='seguro'
                  className='form-control'
                  placeholder='Seguro'
                  value={values.seguro}
                  onChange={(e) => onChanget('seguro', e.target.value)}
                />
              </div>

              <div className='input-group mb-3'>
                <span className='input-group-text'><i className='fa-solid fa-copyright'></i></span>
                <input
                  type="number"
                  id='seguro_numero'
                  className='form-control'
                  placeholder='Número de Seguro'
                  value={values.seguro_numero}
                  onChange={(e) => onChanget('seguro_numero', parseInt(e.target.value, 10))}
                />
              </div>

              <div className='input-group mb-3'>
                <span className='input-group-text'><i className='fa-solid fa-copyright'></i></span>
                <select
                  id='brand'
                  className='form-select'
                  value={values.brand}
                  onChange={(e) => onChanget('brand', e.target.value)}
                >
                  <option value="">Selecciona una marca</option>
                  {marcasDeVehiculos.map((marca, index) => (
                    <option key={index} value={marca}>{marca}</option>
                  ))}
                </select>
              </div>

              <div className='input-group mb-3'>
                <span className='input-group-text'><i className='fa-solid fa-car-side'></i></span>
                <input
                  type="text"
                  id='model'
                  className='form-control'
                  placeholder='Agrega el Modelo'
                  value={values.model}
                  onChange={(e) => onChanget('model', e.target.value)}
                />
              </div>

              <div className='input-group mb-3'>
                    <span className='input-group-text'><i className='fa-solid fa-calendar-days'></i></span>
                    <select
                      className="form-select"
                      value={values.year}
                      onChange={(e) => onChanget('year', parseInt(e.target.value, 10))}
                    >
                      <option value="">Selecciona un año</option>
                      {years.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className='input-group mb-3'>
                    <span className='input-group-text'><i className='fa-solid fa-droplet'></i></span>
                    <select
                      id='color'
                      className='form-select'
                      value={values.color}
                      onChange={(e) => onChanget('color', e.target.value)}
                    >
                      <option value="">Selecciona un color</option>
                      <option value="red">Rojo</option>
                      <option value="blue">Azul</option>
                      <option value="green">Verde</option>
                      <option value="yellow">Amarillo</option>
                      <option value="orange">Naranja</option>
                      <option value="purple">Púrpura</option>
                      <option value="pink">Rosado</option>
                      <option value="brown">Marrón</option>
                      <option value="black">Negro</option>
                      <option value="white">Blanco</option>
                      <option value="gray">Gris</option>
                      <option value="cyan">Cian</option>
                      <option value="magenta">Magenta</option>
                      <option value="lime">Limón</option>
                      <option value="olive">Oliva</option>
                      <option value="teal">Verde Azulado</option>
                      <option value="navy">Azul Marino</option>
                      <option value="silver">Plata</option>
                      <option value="gold">Oro</option>
                      <option value="indigo">Índigo</option>
                    </select>
                  </div>

              <div className='d-grid col-6 mx-auto'>
                <button onClick={() => validar()} className='btn btn-success'>
                  <i className='fa-solid fa-floppy-disk'></i> Guardar
                </button>
              </div>
      </div>
      <div className='modal-footer'>
        <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default VehicleModal;