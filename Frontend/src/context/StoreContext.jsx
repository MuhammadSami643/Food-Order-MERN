import { createContext, useEffect, useState } from "react";
import axios from "axios";

const StoreContext = createContext(null);

const StoreContextProvidor = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:3000";

  const [token, setToken] = useState("");

  //We want to set our products which we fetch through API's from backend
  const [food_list, setFoodList] = useState([]);

  //Function to fetch data from database regarding food products, here we call the API for get all food product
  const fetchFoodList = async () => {
    const response = await axios.get(url + "/food/food-list");
    setFoodList(response.data.data);
  };

  // we want that when we refresh the page we will not get logged out
  useEffect(() => {
    async function loadData() {
      //We want that this function runs when web-page is load and data is fetch from database
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token")); //we call this function and get the token key with which we only get the data of that user's token
      }
    }
    loadData(); //here we call the function which fetch data
  }, []);

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }

    // checking that token is available or not
    if (token) {
      await axios.post(url + "/cart/add", { itemId }, { headers: { token } }); //whenever we login and add some data in cart it will also update in the database
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    //if any item remove by user, we remove it from database
    // if request have toke this means user is logged in
    if (token) {
      await axios.post(
        url + "/cart/remove",
        { itemId },
        { headers: { token } }
      );
    }
  };

  //we want that when user add some items in cart it will show whenever user visited application So,
  const loadCartData = async (token) => {
    const response = await axios.post(
      url + "/cart/get",
      {},
      { headers: { token } }
    ); //we get one response in which we get the logged in user only data based on its token

    setCartItems(response.data.cartData); // our cart data is loaded in this state, we want that this cart data is loaded whenever user is logged in that's why we call it in useEffect hook
  };

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        let itemInfo = food_list.find((product) => product._id === itemId);
        if (itemInfo) {
          // Check if itemInfo is not undefined
          totalAmount += itemInfo.price * cartItems[itemId];
        }
      }
    }
    return totalAmount;
  };

  const storeContextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <>
      <StoreContext.Provider value={storeContextValue}>
        {props.children}
      </StoreContext.Provider>
    </>
  );
};

export { StoreContextProvidor, StoreContext };
