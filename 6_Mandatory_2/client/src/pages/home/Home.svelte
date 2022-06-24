<script>
  import axios from "axios";
  import { onMount } from "svelte";
  import { SERVER_API_URL } from "../../common/constants";
  import Loader from "../../common/Loader.svelte";
  import LayoutGrid, { Cell } from "@smui/layout-grid";
  import Card from "./Card.svelte";
  import SearchFilter from "./SearchFilter.svelte";

  let products = [];

  onMount(async () => {
    const {
      data: { data },
    } = await axios.get(`${SERVER_API_URL}/products`);
    products = data.products;
  });

  const handleSearch = (searchObj) => {
    console.log(products);
  };
</script>

<main>
  <SearchFilter onSearch={handleSearch} />
  <div class="wrapper">
    {#if !!products.length}
      <LayoutGrid>
        {#each products as product}
          <Cell>
            <Card
              name={product.name}
              productId={product._id}
              price={product.price}
              src={product.imgUrl}
            />
          </Cell>
        {/each}
      </LayoutGrid>
    {:else}
      <Loader />
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
</style>
