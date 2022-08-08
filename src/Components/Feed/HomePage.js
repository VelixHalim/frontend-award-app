import React, { useEffect, useState } from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import axios from 'axios'
import api from '../../api'
import {Card, CardImg,CardImgOverlay, CardTitle, CardText, Container, Col, Row, Button, CardFooter} from 'reactstrap'
import {AlertCircle} from 'react-feather'
import Sidebar from '../Sidebar'
import FilterModal from './FilterModal'

export default function HomePage() {
    const location = useLocation()
    const navigate = useNavigate()
    // if(location.state.role!=="user"){
    //     navigate('/',{state:{role:''}})
    // }
    const [data,setData] =useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [filter, setFilter] = useState(false)

    const handleFilter = ()=>{
        setFilter(!filter)
    }

    const [alltype,setAlltype] =useState(false)
    const [vchtype,setVchtype] =useState(false)
    const [pdttype,setPdttype] =useState(false)
    const [gtctype,setGtctype] =useState(false)
    const [update, setUpdate] =useState(false)

    const [min, setMin] = useState(0)
    const [max,setMax] = useState(500000)

    const handleUpdate=()=>{
        setUpdate(!update)
        handleFilter()
    }

    // const handlemin = ()=>{
    //     setMin()
    // }

    const handleAll = ()=>{
        console.log(alltype)
        if(alltype===false){
            setAlltype(true)
            setVchtype(true)
            setGtctype(true)
            setPdttype(true)
        }else{
            setAlltype(false)
            setVchtype(false)
            setGtctype(false)
            setPdttype(false)
        }
    }

    const handleVch = ()=>{
        setVchtype(!vchtype)
    }
    const handlePdt = ()=>{
        setPdttype(!pdttype)
    }
    const handleGtc = ()=>{
        setGtctype(!gtctype)
    }

    useEffect(()=>{
        if(pdttype===false || vchtype===false || gtctype===false){
            setAlltype(false)
        }
    },[pdttype,vchtype,gtctype])

    const getData = ()=>{
        setIsLoading(true)
        console.log((api+`/feed/getFeed?min=${min}&type1=${vchtype?'VCH':''}&type2=${pdttype?'PDT':''}&type3=${gtctype?'GTC':''}`))
        axios.get((api+`/feed/getFeed?min=${min}&type1=${vchtype?'VCH':''}&type2=${pdttype?'PDT':''}&type3=${gtctype?'GTC':''}`)).
        then((result)=>{
            const response = result.data.data.errorCode
            if(response ==="0"){
                setData(result.data.data.data)
            }
        }).catch((error)=>{
            console.log(error)
        }).finally(()=>{
            setIsLoading(false)
            setUpdate(false)
            
        })
    }

    useEffect(()=>{
        getData()
    },[update])

    const handleResetType = ()=>{
        setAlltype(false)
        setVchtype(false)
        setGtctype(false)
        setPdttype(false)
    }

    const handleChangeRange = (e)=>{
        setMin(e.target.value)
    }

    const handleClearRange = ()=>{
        setMin(0)
    }

    const handleClearAllFilter = ()=>{
        handleClearRange()
        handleResetType()
    }

    return (
        <>
        <Sidebar handleFilter={handleFilter}/>
        <Container>
            <Row>
                <Col></Col>
                <Col>
                    <div className="d-flex justify-content-center">
                        {/* <div>Award</div> */}
                        
                    </div>
                    {
                        data.length >0?
                        (
                            data.map(d=>{
                                console.log(d)
                                return(
                                    <>
                                        <div>
                                            <Card inverse color='light'>
                                                <CardImg
                                                    alt="Card image cap"
                                                    src="#"
                                                    style={{
                                                        minHeight: 200,
                                                        maxHeight:200,
                                                        minWidth: 320,
                                                        maxWidth:320
                                                    }}
                                                    // width="100%"
                                                    />
                                                    <CardImgOverlay>
                                                        <div className='text-right'>
                                                            <CardTitle tag="h6">
                                                                <Button type='button' className='btn btn-primary' color={d.awardtype==="GTC"?"success": d.awardtype==="VCH"?"primary":"warning"}>{d.nama_type}</Button>
                                                            </CardTitle>
                                                        </div>

                                                    {/* <CardText>
                                                        This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
                                                    </CardText> */}
                                                    <CardText>
                                                        <small className="text-muted">
                                                            {d.poin} poin
                                                        </small>
                                                    </CardText>
                                                </CardImgOverlay>
                                            </Card>
                                        </div>
                                        <div className="m-1 mb-3">                            
                                            <span><b>{d.nama_award}</b></span> 
                                        </div>
                                    </>
                                )
                            })
                        ):
                        (
                            <>
                                <div className="d-flex justify-content-center">
                                    <AlertCircle size={100} color="gray"/>
                                </div>
                                <div className='d-flex justify-content-center'>
                                    <h1 style={{color:"gray"}}><b>No Award Found</b></h1>
                                </div>
                            </>
                        )
                    }
                </Col>
                <Col></Col>
            </Row>
        </Container>
        <FilterModal 
            isOpen = {filter} 
            toggle={handleFilter} 
            vchtype={vchtype} 
            pdttype={pdttype} 
            alltype={alltype} 
            gtctype={gtctype} 
            handleUpdate = {handleUpdate}
            handleAll={handleAll}
            handleGtc={handleGtc}
            handleVch={handleVch}
            handlePdt={handlePdt}
            handleResetType = {handleResetType}
            min = {min}
            max={max}
            handleChangeRange = {handleChangeRange}
            handleClearAllFilter = {handleClearAllFilter}
            handleClearRange = {handleClearRange}
        />
    </>
    )
}
