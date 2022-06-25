<script>
  import axios from "axios";
  import { onMount } from "svelte";
  import { SERVER_API_URL } from "../../common/constants";
  import Loader from "../../common/Loader.svelte";
  import LayoutGrid, { Cell } from "@smui/layout-grid";
  import Card from "./Card.svelte";
  import SearchFilter from "./SearchFilter.svelte";

  let products = [];
  let isLoadingProducts = true;
  let totalProductsCount;
  let page = 1;
  const limit = 12;

  onMount(async () => {
    try {
      const {
        data: { data },
      } = await axios.get(`${SERVER_API_URL}/products`, {
        params: { page, limit },
      });
      products = data.products;
      totalProductsCount = data.totalCount;
    } catch (error) {
      console.log(error);
    } finally {
      isLoadingProducts = false;
    }
  });

  const handleSearch = async (searchObj) => {
    try {
      isLoadingProducts = true;
      page = 1;
      const {
        data: { data },
      } = await axios.get(`${SERVER_API_URL}/products`, {
        params: { page, limit, ...searchObj },
      });
      products = data.products;
      totalProductsCount = data.totalCount;
    } catch (error) {
      console.log(error);
    } finally {
      isLoadingProducts = false;
    }
  };
</script>

<main>
  <SearchFilter onSearch={handleSearch} />
  <div class="wrapper">
    {#if isLoadingProducts}
      <Loader />
    {:else if products.length === 0}
      <div class="emptyStateMessage">
        No product were found for you search. Check you spelling and try again
      </div>
    {:else}
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
  .emptyStateMessage {
    padding: 0 26px;
    text-align: center;
  }
</style>
