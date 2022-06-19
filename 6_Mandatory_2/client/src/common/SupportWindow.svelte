<script>
  import io from "socket.io-client";
  import { onMount } from "svelte";
  import { SERVER_SOCKET_URL } from "./constants";
  import IconButton from "@smui/icon-button";
  import Select, { Option } from "@smui/select";
  import Button, { Label } from "@smui/button";
  import { user } from "../store/store";
  import Textfield from "@smui/textfield";

  let isSupportWindowOpen = false;
  let isCategoryAnswered = false;
  let category = "";
  const OPTIONS = ["Product", "Delivery", "Other"];
  let isUserAuthenticated = false;
  let messages = [];
  let inputMessage = "";
  let anchor;
  let socket;

  $: if (!$user.isLoading) {
    isUserAuthenticated = $user.isAuthenticated;
  }

  onMount(async () => {});

  const handleSupportWindowOpen = () => {
    isSupportWindowOpen = !isSupportWindowOpen;
  };

  const handleContinue = () => {
    isCategoryAnswered = true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMessage = createMessageObject(inputMessage, "user");
    if (!messages.length) handleFirstMessage();
    //TODO: emit this to everyone
    messages = [...messages, newMessage];
    //small interval to render new messages first before scrolling
    setTimeout(() => anchor.scrollIntoView(), 100);
    inputMessage = "";
  };

  const createMessageObject = (text, sender) => {
    const unixEpochTime = Math.round(new Date().getTime() / 1000).toString();
    return {
      timestamp: unixEpochTime,
      text,
      sender,
    };
  };

  const handleFirstMessage = () => {
    socket = io(`${SERVER_SOCKET_URL}/chatroom`);
    socket.emit("newChatroom", {
      category,
      userId: $user.id,
    });
  };
</script>

{#if isUserAuthenticated}
  <div>
    <div class="chip" on:click={handleSupportWindowOpen}>
      <h4>Can we help you?</h4>
    </div>

    {#if isSupportWindowOpen}
      <div class="supportWindow">
        <div class="actionButtons">
          <IconButton
            class="material-icons color-bright"
            on:click={handleSupportWindowOpen}>close</IconButton
          >
        </div>
        <h4 class="windowTitle">Support</h4>
        <div class="windowBody">
          {#if !isCategoryAnswered}
            <div>
              <h4>What do you need help with?</h4>
              <p>
                Before you can talk to one of our supporters, we need know, what
                do you need help with, so we can connect you with correct person
              </p>
              <Select
                variant="outlined"
                bind:value={category}
                label="Category"
                class="fullWidth"
              >
                <Option value="" />
                {#each OPTIONS as option}
                  <Option value={option}>{option}</Option>
                {/each}
              </Select>
              <Button
                variant="raised"
                type="submit"
                style="width: 100%; margin-top: 16px"
                disabled={category === ""}
                on:click={handleContinue}
              >
                <Label>Continue</Label>
              </Button>
            </div>
          {:else}
            <div class="chatWrapper">
              <div class="messagesWrapper">
                {#each messages as message}
                  <div class="message">{message.text}</div>
                {/each}
                <div bind:this={anchor} />
              </div>
              <form class="inputWrapper" on:submit={handleSubmit}>
                <Textfield
                  variant="outlined"
                  bind:value={inputMessage}
                  style="height: 100%; flex: 1"
                  class="input"
                />
                <Button
                  variant="raised"
                  type="submit"
                  disabled={inputMessage === ""}
                >
                  <Label>Send</Label>
                </Button>
              </form>
            </div>
          {/if}
        </div>
      </div>
    {/if}
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
  .windowBody {
    padding: 16px;
    height: calc(100% - 70px);
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
  h4 {
    margin: 0;
  }

  .chatWrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .messagesWrapper {
    flex: 1;
    overflow-y: auto;
  }

  .inputWrapper {
    display: flex;
    margin-top: 8px;
  }
</style>
