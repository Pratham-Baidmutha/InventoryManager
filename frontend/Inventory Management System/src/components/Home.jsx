import React from 'react'


function Home({ data, getData }) {


    const deleteItem = async (id) => {
        // console.log(id)
        try {
            const response = await fetch("http://localhost:3000/api/data/delete/" + id, {
                method: 'Post',
                headers: {
                    'Content-Type': 'application/json'
                }
            })


            const json = await response.json()

            if (response.ok) {
                getData();
            }
        } catch (error) {
            console.log(error)

        }

    }



    return (
        <div id='table-block'>
            <table id='table'>
                <thead>
                    <tr className='tabletop'>
                        <th>
                            S.no
                        </th>
                        <th>
                            Name
                        </th>
                        <th>
                            DateRecieved
                        </th>
                        <th>
                            DateDisptach
                        </th>
                        <th>
                            PendingItems
                        </th>
                        <th>
                            qrcode/download
                        </th>
                        <th>
                            Admin
                        </th>


                    </tr>
                </thead>

                <tbody>
                    {
                        data?.map((val, index) => {
                            console.log(localStorage.getItem("authToken"))
                            return (<tr className='tablecell' key={index} >
                                <td>{index + 1}</td>
                                <td>{val.name}</td>
                                <td>{val.dateReceived ? new Date(val.dateReceived).toLocaleDateString() : "null"} </td>
                                <td>{val.dateDispatch ? new Date(val.dateDispatch).toLocaleDateString() : "null"}</td>
                                <td>{val.balanceItems}</td>
                                <td><a href={val.qrIdentifier} download><img style={{ height: "100px", width: "100px" }} src={val.qrIdentifier} /> </a></td>
                                <td>
                                    {
                                        (!localStorage.getItem("authToken")) ?
                                            <button >🗑️</button> :
                                            <button
                                                onClick={() => deleteItem(val._id)} > 🗑️ </button>

                                    }

                                </td>
                            </tr>)
                        })
                    }
                </tbody>



            </table>


        </div>
    )
}

export default Home