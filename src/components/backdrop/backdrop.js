import React from 'react'
import './backdrop.css'
const Backdrop = ({ close }) => {
    return <div className="backdrop" onClick={close} />
}

export default Backdrop
