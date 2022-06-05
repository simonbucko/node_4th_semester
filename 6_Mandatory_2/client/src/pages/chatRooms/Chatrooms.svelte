<script>
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
