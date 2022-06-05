<script>
  import { onMount } from "svelte";
  import { SERVER_API_URL } from "../../common/constants";
  import io from "socket.io-client";

  onMount(async () => {
    const socket = io(`http://localhost:8001/socket/chatrooms`);
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
