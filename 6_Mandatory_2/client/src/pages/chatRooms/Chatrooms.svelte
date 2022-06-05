<script>
  import { onMount } from "svelte";
  import axios from "axios";
  import { SERVER_API_URL, SERVER_SOCKET_URL } from "../../common/constants";
  import io from "socket.io-client";
  import { user } from "../../store/store";

  const chatrooms = [];

  onMount(async () => {
    console.log(user);
    const socket = io(`${SERVER_SOCKET_URL}/chatrooms`);
    //TODO:finish this socket thing here
    //TODO:token is for some reason undefined
    const {
      data: { data },
    } = await axios.get(`${SERVER_API_URL}/chatrooms`, {
      headers: {
        Authorization: `Bearer ${$user.token}`,
      },
    });
    chatrooms = data.chatrooms;
  });
</script>

<main>
  <div class="wrapper">hello</div>
</main>

<style>
  main,
  .wrapper {
    height: 100%;
    max-width: 1000px;
    margin: auto;
  }
</style>
