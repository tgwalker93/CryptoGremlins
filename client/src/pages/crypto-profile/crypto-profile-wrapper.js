import CryptoProfilePage from "./crypto-profile";
import { Link, useParams, useLocation  } from "react-router-dom";

export default (props) => {
    const params = useParams();
   
    return (
      <CryptoProfilePage {...props} params={params} />
    );
  }