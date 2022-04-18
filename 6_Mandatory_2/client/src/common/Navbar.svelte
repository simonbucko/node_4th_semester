<script>
  import { Link } from "svelte-navigator";
  import { HOME, LOGIN, CHECKOUT } from "../routing/constants";
  import { user } from "../store/store";
  import IconButton from "@smui/icon-button";
  import Button, { Label } from "@smui/button";
  import { useNavigate } from "svelte-navigator";
  import Menu from "@smui/menu";
  import List, { Item, Text } from "@smui/list";
  import Snackbar, { Actions, Label as SnackLabel } from "@smui/snackbar";

  let cartMenu;
  let snackbarWithClose;
  const navigate = useNavigate();

  const emptyCart = () => {
    sessionStorage.removeItem("cart");
    snackbarWithClose.open();
  };
</script>

<div class="navbar">
  <Link to={HOME} class="logoLink" style="display: flex; align-items: center;">
    <img src="logo.png" alt="KEA Foot Shop" height="60px" />
  </Link>
  <div class="rightMenu">
    {#if $user.isAuthenticated}
      <div><b>{$user.name}</b></div>
      <IconButton class="material-icons">account_circle</IconButton>
    {/if}
    {#if !$user.isAuthenticated}
      <Button variant="raised" on:click={() => navigate(LOGIN)}
        ><Label>Login</Label></Button
      >
    {/if}
    <IconButton class="material-icons" on:click={() => cartMenu.setOpen(true)}
      >shopping_cart</IconButton
    >
    <Menu bind:this={cartMenu}>
      <List>
        <Item on:SMUI:action={() => navigate(CHECKOUT)}>
          <Text>Checkout</Text>
        </Item>
        <Item on:SMUI:action={emptyCart}>
          <Text>Empty Cart</Text>
        </Item>
      </List>
    </Menu>
  </div>
</div>
<Snackbar bind:this={snackbarWithClose} class="success">
  <SnackLabel>Your cart was emptied</SnackLabel>
  <Actions>
    <IconButton class="material-icons" title="Dismiss">close</IconButton>
  </Actions>
</Snackbar>

<style>
  .navbar {
    display: flex;
    padding: 0 48px;
    background-color: black;
    height: 64px;
    justify-content: space-between;
  }
  .rightMenu {
    color: white;
    display: flex;
    align-items: center;
    gap: 8px;
  }
</style>
