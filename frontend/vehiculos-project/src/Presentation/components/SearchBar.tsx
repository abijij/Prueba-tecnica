import React, { useState, ChangeEvent, useEffect } from 'react';
import { Vehiculo } from '../../Domain/entities/Vehiculos';
import { show_alert } from '../../funtions';

interface SearchBarProps {
  onSearch: (name: string, type: string) => void;
  vehicles: Vehiculo[];
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, vehicles }) => {
  const [searchType, setSearchType] = useState('brand');
  const [searchText, setSearchText] = useState('');

  console.log("Contenido de vehículos en SearchBar: " + JSON.stringify(vehicles));

  const handleSearchClick = () => {
    
    const isValid = validateSearch(searchText, searchType);

    if (isValid) {
      onSearch(searchText, searchType);
    }
  };

  const validateSearch = (text: string, type: string): boolean => {
    
    const isTextPresent = vehicles.some(vehicle => {
      const searchTextLower = text.toLowerCase();
      if (type === 'brand') {
        return vehicle.brand.toLowerCase().includes(searchTextLower);
      } else if (type === 'model') {
        return vehicle.model.toLowerCase().includes(searchTextLower);
      } else if (type === 'year') {
        return vehicle.year.toString().includes(searchTextLower);
      }
      return false;
    });

    if (!isTextPresent) {
      show_alert(`No se encontró ${type} correspondiente a: ${text}`, 'warning');
      return false;
    }

 
    return true;
  };

  const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSearchType(e.target.value);
  };

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  
  useEffect(() => {
    
  }, [vehicles]);

  return (
    <div className='input-group me-2'>
      <select
        className='form-select'
        value={searchType}
        onChange={handleTypeChange}
      >
        <option value='brand'>Por Marca</option>
        <option value='model'>Por Modelo</option>
        <option value='year'>Por Año</option>
      </select>
      <input
        type='text'
        className='form-control'
        placeholder='Buscar...'
        onChange={handleTextChange}
      />
      <button className='btn btn-outline-secondary' type='button' onClick={handleSearchClick}>
        <i className='fa-solid fa-search'></i>
      </button>
    </div>
  );
};

export default SearchBar;
