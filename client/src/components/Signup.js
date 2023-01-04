import React,{useState} from 'react'
import { useNavigate } from 'react-router'

const Signup = (props) => {
    const [credentials, setcredentials] = useState({name:"",email:"",password:"",cpassword:""})
    let navigate=useNavigate()
    // const [name,email,password]=credentials
    const handleClick=async (e)=>{
        e.preventDefault()

        // const response = await fetch(`http://localhost:5000/api/auth/createUser`, {
        const response = await fetch(`https://inotebook-cloud.herokuapp.com/api/auth/createUser`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({name:credentials.name, email:credentials.email,password:credentials.password}) // body data type must match "Content-Type" header
          });
          const json=await response.json()
          console.log(json)
          if(json.success)
          {
            //   save the auth token and redirect
            localStorage.setItem("authtoken",json.authtoken)
            navigate('/login')
            // alert("succesfully loged in")
            props.showAlert("Account Created","success")
          }
          else
          {
              props.showAlert("Invalid Credentials","danger")
          }
    }
    const onChange=(e)=>{
        setcredentials({...credentials,[e.target.name]:e.target.value})
    }
    return (
        <>
            <div className="container">
                <form>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">UserName</label>
                        <input type="text" className="form-control" onChange={onChange} value={credentials.name} name="name" id="username" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" onChange={onChange} value={credentials.email} name="email" id="email" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" onChange={onChange} value={credentials.password} name="password" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" onChange={onChange} value={credentials.cpassword} name="cpassword" id="cpassword" />
                    </div>
                    <button type="submit" onClick={handleClick} className="btn btn-primary">Sign Up</button>
                </form>
            </div>
        </>
    )
}

export default Signup
