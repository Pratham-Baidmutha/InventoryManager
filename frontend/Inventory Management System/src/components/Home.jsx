import React ,{useState ,useEffect} from 'react'
const controller =  new AbortController()

function Home() {
  return (
    <div>
        <table id='table'>
            <thead className='tablerow'>
           <td>
            S.no
            </td>
            <td>
                Name
            </td>
            <td>
                Date Recieved
            </td>
            <td>
                Date disptach 
            </td>
            <td>
                Balance Items
            </td>
            <td>
                qrcode
            </td>
           
            </thead>


            {
            data.map((val,index)=>{
                return(<tr className='tablecell' key={index} > 
                <td>{index+1}</td>
                <td>{val.name}</td>
                <td>{val.dateRecieved}</td>
                <td>{val.dateDispatch}</td>
                <td>{val.balanceItems}</td>
                <td><a href={val.qrIdentifier} download><img style={ {height : "100px", width : "100px" } } src={val.qrIdentifier} /> </a></td>
                

                </tr>)
              })
            }   

    
            
        </table>

      
    </div>
  )
}

export default Home