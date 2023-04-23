import '../../styles/Header.css'
import { useNavigate } from 'react-router-dom';
function Header(){
  const navigate=useNavigate()

    return(
        <div className="header">
        <div className="logo">LOGO</div>
        <div className="my-bookings" onClick={()=>{navigate("/mybookings")}}>My Bookings</div>
        <div className="logout" onClick={()=>{navigate("/")}}>Logout</div>
      </div>
    )
}
export default Header;