import Chip from '@mui/material/Chip'
import { useState, useEffect } from 'react';

interface Props{
    handleCatgoryFilterClick:(category:string) => void;
    currentCategoryFilter:string|null;
    label:string
}

const CategoryFilter = ({label, currentCategoryFilter, handleCatgoryFilterClick}:Props) => {
  const [selected, setSelected] = useState(false);

    useEffect(() => {
      setSelected(currentCategoryFilter === label.toLowerCase());
    }, [currentCategoryFilter, label]);

  const handleClick = () => {
    handleCatgoryFilterClick(label.toLowerCase())
  }

  return (
    <>
      {selected 
      ? <Chip label={label} color="success" sx={{ marginRight:'10px' }}  
      onClick={handleClick} />
      : <Chip label={label} variant="outlined" sx={{ marginRight:'10px' }}  
      onClick={handleClick} />}
    </>
  )
}

export default CategoryFilter
