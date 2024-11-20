import React from 'react'
import Header from '../components/Header'
import ProductCard from '../components/ProductCard'
import { useSelector } from 'react-redux'
import Modal from '../components/Modal'


const Product = () => {

  const { modal } = useSelector(state => state.modal)
  console.log(modal);

  const buttonFunc = () => {
    
  }

  return (
    <div>
      <Header />
      <ProductCard />

      <p>{modal ? "True" : "False"}</p>

      {modal && <Modal title={"Ürün Ekle"}/>}

    </div>
  )
}

export default Product
