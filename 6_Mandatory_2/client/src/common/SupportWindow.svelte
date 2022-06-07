<script>
  import io from "socket.io-client";
  import { onMount } from "svelte";
  import { SERVER_SOCKET_URL } from "./constants";
  import { chatRoomsSocket } from "../store/store";

  const isSupportWindowOpen = false;

  onMount(async () => {});

  const handleSupportWindowOpen = () => {
    isSupportWindowOpen = !isSupportWindowOpen;
  };
</script>

<div class="chip" on:click={handleSupportWindowOpen}>
  <h4>Can we help you?</h4>
</div>

{#if isSupportWindowOpen}
  <div class="supportWindow">
    <div>Support</div>
    <div>This is body</div>
  </div>
{/if}

<style>
  .supportWindow {
    position: fixed;
    right: 0;
    bottom: 0;
    z-index: 1500;
  }
  /* .wrapper {
    position: relative;
    width: 100%;
    height: 100%;
  } */
  .chip {
    position: fixed;
    bottom: 32px;
    right: 32px;
    z-index: 1000;
    color: var(--bright-color);
    background-color: var(--primary-color);
    padding: 16px 32px;
    border-radius: 100px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    cursor: pointer;
    transition: all 0.2s;
    letter-spacing: 1px;
  }
  .chip:hover {
    transform: translateY(-10px);
  }
  h4 {
    margin: 0;
  }
</style>
