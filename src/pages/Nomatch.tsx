import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import { Link } from "react-router-dom"


const Nomatch = () => {
  return (
    <Container>
        <Typography variant="h5">No route found!</Typography>
        <Link to="/">Home</Link>
    </Container>
  )
}

export default Nomatch
