<script>
  import Button, { Label } from "@smui/button";
  import axios from "axios";
  import { SERVER_API_URL } from "../../common/constants";
  import Loader from "../../common/Loader.svelte";
  import Snackbar, { Actions, Label as SnackLabel } from "@smui/snackbar";
  import IconButton from "@smui/icon-button";
  import { Link } from "svelte-navigator";
  import { HOME } from "../../routing/constants";
  import Textfield from "@smui/textfield";
  import HelperText from "@smui/textfield/helper-text";

  let cardNumber = "";
  let address = "";
  let email = "";
  let snackbarWithClose;
  let cartItems = JSON.parse(sessionStorage.getItem("cart"));
  console.log(cartItems);

  const handleIncrement = (productId, quantity) => {
    cartItems = cartItems.map((item) => {
      if (item.productId === productId) {
        return {
          ...item,
          quantity: quantity + 1,
        };
      } else {
        return item;
      }
    });
    sessionStorage.setItem("cart", JSON.stringify(cartItems));
  };

  const handleDecrement = (productId, quantity) => {
    if (quantity === 1) {
      cartItems = cartItems.filter((item) => item.productId !== productId);
    } else {
      cartItems = cartItems.map((item) => {
        if (item.productId === productId) {
          return {
            ...item,
            quantity: quantity - 1,
          };
        } else {
          return item;
        }
      });
    }
    sessionStorage.setItem("cart", JSON.stringify(cartItems));
  };
</script>

<main>
  <div class="wrapper">
    <h2>Checkout</h2>
    <p>Please check summary of your order and proceed to the payment</p>
    {#if cartItems !== null && cartItems.length !== 0}
      <div class="itemsWrapper">
        {#each cartItems as { productName, productImg, quantity, productId }}
          <div class="item">
            <img src={productImg} alt={productName} />
            <h4>{productName}</h4>
            <div class="counter">
              <Button
                variant="raised"
                on:click={() => handleDecrement(productId, quantity)}
              >
                <Label>-</Label>
              </Button>
              <span>{quantity}</span>
              <Button
                variant="raised"
                on:click={() => handleIncrement(productId, quantity)}
              >
                <Label>+</Label>
              </Button>
            </div>
          </div>
        {/each}
      </div>
      <form>
        <Textfield
          style="width: 100%;"
          helperLine$style="width: 100%;"
          bind:value={cardNumber}
          label="Credit Card Number"
          required
          type="number"
        >
          <HelperText slot="helper">Enter your credit card number</HelperText>
        </Textfield>
        <Textfield
          style="width: 100%;"
          helperLine$style="width: 100%;"
          bind:value={address}
          label="Delivery Address"
          required
          input$maxlength={18}
        >
          <HelperText slot="helper">Enter your delivery address</HelperText>
        </Textfield>
        <Textfield
          style="width: 100%;"
          helperLine$style="width: 100%;"
          bind:value={email}
          label="Credit Card Number"
          required
          input$maxlength={18}
        >
          <HelperText slot="helper"
            >Enter your email to receive order confirmation</HelperText
          >
        </Textfield>
        <Button
          variant="raised"
          type="submit"
          style="width: 100%; margin-top: 16px"
        >
          <Label>Pay</Label>
        </Button>
      </form>
    {:else}
      <p>
        Your cart is empty. Do not wait and add some <Link to={HOME}
          >products</Link
        >
      </p>
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

  .itemsWrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .item {
    display: flex;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    border-radius: 12px;
    overflow: hidden;
  }

  img {
    height: 64px;
    aspect-ratio: 16 / 9;
    object-fit: cover;
  }

  h4 {
    margin-left: 16px;
    flex: 1;
  }

  .counter {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-right: 16px;
  }

  form {
    margin-top: 48px;
  }
</style>
