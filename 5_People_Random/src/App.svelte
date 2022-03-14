<script>
  import PeopleTable from "./components/PeopleTable.svelte";
</script>

<div class="wrapper">
  <PeopleTable rows={20} />
</div>

<style>
  .wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
  }
</style>
