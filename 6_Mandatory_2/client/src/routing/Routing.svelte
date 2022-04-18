<script>
  import { Router, Route } from "svelte-navigator";
  import * as ROUTES from "./constants";
  import Home from "../pages/home/Home.svelte";
  import Login from "../pages/login/Login.svelte";
  import AddProduct from "../pages/addProduct/AddProduct.svelte";
  import Checkout from "../pages/checkout/Checkout.svelte";
  import MyOrders from "../pages/myOrders/MyOrders.svelte";
  import Product from "../pages/product/Product.svelte";
  import Signup from "../pages/signup/Signup.svelte";
  import Navbar from "../common/Navbar.svelte";
</script>

<Router primary={false}>
  <Navbar />
  <Route path={ROUTES.HOME}>
    <Home />
  </Route>
  <Route path={ROUTES.LOGIN}>
    <Login />
  </Route>
  <Route path={ROUTES.ADD_PRODUCT}>
    <AddProduct />
  </Route>
  <Route path={ROUTES.CHECKOUT}>
    <Checkout />
  </Route>
  <Route path={ROUTES.MY_ORDERS}>
    <MyOrders />
  </Route>
  <Route path="{ROUTES.PRODUCT}/:id">
    <Product />
  </Route>
  <Route path={ROUTES.SIGNUP}>
    <Signup />
  </Route>
</Router>
