import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectcart, getcartAsync ,removeProductAsync} from "./cartSlice";

const Cart = () => {
  const myCart = useSelector(selectcart); //fetch data from slicer
  const dispatch = useDispatch(); //allow method calls from slicer

  useEffect(() => {
    dispatch(getcartAsync());
  }, []);

  return (
    <div style={{ backgroundColor: "cyan" }}>
      <h1>My Cart - don't tuch it</h1>

      {myCart.map((order, i) => (
        <div key={i}>
          {order.amount} - {order.desc} : {order.price} : {order.cust_id}
          <button onClick={()=>dispatch(removeProductAsync(order.id))}>Remove</button>
        </div>
      ))}
      <button>Check out</button>
    </div>
  );
};

export default Cart;
