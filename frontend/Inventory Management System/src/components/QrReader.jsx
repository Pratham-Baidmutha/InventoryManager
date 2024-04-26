import React, { useRef, useState } from 'react'
import { useHistory } from 'react-router-dom';
import QrScanner from "qr-scanner";

function QrReader() {
    const [file, setFile] = useState(null)
    const [data, setdata] = useState(null)
    const history = useHistory();


    const fileRef = useRef();

    const handleClick = () => {
        fileRef.current.click();
    }



    const handleChange = async (e) => {
        const file = e.target.files[0];
        setFile(file);
        const result = await QrScanner.scanImage(file);
        // console.log("Scanned Data:", result); 
        setdata(result);
        
    }

    const update = async (data) => {
        console.log(data)
        if (data && data.id) {
            try {
                const response = await fetch("http://localhost:3000/api/data/update/" + data.id, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: data.id, name: data.name, items: data.items, date: data.dateRecieved })
                })
                const json = await response.json()
                console.log(json);

                if (json.success) {
                    history.push('/');
                }
            } catch (error) {
                console.log(error)

            }
        }
    }


    return (

        <div id="container">
            <div id='qrscanner'>
                <div >
                    <h2>Qr Code Scanner</h2>
                </div>

                <div>
                    <button id='qrscanbtn'
                        onClick={handleClick}
                    >Scan QR</button>
                </div>

                <div>

                    <input type="file"
                        accept=".png .jpg .jpeg"
                        onChange={handleChange}
                        id="qrinput"
                        ref={fileRef}
                    />

                </div>
                <div>

                    {file && <img src={URL.createObjectURL(file)} alt='Qr Code' />}
                    {data && <p> data : {data} </p>}
                    {
                        data && <button onClick={() => update(data)} >Update</button>
                    }

                </div>
            </div>
        </div>
    )
}

export default QrReader