<script>
  import Button, { Label } from "@smui/button";
  import axios from "axios";
  import { SERVER_API_URL } from "../../common/constants";
  import Loader from "../../common/Loader.svelte";
  import Snackbar, { Actions, Label as SnackLabel } from "@smui/snackbar";
  import IconButton from "@smui/icon-button";
  let snackbarWithClose;

  let cartItems = JSON.parse(sessionStorage.getItem("cart"));

  const handleIncrement = () => {};

  const handleDecrement = () => {};
</script>

<main>
  <div class="wrapper">
    {#if cart !== null && cart.length !== 0}
      {#each cartItems as item}
        <div>{item.name}</div>
      {/each}
      <!-- <div class="bottom">
        <div class="counterWrapper">
          <div class="counter">
            <Button variant="raised" on:click={handleDecrement}>
              <Label>-</Label>
            </Button>
            <span>{counter}</span>
            <Button variant="raised" on:click={handleIncrement}>
              <Label>+</Label>
            </Button>
          </div>
          <div>
            <Button
              class="add-to-cart-btn"
              on:click={handleAddToCart}
              disabled={!counter}
            >
              <Label>ADD TO CART</Label>
            </Button>
          </div>
        </div>
      </div> -->
      <p>hello</p>
    {:else}
      <p>your cart is empty</p>
    {/if}
  </div>
</main>
<Snackbar bind:this={snackbarWithClose} class="success">
  <SnackLabel>Product added to cart</SnackLabel>
  <Actions>
    <IconButton class="material-icons" title="Dismiss">close</IconButton>
  </Actions>
</Snackbar>

<style>
  main,
  .wrapper {
    height: 100%;
    max-width: 1000px;
    margin: auto;
  }

  img {
    width: 500px;
  }
  .imgWrapper {
    display: flex;
    justify-content: center;
  }

  .bottom {
    display: flex;
    justify-content: center;
  }

  .counterWrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .counter {
    display: flex;
    align-items: center;
    gap: 8px;
  }
</style>
