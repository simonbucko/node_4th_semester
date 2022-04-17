<script>
  import axios from "axios";
  import { onMount } from "svelte";
  import { SERVER_API_URL } from "../../common/constants";
  import Loader from "../../common/Loader.svelte";

  let products = [];

  onMount(async () => {
    const {
      data: { data },
    } = await axios.get(`${SERVER_API_URL}/products`);
    // products = data.products;
  });
</script>

<main>
  <div class="wrapper">
    {#each products as product}
      {product.name}
    {:else}
      <Loader />
    {/each}
  </div>
</main>

<style>
  main,
  .wrapper {
    height: 100%;
  }
</style>
