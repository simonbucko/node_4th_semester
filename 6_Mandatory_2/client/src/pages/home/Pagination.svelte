<script>
  import IconButton from "@smui/icon-button";
  export let currentPage;
  export let lastPage;
  export let onNextPage;
  export let onPreviousPage;
</script>

<section>
  <IconButton
    class="material-icons"
    on:click={onPreviousPage}
    disabled={currentPage === 1}>arrow_back_ios</IconButton
  >
  <div>{currentPage}/{lastPage}</div>
  <IconButton
    class="material-icons"
    on:click={onNextPage}
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
