import { useState } from 'react'
import './App.css'
import axios from 'axios'
import {APIProvider,  Map, Marker } from '@vis.gl/react-google-maps';

function App() {
  const position = {lat: 6.447809299999999, lng: 3.4723495};
  function beginPayment(){
    console.log("beginning Payment")
    let transactionId = '2202733036705334415609310123365701146262'
    axios
    .post("http://localhost:8080/transactions/initialize-payment", JSON.stringify({transactionId}), {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkZWZ1eWVhYmF5b21pMTZAZ21haWwuY29tIiwidXNlcklkIjoiNjY3MmZlODFjM2FjYzRhYjc4ZTNjMDk3IiwiYWNjb3VudFR5cGUiOiJidXllciIsIm5hbWUiOiJCb2xhIEJhbG9ndW4iLCJtb2JpbGVOdW1iZXIiOiI1NTUyMzQ1Njc4IiwiaWF0IjoxNzE4ODM5MzkwfQ.SI0A8MW0NkT6x82VC2-kiPieK4_CfblEsM1_XcyVOBI",
      },
    })
    .then((response) => {
      console.log("payment data retrieved successfully", response.data);
      function onSuccess(){
        console.log({success: true})
        confirmPayment()
      }
      function onError(){
        console.error({error: true})
      }
      function onClose(){
        console.log({closed: true})
      }
      let newPayment = window.RmPaymentEngine.init({...response.data,onSuccess,onError,onClose})
      newPayment.showPaymentWidget();
    })
    .catch((error) => {
      console.error("There was an error retrieving payment data", error)
    })
  }
  const createTransaction = () => {
    console.log('create transactions')
    let propertyId = '6672be55d625bee7b506861f'
    let transactionType = 'propertyPurchase'
    let initData = {
      propertyId,transactionType
    }
    axios
    .post("http://localhost:8080/transactions/create-transaction", JSON.stringify(initData), {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkZWZ1eWVhYmF5b21pMTZAZ21haWwuY29tIiwidXNlcklkIjoiNjY3MmZlODFjM2FjYzRhYjc4ZTNjMDk3IiwiYWNjb3VudFR5cGUiOiJidXllciIsIm5hbWUiOiJCb2xhIEJhbG9ndW4iLCJtb2JpbGVOdW1iZXIiOiI1NTUyMzQ1Njc4IiwiaWF0IjoxNzE4ODM5MzkwfQ.SI0A8MW0NkT6x82VC2-kiPieK4_CfblEsM1_XcyVOBI",
      },
    })
    .then((response) => {
      console.log("transaction created successfully", response.data);
    })
    .catch((error) => {
      console.error("There was an error creating the transaction", error);
    });
  }
  function confirmPayment () {
     console.log('beginning cofirmation')
     let transactionId = '2202733036705334415609310123365701146262'
     axios
     .post("http://localhost:8080/transactions/check-rrr-payment-status", JSON.stringify({transactionId}), {
       headers: {
         "Content-Type": "application/json",
         Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkZWZ1eWVhYmF5b21pMTZAZ21haWwuY29tIiwidXNlcklkIjoiNjY3MmZlODFjM2FjYzRhYjc4ZTNjMDk3IiwiYWNjb3VudFR5cGUiOiJidXllciIsIm5hbWUiOiJCb2xhIEJhbG9ndW4iLCJtb2JpbGVOdW1iZXIiOiI1NTUyMzQ1Njc4IiwiaWF0IjoxNzE4ODM5MzkwfQ.SI0A8MW0NkT6x82VC2-kiPieK4_CfblEsM1_XcyVOBI",
       },
     })
     .then((response) => {
       console.log(response)
     })
     .catch((error) => {
       console.error("There was an error retrieving payment data", error);
     });
  }
  // so i've just confirmed, the authentication works.
  
  return (
    <>
    <APIProvider apiKey={'67868'} onLoad={()=>{console.log('provider has loaded')}}>
      <div style={{margin: 20,padding: 20,border: '1px solid', borderRadius: 20,height: 300}}>
      <Map defaultCenter={position} defaultZoom={10}>
        <Marker position={position} />
      </Map>
      </div>
      <button onClick={createTransaction}>create Transaction</button>
      <div style={{paddingTop: 20}}></div>
      <button onClick={beginPayment}>initialize payment</button>
      <div style={{paddingTop: 20}}></div>
      <button onClick={confirmPayment}>confirm payment</button>
    </APIProvider>
    </>
  )
}

export default App
