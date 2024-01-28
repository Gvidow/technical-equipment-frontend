import { FC, useState } from 'react';
import 'rc-slider/assets/index.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import './InputField.css';
import Calendar from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'date-fns';
import ru from 'date-fns/locale/ru';

interface SearchEquipment{
  equipmentTitle: string;
  setEquipmentTitle: (equipment: string) => void;
  onSubmit: () => void;
  loading?: boolean;
  placeholder?: string;
  buttonTitle?: string;
  setFilterAfterDate: (date: string) => void;
  clearParams: () => void;
  searchAfterDate: string;
  reset: () => void;
}

const InputField: FC<SearchEquipment> = ({
  equipmentTitle,
  reset,
  setEquipmentTitle,
  onSubmit,
  placeholder,
  buttonTitle,
  setFilterAfterDate,
  clearParams,
  searchAfterDate,
}) => {
  const [showClearButton, setShowClearButton] = useState<boolean>(equipmentTitle === '' && searchAfterDate === '' ? false : true);
  const [createdAfterDate, setCreatedAfterDate] = useState<Date | null>(searchAfterDate === '' ? null : (()=>{
    const [day, month, year] = searchAfterDate.split('.').map(Number);
    // const [day, month, year] = [3, 4, 5];
    return new Date(year, month - 1, day);
  })());
  
  const wrapSetEquipmentTitle = (equipmentTitle: string) => {if (equipmentTitle !== '') setShowClearButton(true); setEquipmentTitle(equipmentTitle);}
  const wrapSetCreatedAfterDate = (date: Date | null) => {
    if (date !== null) {
        setShowClearButton(true);
    }
    setCreatedAfterDate(date);
    const dateFilter = date ? date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }) : '';
    setFilterAfterDate(dateFilter)
  }

  const clearFilter = async () => {
    wrapSetCreatedAfterDate(null);
    setEquipmentTitle('');
    setShowClearButton(false);
    clearParams();
    reset();
  };

  return (
    <InputGroup className="custom-mb-3">
      <Form.Control
        className="custom-input"
        placeholder={placeholder}
        value={equipmentTitle}
        onChange={(e) => wrapSetEquipmentTitle(e.target.value)}
      />
      
      {showClearButton && (
        <Button
            variant="outline-secondary my-custom-button clear-button"
            onClick={clearFilter}
        >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-x-lg"
          viewBox="0 0 16 16"
        >
          <path d="M3.854 3.146a.5.5 0 0 1 .708 0L8 7.293l3.146-3.147a.5.5 0 0 1 .708.708L8.707 8l3.147 3.146a.5.5 0 0 1-.708.708L8 8.707l-3.146 3.147a.5.5 0 0 1-.708-.708L7.293 8 4.146 4.854a.5.5 0 0 1 0-.708z" />
        </svg>
      </Button>
      )}

      <Button
        variant="outline-secondary my-custom-button"
        onClick={onSubmit}
      >
        {buttonTitle}
      </Button>
      <DropdownButton variant="outline-secondary my-custom-button" title="После">
        <Calendar 
            selected={createdAfterDate}
            onChange={(date: Date) => wrapSetCreatedAfterDate(date)}
            dateFormat='dd.MM.yyyy'
            locale={ru}
        />
      </DropdownButton>
    </InputGroup>
  );
};

export default InputField;
