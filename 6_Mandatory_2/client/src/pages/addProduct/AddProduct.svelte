<script>
  import Button, { Label } from "@smui/button";
  import axios from "axios";
  import { SERVER_API_URL } from "../../common/constants";
  import Loader from "../../common/Loader.svelte";
  import Snackbar, { Actions, Label as SnackLabel } from "@smui/snackbar";
  import IconButton from "@smui/icon-button";
  import Textfield from "@smui/textfield";
  import HelperText from "@smui/textfield/helper-text";

  let cardNumber = "";
  let deliveryAddress = "";
  let email = "";
  let snackbarWithClose;
  let isProcessingOrder = false;

  const handleSubmit = async (e) => {
    e.preventDefault();
    isProcessingOrder = true;
    try {
      await axios.post(`${SERVER_API_URL}/order`, {
        userId: "",
        products,
        deliveryAddress,
        cardNumber,
        email,
      });
    } catch (error) {
      console.log(error);
    }
    snackbarWithClose.open();
    isProcessingOrder = false;
    email = "";
    deliveryAddress = "";
    cardNumber = "";
  };
</script>

<main>
  <div class="wrapper">
    <h2>Add new product</h2>
    <form on:submit={handleSubmit}>
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
        bind:value={deliveryAddress}
        label="Delivery Address"
        required
        input$maxlength={30}
      >
        <HelperText slot="helper">Enter your delivery address</HelperText>
      </Textfield>
      <Textfield
        style="width: 100%;"
        helperLine$style="width: 100%;"
        bind:value={email}
        label="Email Address"
        required
        input$maxlength={40}
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
  </div>
</main>

<Snackbar bind:this={snackbarWithClose} class="success">
  <SnackLabel>New product has been added</SnackLabel>
  <Actions>
    <IconButton class="material-icons" title="Dismiss">close</IconButton>
  </Actions>
</Snackbar>

{#if isProcessingOrder}
  <div class="modal">
    <Loader />
  </div>
{/if}

<style>
  main,
  .wrapper {
    height: 100%;
    max-width: 1000px;
    margin: auto;
  }

  form {
    margin-top: 48px;
  }

  .modal {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: black;
    opacity: 0.6;
  }
</style>
