<script>
  import { onMount } from "svelte";
  import axios from "axios";
  import { SERVER_API_URL, SERVER_SOCKET_URL } from "../../common/constants";
  import io from "socket.io-client";
  import { user } from "../../store/store";
  import Loader from "../../common/Loader.svelte";

  let chatRooms = [];
  let isLoadingChatRooms = true;

  onMount(async () => {
    const socket = io(`${SERVER_SOCKET_URL}/chatrooms`);
    //TODO:finish this socket thing here
    const {
      data: { data },
    } = await axios.get(`${SERVER_API_URL}/chatrooms`, {
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
    <h2>Chat Rooms</h2>
    <p>Here you can see overview of all active support chat rooms</p>
    {#if isLoadingChatRooms}
      <Loader />
    {:else if !!chatRooms.length}
      <div class="itemsWrapper">
        {#each chatRooms as chatRoom}
          <div class="card">
            <h5>Custorer: {chatRoom.userName}</h5>
            <h5>Category: {chatRoom.category}</h5>
          </div>
        {/each}
      </div>
    {:else}
      <p>
        There are no active waiting rooms. That means, we only have happy
        customers!
      </p>
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
  .itemsWrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .card {
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    border-radius: 12px;
    overflow: hidden;
    padding: 0 16px;
  }
</style>
