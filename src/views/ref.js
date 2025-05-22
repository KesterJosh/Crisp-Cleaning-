import React from 'react'
import { useLocation } from 'react-router-dom'

const Ref = () =>{

    const location = useLocation();

  // Extract the query parameter
  const params = new URLSearchParams(location.search);
  const ref = params.get('ref'); // Get the value of "ref"
  sessionStorage.setItem('referral', ref);
  window.location.href = '/#/'
    return(
        <div>
            {/* <p>{ref}</p> */}
        </div>
    );
}

export default Ref;