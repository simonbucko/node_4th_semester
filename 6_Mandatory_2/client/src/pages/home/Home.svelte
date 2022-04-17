<script>
  import axios from "axios";
  import { onMount } from "svelte";

  let products = [];

  onMount(async () => {
    const {
      data: { data },
    } = await axios.get("http://localhost:8000/api/products");
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
