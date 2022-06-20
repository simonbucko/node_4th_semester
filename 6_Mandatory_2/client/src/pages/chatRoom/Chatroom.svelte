<script>
  import { onMount } from "svelte";
  import axios from "axios";
  import { SERVER_API_URL, SERVER_SOCKET_URL } from "../../common/constants";
  import io from "socket.io-client";
  import { user, chatRoomSocket } from "../../store/store";
  import Loader from "../../common/Loader.svelte";
  import Button, { Label } from "@smui/button";
  import { useParams } from "svelte-navigator";

  const params = useParams();
  let chatRoom = null;
  let isLoadingChatRoom = true;
  let socket;

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
        console.log(message);
        //push message to the messages
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
    isLoadingChatRoom = false;
  });
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
        {#each chatRoom.messages as message}
          <p>{message.text}</p>
        {/each}
      </div>
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
    overflow-y: scroll;
  }
</style>
