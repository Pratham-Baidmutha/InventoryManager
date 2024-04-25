import { useState } from 'react'

import './App.css'
import Qrgenerator from './components/Qrgenerator'
import Home from './components/Home'

function App() {
  const [data, setData] = useState([])

  useEffect(() => {
    getData()
    return () =>{
        controller.abort()
    }
}, [])

const getData = async()=>{

    try {
      await fetch('http://localhost:3000/api/data')
      .then(res => res.json())
      .then(data => {
        setData(data)
        console.log(data)
      })
      
    //   console.log(data)
      
    } catch (error) {
      console.log('Error:',error)
    }

}

  return (
    <>
    Inventory Management System.
    <Qrgenerator setData={setData} />
    <Home data={data} />
    </>
  )
}

export default App
