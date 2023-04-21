import Chip from '@mui/material/Chip'

interface Props{
    label:string
}

const CategoryFilter = ({label}:Props) => {
  const handleClick = () => {

  }
  
  return (
    <Chip label={label} variant="outlined" sx={{ marginRight:'10px' }}  onClick={handleClick} />
  )
}

export default CategoryFilter
