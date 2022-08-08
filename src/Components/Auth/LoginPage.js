import axios from 'axios'
import React, { useState } from 'react'
import { Star } from 'react-feather'
import { Container,Row,Col,Form,FormGroup, Input, Button } from 'reactstrap'
import api from '../../api'
import {useNavigate, Link} from 'react-router-dom'

export default function LoginPage() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    console.log(email)
    const handleSubmit = ()=>{
        console.log("halo",email)
        setIsLoading(true)
        axios.get(api+`/user/getUser?email=${email}`).
        then((result)=>{
            const response = result.data.data.errorCode
            if(response==="0"){
                console.log(result.data.data.data.email)
                navigate("/home",{state:{role:"user"}})
            }else{
                setErrMsg(result.data.data.errorDesc)
            }
            console.log(result)
        }).catch((error)=>{
            console.log(error)
        }).finally(()=>{
            setIsLoading(false)
        })
    }
    return (
        <Container>
            <Row>
                <Col></Col>
                <Col className='text-center'>
                    <div className='d-flex justify-content-center'>
                        <Star size={200} color="yellow"/>
                    </div>
                    <div>
                        <h1><b>AWARD</b></h1>
                        <p>
                            Enter your email address to sign in and continue
                        </p>
                    </div>
                    <div>
                        <Form >
                            <FormGroup>
                                <Input type='email' placeholder='Email Address' required value={email} onChange={(e)=>setEmail(e.target.value)}/>
                                {
                                    errMsg!==""?(
                                        <span style={{color:"red"}}>Email Address is not exists</span>
                                    ):
                                    null
                                }
                            </FormGroup>
                            <FormGroup>
                                <Button type='button' color='primary' className='btn btn-primary' disabled={isLoading} onClick={(e)=>handleSubmit(e)}>Sign in</Button>
                            </FormGroup>
                            <span>don't have account? <Link to={"/register"}>register</Link></span> 
                        </Form>
                    </div>
                </Col>
                <Col></Col>
            </Row>
        </Container>
    )
}
