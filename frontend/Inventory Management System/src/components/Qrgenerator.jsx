import React from 'react'
import { useState, useId } from 'react'
import QrCode from "qrcode"
import { useHistory } from 'react-router-dom'


function Qrgenerator({ setData  }) {
  const history = useHistory();


  const [name, setname] = useState("C1")
  const [items, setitems] = useState("")
  const [dateRecieved, setdateRecieved] = useState("")
  const [src, setsrc] = useState("")
  const id = useId()
  const options = ["C1", "C2", "C3", "C4", "C5"]



  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const data = JSON.stringify({ name, items, dateRecieved,id })
      const qr = await QrCode.toDataURL(data)
      setsrc(qr);

      const _json = {
        id, name, dateRecieved, items, src: qr
      }
      const response = await fetch('http://localhost:3000/api/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(_json)
      })

      const json = await response.json()
      console.log(json);

      if (json.success) {
        history.push('/')
        window.location.reload()
      }


      // const data = await response.json()
      // setsrc(data)
      setData(prev => [...prev, _json])





    } catch (error) {
      console.log('Error:', error)
    }

  }

  return (
    <div id="container" >
      <form id='qr-form' onSubmit={handleSubmit}>
        <h2>Generate QR</h2>
         
        <div className='form-selector'>

        <label> Select Component:</label>
          <select
            value={name}
            onChange={(e) => { setname(e.target.value) }}
          >
            {
              options.map((option, index) => {
                return (<option key={index} > {option}</option>)
              })
            }

          </select>      
        </div>
        
        <div className='form-input'>
        <label>Number of items Recieved:
        </label>
        <input type="number" onChange={(e) => setitems(e.target.value)} value={items} />
        </div>

        <div className='form-input'>
        <label>Date Recieved:
        </label>
        <input type="date" onChange={(e) => setdateRecieved(e.target.value)} value={dateRecieved} />
        </div>

        <button type="submit">Generate QR</button>

      </form>
      {/* {src && <QRcode value={src} />} */}

      <img src={src} />

    </div>
  )
}

export default Qrgenerator