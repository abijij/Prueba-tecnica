import { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { show_alert } from '../../funtions';
import { VehiculoContext } from '../context/VehiculoContext';
import { Vehiculo } from '../../Domain/entities/Vehiculos';
import '../../style.css';
import { GetVehiculosByBrandUseCase } from '../../Domain/useCases/Vehiculos/SearchVehiculoByBrand';
import { GetVehiculoByModelUseCase } from '../../Domain/useCases/Vehiculos/SearchVehiculoByModel';
import { GetVehiculoByYearUseCase } from '../../Domain/useCases/Vehiculos/SearchVehiculoByYear';
import {Maps} from './Maps'
import SearchBar  from './SearchBar'
import VehicleTable from './VehiculosTabla';
import VehicleModal from './VehicleModal';

export const ShowVehiculos = () => {
  const { getAllVehiculos, vehiculos, create, update, remove, saveVehiculosSession } = useContext(VehiculoContext);
  const [title, setTitle] = useState('');
  const [operation, setOperation] = useState(1)
  const [currentPage, setCurrentPage] = useState(1);
  const vehiclesPerPage = 5;
  const [searchType, setSearchType] = useState('Marca');
  const [searchText, setSearchText] = useState('');
  const [searchActive, setSearchActive] = useState(false);
 
  const searchVehiculos = async (name: string, type: string) => {
    if (name.trim() === '') {
      getAllVehiculos();
    } else {
      let result;

      switch (type) {
        case 'brand':
          const brandResult = await GetVehiculosByBrandUseCase(name);
          result = brandResult;
          saveVehiculosSession(result);
          break;
        case 'model':
          const modelResult = await GetVehiculoByModelUseCase(name);
          result = modelResult;
          saveVehiculosSession(result);
          break;
        case 'year':
          const yearResult = await GetVehiculoByYearUseCase(parseInt(name));
          result = yearResult;
          saveVehiculosSession(result);
          break;
        default:
          break;
      }
    }
  };
  const handleSearchClick = (searchText: string, searchType: string) => {
    setSearchActive(true);
    setSearchText(searchText);
    setSearchType(searchType);
  };

  useEffect(() => {
    if (searchActive) {
      searchVehiculos(searchText, searchType);
      setSearchActive(false);
    }
  }, [searchActive, searchText, searchType]);

  const [values, setValues] = useState({
    id: '',
    placa: '',
    numero_economico: '',
    vim: '',
    asientos: 0,
    seguro: '',
    seguro_numero: 0,
    brand: '',
    model: '',
    year: 0,
    color: '',
    lat:'',
    lng:'',
    ubicacion:''
  })
  
  const onChanget = (property: string, value: any) => {
    setValues({ ...values, [property]: value });
  }

  useEffect(() => {
    getAllVehiculos();

  }, [])

  const openModal = (op: number, id: string, placa: string, numero_economico: string, vim: string, asientos: number, seguro: string, seguro_numero: number, brand: string, model: string, year: number, color: string , lat: string, lng: string, ubicacion:string) => {
    setValues({
      id: '',
      placa: '',
      numero_economico: '',
      vim: '',
      asientos: 0,
      seguro: '',
      seguro_numero: 0,
      brand: '',
      model: '',
      year: 0,
      color: '',
      lat: '',
      lng:'',
      ubicacion: ''
    });

    setOperation(op);

    if (op === 1) {
      setTitle('Registrar Vehículo');
    } else if (op === 2) {
      setTitle('Editar Vehículo');
      setValues({
        id,
        placa,
        numero_economico,
        vim,
        asientos,
        seguro,
        seguro_numero,
        brand,
        model,
        year,
        color,
        lat,
        lng,
        ubicacion,
      });
    }

    window.setTimeout(function () {
      const idElement = document.getElementById('id');
      if (idElement) {
        idElement.focus();
      }
    }, 500);
  }
  const checkDuplicate = (placa: string): boolean => {
    const duplicateVehiculo = vehiculos.find((v) => v.placa === placa);
    return !!duplicateVehiculo;
  };
  const validar = async () => {
    if (values.placa.trim() === '') {
      show_alert('Escribe la placa del vehículo', 'warning');
    } else if (values.numero_economico.trim() === '') {
      show_alert('Escribe el número económico del vehículo', 'warning');
    } else if (values.vim.trim() === '') {
      show_alert('Escribe el VIM del vehículo', 'warning');
    } else if (values.asientos <= 0) {
      show_alert('Ingresa un número válido de asientos', 'warning');
    } else if (values.seguro.trim() === '') {
      show_alert('Escribe el tipo de seguro del vehículo', 'warning');
    } else if (values.seguro_numero <= 0) {
      show_alert('Ingresa un número válido para el seguro', 'warning');
    } else if (values.brand.trim() === '') {
      show_alert('Escribe la marca del vehículo', 'warning');
    } else if (values.model.trim() === '') {
      show_alert('Escribe el modelo del vehículo', 'warning');
    } else if (values.year <= 0) {
      show_alert('Ingresa un año válido para el vehículo', 'warning');
    } else if (values.color.trim() === '') {
      show_alert('Escribe el color del vehículo', 'warning');
    } else if (operation === 1 && checkDuplicate(values.placa)) {
      show_alert('Ya existe un vehículo con la misma placa', 'error');
    } else {
      console.log('Formulario válido. Puedes realizar la acción correspondiente.');

      try {
        if (operation === 1) {
          await create(values);
          getAllVehiculos();
          show_alert('Vehículo creado exitosamente', 'success');
        } else if (operation === 2) {
         
          const changesMade = Object.keys(values).some((key) => values[key as keyof typeof values] !== vehiculos.find((v) => v.id === values.id)![key as keyof typeof values]);

          if (changesMade) {
            await update(values);
            getAllVehiculos();
            show_alert('Vehículo actualizado exitosamente', 'success');
          } else {
           
            show_alert('No se realizaron cambios en el vehículo', 'info');
          }
        }
      } catch (error) {
        console.error('Error en la solicitud', error);
        show_alert('Error en la solicitud', 'error');
      }
    }
  };

  const deleteVehiculo = async (vehiculo: Vehiculo) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: '¿Seguro de eliminar el producto ' + vehiculo.id + ' ?',
      icon: 'question',
      text: 'No se podrá dar marcha atrás',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await remove(vehiculo);
        getAllVehiculos();
        show_alert('Vehículo eliminado exitosamente', 'success');
      } else {
        show_alert('El vehículo NO fue eliminado', 'info');
      }
    });
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className='App'>
      <div className='container-fluid'>
      <div className='mt-3'>
        <Maps />
        </div>
        <div className='row mt-3'>
          <div className='col-md-6 offset-md-3'>
            <div className='d-flex justify-content-between align-items-center'>
            <SearchBar onSearch={handleSearchClick} vehicles={vehiculos}  />
              <button onClick={() => openModal(1, '', '', '', '', 0, '', 0, '', '', 0, '', '', '', '')} className='btn btn-dark' data-bs-toggle='modal' data-bs-target='#modalVehiculos'>
                <i className='fa-solid fa-circle-plus'></i> Añadir
              </button>
            </div>
          </div>
        </div>
        <div className='row mt-3'>
          <div className=' '>
          <VehicleTable
              vehicles={vehiculos}
              openModal={openModal}
              deleteVehiculo={deleteVehiculo}
              currentPage={currentPage}
              vehiclesPerPage={vehiclesPerPage}
              handlePageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
      <div id='modalVehiculos' className='modal fade' aria-hidden='true'>
        <div className='modal-dialog'>
        <VehicleModal
            title={title}
            values={values}
            onChanget={onChanget}
            validar={validar}
          />
        </div>
      </div>
    </div>
  )
}

