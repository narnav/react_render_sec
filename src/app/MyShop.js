import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addProductAsync,
  selectProducts,
  getProductsAsync,
  updProductAsync,
} from "./productsSlice";

import { buyAsync } from "./cartSlice";
import MiniCart from "./MiniCart";

const MyShop = () => {
  const products = useSelector(selectProducts); //fet data from slicer
  const dispatch = useDispatch(); //allow method calls from slicer
  const [price, setPrice] = useState(0);
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState(2);
  useEffect(() => {
    dispatch(getProductsAsync());
  }, []);

  return (
    <div style={{ backgroundColor: "wheat" }}>
      <hr />
      Desc: <input onChange={(e) => setDesc(e.target.value)} />
      Price: <input onChange={(e) => setPrice(e.target.value)} />
      <button
        onClick={() =>
          dispatch(
            addProductAsync({
              desc: desc,
              price: price,
            })
          )
        }
      >
        Add
      </button>
      <hr></hr>
      <h1> MyShop</h1> <MiniCart></MiniCart>
      <hr></hr>
      Items in my shop: {products.length}
      Amount:
      <input
        value={amount}
        type={"Number"}
        onChange={(e) => setAmount(+e.target.value)}
        style={{ maxWidth: "40px" }}
      />
      {products.map((prod, i) => (
        <div key={i}>
          <button
            onClick={() =>
              dispatch(
                updProductAsync({
                  desc: desc,
                  price: price,
                  id: prod.id,
                })
              )
            }
          >
            Update
          </button>
          {prod.desc} {prod.price}{" "}
          <button
            onClick={() =>
              dispatch(
                buyAsync({ desc: prod.desc, price: prod.price, amount: amount })
              )
            }
          >
            Buy
          </button>
        </div>
      ))}
    </div>
  );
};

export default MyShop;
