import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ImBin2 } from "react-icons/im";
import { toast } from 'react-toastify'

const User = ({token}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 1;
    const [userList, setUserList] = useState([]);

    const fetchUser = async () => {
        try {
            const response = await axios.get("http://localhost:8000/userlist",{headers:{token}});
            if (response.data) {
                setUserList(response.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = userList.slice(firstIndex, lastIndex);
    const nPages = Math.ceil(userList.length / recordsPerPage);
    const numbers = [...Array(nPages).keys()].map(num => num + 1);

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const nextPage = () => {
        if (currentPage < nPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const changePage = (num) => {
        setCurrentPage(num);
    };

    const Remove = async(id)=>{
        try{
          const response = await axios.post("http://localhost:8000/userremove",{id})
          if(response.data.success){
            toast.success(response.data.message)
            await fetchUser()
          }else{
            toast.error(response.data.message)
          }
        }catch(er){
          toast.error(er.message)
        }
      }

    return (
        <div>
            <h3>User List</h3>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {records.map((item) => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td onClick={()=>Remove(item._id)}><ImBin2 /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={{display:"flex",justifyContent:"center",height:"70vh" , alignItems:"center",marginRight:"100px"}}>
                <ul className='pagination'>
                    <li>
                        <button className='page-link' onClick={prevPage} disabled={currentPage === 1}>
                            Prev
                        </button>
                    </li>
                    {numbers.map((num) => (
                        <li key={num} className={`page-item ${currentPage === num ? 'active' : ''}`}>
                           --<button style={{margin:"5px 5px",backgroundColor:"black",color:"white",padding:"0px 10px"}}className='page-item' onClick={() => changePage(num)}>
                                {num}
                            </button>-
                        </li>
                    ))}
                    <li>
                        <button className='page-link' onClick={nextPage} disabled={currentPage === nPages}>
                            Next
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default User;
