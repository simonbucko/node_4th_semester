<script>
  import { Link } from "svelte-navigator";
  import { HOME } from "../routing/constants";
  import { user } from "../store/store";
  import IconButton from "@smui/icon-button";

  console.log($user);
</script>

<div class="navbar">
  <Link to={HOME} class="logoLink" style="display: flex; align-items: center;">
    <img src="logo.png" alt="KEA Foot Shop" height="60px" />
  </Link>
  <div class="rightMenu">
    {#if $user.isAuthenticated}
      <div><b>{$user.name}</b></div>
    {/if}
    <IconButton class="material-icons">account_circle</IconButton>
    <IconButton class="material-icons">shopping_cart</IconButton>
  </div>
</div>

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
