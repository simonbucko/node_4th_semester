<script>
  import axios from "axios";
  import { onMount } from "svelte";
  import { SERVER_API_URL } from "../../common/constants";

  let products = [];

  onMount(async () => {
    const {
      data: { data },
    } = await axios.get(`${SERVER_API_URL}/products`);
    products = data.products;
  });
</script>

{#each products as product}
  <p>
    {product.name}
  </p>
{:else}
  <p>loading...</p>
{/each}
