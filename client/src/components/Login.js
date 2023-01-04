import React,{useState} from 'react'
import { useNavigate } from 'react-router'

const Login = (props) => {
    const [credentials, setcredentials] = useState({email:"",password:""})
    let navigate=useNavigate()
    const handleClick=async (e)=>{
        e.preventDefault()
        //we can also write only fetch('/api/auth/login') to not occur the cors policy error but for that we need to add a "proxy":"http://localhost:5000" to our backend package.json file above the dependencies section

        // const response = await fetch(`http://localhost:5000/api/auth/login`, {
        const response = await fetch(`https://inotebook-cloud.herokuapp.com/api/auth/login`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password}) // body data type must match "Content-Type" header
          });
          const json=await response.json()
          console.log(json)
          if(json.success)
          {
            //   save the auth token and redirect
            localStorage.setItem("authtoken",json.authtoken)
            navigate('/')
            props.showAlert("Successfully Logged In!","success")
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

                <form onSubmit={handleClick}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" onChange={onChange} value={credentials.email} name="email" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" onChange={onChange} value={credentials.password} name="password" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        </>
    )
}

export default Login
