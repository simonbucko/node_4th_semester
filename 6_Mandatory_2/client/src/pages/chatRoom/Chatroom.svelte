<script>
  import { onMount } from "svelte";
  import axios from "axios";
  import { SERVER_API_URL, SERVER_SOCKET_URL } from "../../common/constants";
  import io from "socket.io-client";
  import { user } from "../../store/store";
  import Loader from "../../common/Loader.svelte";
  import Button, { Label } from "@smui/button";
  import { navigate } from "svelte-navigator";
  import { useParams } from "svelte-navigator";

  const params = useParams();
  let chatRooms = [];
  let isLoadingChatRooms = true;

  onMount(async () => {
    const socket = io(`${SERVER_SOCKET_URL}/chatrooms`);
    socket.on("new-message", (message) => {});
    const {
      data: { data },
    } = await axios.get(`${SERVER_API_URL}/chatrooms/${$params.socketId}`, {
      headers: {
        Authorization: `Bearer ${$user.token}`,
      },
    });
    chatRooms = data.chatRooms;
    isLoadingChatRooms = false;
  });
</script>

<main>
  <div class="wrapper">
    <h2>Chat Room</h2>
    <p>Customer name:</p>
    <p>Category:</p>
  </div>
</main>

<style>
  main,
  .wrapper {
    height: 100%;
    max-width: 1000px;
    margin: auto;
  }
</style>
