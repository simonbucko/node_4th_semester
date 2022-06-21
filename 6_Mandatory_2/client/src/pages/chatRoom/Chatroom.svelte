<script>
  import { onMount } from "svelte";
  import axios from "axios";
  import { SERVER_API_URL, SERVER_SOCKET_URL } from "../../common/constants";
  import io from "socket.io-client";
  import { user, chatRoomSocket } from "../../store/store";
  import Loader from "../../common/Loader.svelte";
  import Button, { Label } from "@smui/button";
  import { useParams } from "svelte-navigator";
  import { createMessageObject } from "../../common/functions.js";
  import Textfield from "@smui/textfield";

  const params = useParams();
  let chatRoom = null;
  let messages;
  let isLoadingChatRoom = true;
  let socket;
  let anchor;
  let inputMessage = "";

  onMount(async () => {
    //set up sockets and prevent created new one on each page render
    if (!$chatRoomSocket.isSet) {
      socket = io(`${SERVER_SOCKET_URL}/chatroom`);
      chatRoomSocket.set({ ...$chatRoomSocket, isSet: true, socket });
    } else {
      socket = $chatRoomSocket.socket;
    }
    socket.on("connect", () => {
      socket.on("newMessage", (message) => {
        if (message.sender === "support") return;
        messages = [...messages, message];
      });
    });

    socket.emit("joinRoom", $params.socketId);

    //get chatroom data
    const {
      data: { data },
    } = await axios.get(`${SERVER_API_URL}/chatrooms/${$params.socketId}`, {
      headers: {
        Authorization: `Bearer ${$user.token}`,
      },
    });
    chatRoom = data.chatRoom;
    messages = chatRoom.messages;
    isLoadingChatRoom = false;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newMessage = createMessageObject(inputMessage, "support");
    handleSendMessage(newMessage);
  };

  const handleSendMessage = (message) => {
    emitMessage(message);
    messages = [...messages, message];
    //small interval to render new messages first before scrolling
    setTimeout(() => anchor.scrollIntoView(), 100);
    inputMessage = "";
  };

  const emitMessage = (message) => {
    socket.emit("newMessage", message, $params.socketId);
  };
</script>

<main>
  <div class="wrapper">
    <h2>Chat Room</h2>
    <p>Here you can respond to user's questions</p>
    {#if isLoadingChatRoom}
      <Loader />
    {:else if chatRoom !== null}
      <p>User's name: {chatRoom.userName}</p>
      <p>Category: {chatRoom.category}</p>
      <div class="chatWrapper">
        <div class="messagesWrapper">
          {#each messages as message}
            <div>{message.text}</div>
          {/each}
          <div bind:this={anchor} />
        </div>
      </div>
      <form class="inputWrapper" on:submit={handleSubmit}>
        <Textfield
          variant="outlined"
          bind:value={inputMessage}
          style="height: 100%; flex: 1"
        />
        <Button variant="raised" type="submit" disabled={inputMessage === ""}>
          <Label>Send</Label>
        </Button>
      </form>
    {:else}
      <p>Requested chat is no longer active or it could not be found</p>
    {/if}
  </div>
</main>

<style>
  main,
  .wrapper {
    height: 100%;
    max-width: 1000px;
    margin: auto;
  }
  .chatWrapper {
    height: 60%;
    border: 1px solid rgba(149, 157, 165, 0.2);
    border-radius: 12px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    height: 60%;
  }

  .messagesWrapper {
    flex: 1;
    overflow-y: auto;
  }

  .inputWrapper {
    display: flex;
    height: 36px;
  }
</style>
