<script>
  import { Router, Route, Link } from "svelte-navigator";
  import Home from "../pages/home/Home.svelte";
  import Login from "../pages/login/Login.svelte";
</script>

<Router>
  <nav>
    <Link to="/">Home</Link>
    <Link to="login">Login</Link>
  </nav>
  <Route path="/">
    <Home />
  </Route>
  <Route path="login">
    <Login />
  </Route>
</Router>
