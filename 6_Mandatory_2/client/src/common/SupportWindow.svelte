<script>
  import io from "socket.io-client";
  import { onMount } from "svelte";
  import { SERVER_SOCKET_URL } from "./constants";
  import { chatRoomsSocket } from "../store/store";
  import IconButton from "@smui/icon-button";

  let isSupportWindowOpen = false;

  onMount(async () => {});

  const handleSupportWindowOpen = () => {
    isSupportWindowOpen = !isSupportWindowOpen;
  };
</script>

<div class="chip" on:click={handleSupportWindowOpen}>
  <h4>Can we help you?</h4>
</div>

{#if isSupportWindowOpen || 1}
  <div class="supportWindow">
    <div class="actionButtons">
      <IconButton class="material-icons color-bright">minimize</IconButton>
      <IconButton class="material-icons color-bright">close</IconButton>
    </div>
    <h4 class="windowTitle">Support</h4>
    <div class="windowBody">This is body</div>
  </div>
{/if}

<style>
  .supportWindow {
    position: fixed;
    right: 16px;
    bottom: 16px;
    z-index: 1500;
    width: 400px;
    height: 450px;
    background-color: var(--bright-color);
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    border-radius: 12px;
    overflow: hidden;
  }
  .actionButtons {
    position: absolute;
    right: 0;
    top: -4px;
  }
  .windowTitle {
    background-color: var(--primary-color);
    text-align: center;
    color: var(--bright-color);
    padding: 8px 0;
  }
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
  h4,
  h5 {
    margin: 0;
  }
</style>
