import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectcart } from "./cartSlice";

const MiniCart = () => {
    const myCart = useSelector(selectcart); //fetch data from slicer
  return (
    <div style={{backgroundColor:"cyan"}}>
    Items in your cart: {myCart.length}
    </div>
  )
}

export default MiniCart