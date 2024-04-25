import React from 'react'
import { useState } from 'react'
import QrCode from "qrcode"

function Qrgenerator({setData}) {
  const [opt, setopt] = useState("C1")
  const [items, setitems] = useState("")
  const [date, setdate] = useState("")
  const [src, setsrc] = useState("")

  const options = ["C1", "C2", "C3", "C4", "C5"]


  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const data = JSON.stringify({ opt, items, date })
      const qr = await QrCode.toDataURL(data)
      setsrc(qr);

      const _json = {
        opt, date, items, src : qr
      }
      const response = await fetch('http://localhost:3000/api/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(_json)
      })

      // const data = await response.json()
      // setsrc(data)
      setData(prev => [...prev , _json])

    } catch (error) {
      console.log('Error:', error)
    }

  }

  return (
    <div >
      <form id='qr-form' onSubmit={handleSubmit}>
        <h3>Generate QR</h3>

        <label>
          Select Component
          <select
            value={opt}
            onChange={(e) => { setopt(e.target.value) }}
          >
            {
              options.map((option, index) => {
                return (<option key={index} > {option}</option>)
              })
            }

          </select>
        </label>
        <label>Number of items Recieved:
          <input type="number" onChange={(e) => setitems(e.target.value)} value={items} />
        </label>

        <label>Date Recieved:
          <input type="date" onChange={(e) => setdate(e.target.value)} value={date} />
        </label>
        <button type="submit">Generate QR</button>

      </form>
      {/* {src && <QRcode value={src} />} */}

      <img src={src} />

    </div>
  )
}

export default Qrgenerator