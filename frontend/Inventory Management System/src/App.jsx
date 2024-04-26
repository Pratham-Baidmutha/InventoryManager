import { useEffect, useReducer, useState } from 'react'
import { useHistory } from 'react-router-dom'

import './App.css'


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import QrReader from './components/QrReader';
import Signup from './components/Signup';
import Login from './components/Login';
import Qrgenerator from './components/Qrgenerator'
import Home from './components/Home'




function App() {
  const history = useHistory();
  const [data, setData] = useState([])

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {

    try {
      await fetch('http://localhost:3000/api/data')
        .then(res => res.json())
        .then(data => {
          setData(data)
          console.log(data)
        })

      //   console.log(data)

    } catch (error) {
      console.log('Error:', error)
    }

  }

  

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    window.location.href = "/"
    window.location.reload()
  }
  return (


    <Router>
      <div>
        <nav id='projectnav'>
          <div>
            <h3><Link id="brandlink" to="/">Inventory Management System</Link></h3>
          </div>

          {
            (!localStorage.getItem("authToken")) ?
              <div>
                <h4>
                  <Link id="qrlinks" to="#">Scan Qr Code</Link>
                </h4>
                <h4>
                  <Link id="qrlinks" to="#">Generate Qr Code</Link>
                </h4>
              </div> :
              <div>
                <div>
                  <h4>
                    <Link id="qrlinks" to="/qrScanner">Scan Qr Code</Link>
                  </h4>
                  <h4>
                    <Link id="qrlinks" to="/generateQr">Generate Qr Code</Link>
                  </h4>
                </div>
              </div>
          }

          {
            (!localStorage.getItem("authToken")) ?
              <div>
                <h4>
                  <Link id="regbtn" to="/signup">Register</Link>
                </h4>
                <h4>
                  <Link id='navbtn' to="/login">Login</Link>
                </h4>
              </div> :
              <div>
                <h4>
                  <button id='navbtn' onClick={handleLogout}>Logout</button>
                </h4>
              </div>
          }

        </nav>

        <Switch>
          <Route path="/" exact component={() => <Home data={data} getData={getData} />}></Route>
          <Route exact path="/generateQr" component={() => <Qrgenerator setData={setData} />}></Route>
          <Route exact path="/qrScanner" component={() => <QrReader />}></Route>
          <Route exact path="/signup" component={() => <Signup />}></Route>
          <Route exact path="/login" component={() => <Login />}></Route>
        </Switch>
      </div>
    </Router>

  )
}

export default App
