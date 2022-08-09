import React from 'react'
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Col, Badge } from 'reactstrap'

export default function FilterModal(props) {
  console.log(props)
  const isOpen = props.isOpen
  const toggle = props.toggle
  const vchtype=props.vchtype
  const pdttype=props.pdttype 
  const alltype=props.alltype 
  const gtctype=props.gtctype 
  const handleUpdate = props.handleUpdate
  const handleAll = props.handleAll
  const handleGtc = props.handleGtc
  const handleVch = props.handleVch
  const handlePdt = props.handlePdt
  const handleResetType = props.handleResetType
  const max = props.max
  const min = props.min
  const handleChangeRange = props.handleChangeRange
  const handleClearAllFilter = props.handleClearAllFilter
  const handleClearRange = props.handleClearRange
  console.log(min)
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle} >Filter</ModalHeader>
      <ModalBody>
        {
          min>0?
          ( 
            <div >
              <Button type='button' outline color="primary">Poin : {min} - {max} <Badge color='primary' onClick={()=>handleClearRange()}>x</Badge></Button>
            </div>
          )
          :null
        }

        {
          vchtype||pdttype||gtctype?(
            <div className='mt-2'>
              <Button type='button' outline color="primary">Type :{vchtype===true?"Voucher":null} {(vchtype&&pdttype)||(vchtype&&gtctype)?",":null} {pdttype===true?"Product":null} {pdttype&&gtctype?",":null} {gtctype===true?"Gift Card":null} <Badge color='primary' onClick={()=>handleResetType()}>x</Badge></Button>
            </div>
          ):null
        }
        {
          (min>0)&& (vchtype||pdttype||gtctype)?(
            <Button className='mt-2' type='button' outline color="primary" onClick={()=>handleClearAllFilter()}>Clear All Filter</Button>
          ):
          null
        }
        <Form>
          <FormGroup>
            <Label><h5><b>Poin Needed</b></h5></Label>
            <Row>
              <Col style={{color:"blue"}}>
                <h2>IDR {min}</h2>
              </Col>
              <Col className='text-right' style={{color:"blue"}}>
                <h2>IDR {max}</h2>
              </Col>
            </Row>
            <Input type='range' min={0} max={max} step="10000" value={min} onChange={(e)=>handleChangeRange(e)}/>
          </FormGroup>
          <FormGroup check>
            <Row>
              <Col md={12} xs={12} sm={12} lg={12}>
                <Label check>
                <h5><b>Award Type</b></h5>
                </Label>
              </Col>
              <Col md={12} xs={12} sm={12} lg={12}>
                <Label check>
                  <Input type="checkbox" checked={alltype} onClick={()=>handleAll()}/>{' '}
                  All Type
                </Label>
              </Col>
              <Col md={12} xs={12} sm={12} lg={12}>
                <Label check>
                  <Input type="checkbox" checked={vchtype} onClick={()=>handleVch()}/>{' '}
                  Voucher
                </Label>
              </Col>
              <Col md={12} xs={12} sm={12} lg={12}>
                <Label check>
                  <Input type="checkbox" checked={pdttype} onClick={()=>handlePdt()}/>{' '}
                  Products
                </Label>
              </Col>
              <Col md={12} xs={12} sm={12} lg={12}>
                <Label check>
                  <Input type="checkbox" checked={gtctype} onClick={()=>handleGtc()}/>{' '}
                  Gift Cards
                </Label>
              </Col>
            </Row>
          </FormGroup>
        </Form>


        {/* <Input type='checkbox'></Input> */}
      </ModalBody>
      <ModalFooter>
        <Button color='primary' onClick={()=>handleUpdate()}>
          Filter
        </Button>
      </ModalFooter>
    </Modal>
  )
}
