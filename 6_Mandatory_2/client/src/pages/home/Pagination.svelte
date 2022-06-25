<script>
  import Button, { Label } from "@smui/button";
  import Textfield from "@smui/textfield";
  import Menu from "@smui/menu";
  import List, { Item, Text } from "@smui/list";

  import IconButton from "@smui/icon-button";
  export let currentPage;
  export let lastPage;
</script>

<section>
  <IconButton
    class="material-icons"
    on:click={() => {}}
    disabled={currentPage === 1}>arrow_back_ios</IconButton
  >
  <div>{currentPage}/{lastPage}</div>
  <IconButton
    class="material-icons"
    on:click={() => {}}
    disabled={currentPage === lastPage}>arrow_forward_ios</IconButton
  >
</section>

<style>
  section {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 16px;
    gap: 16px;
  }
</style>
