<script>
  import { onMount } from "svelte";
  import { SERVER_API_URL, SERVER_SOCKET_URL } from "../../common/constants";
  import io from "socket.io-client";

  onMount(async () => {
    const socket = io(`${SERVER_SOCKET_URL}/chatrooms`);
  });
</script>

<main>
  <div class="wrapper">ehllo</div>
</main>

<style>
  main,
  .wrapper {
    height: 100%;
    max-width: 1000px;
    margin: auto;
  }
</style>
