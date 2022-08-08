import React, { useState } from 'react'
import {Star} from 'react-feather'
import {Container, Row, Col, Input, Button, Form, FormGroup} from 'reactstrap'
import {useNavigate, Link} from 'react-router-dom'
import axios from 'axios'
import api from '../../api'

export default function RegisterPage() {
    const navigate = useNavigate()
    const [data, setData] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    console.log(data)
    const handleSubmit = ()=>{
        console.log("halo",data)
        setIsLoading(true)
        axios.post(api+'/user/postUser',{email:data}).
        then((result)=>{
            const response = result.data.data.errorCode
            if(response==="0"){
                // console.log(result.data.data.data.email)
                alert("Email berhasil di Input!")
                navigate("/")
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
                            Enter your email address to sign up and continue
                        </p>
                    </div>
                    <div>
                        <Form >
                            <FormGroup>
                                <Input type='email' placeholder='Email Address' required value={data} onChange={(e)=>setData(e.target.value)}/>
                                {
                                    errMsg!==""?(
                                        <span style={{color:"red"}}>Email Address is exists</span>
                                    ):
                                    null
                                }
                            </FormGroup>
                            <FormGroup>
                                <Button type='button' color='primary' className='btn btn-primary' disabled={isLoading} onClick={(e)=>handleSubmit(e)}>Sign up</Button>
                            </FormGroup>
                            <span>have account? <Link to={"/"}>login</Link></span> 
                        </Form>
                    </div>
                </Col>
                <Col></Col>
            </Row>
        </Container>
    )
}
