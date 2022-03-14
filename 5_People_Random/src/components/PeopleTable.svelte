<script>
  import TableHead from "../../../5_Random_Table/src/components/TableHead.svelte";
  import { faker } from "@faker-js/faker";
  export let rows = 10;
</script>

<table>
  <TableHead />
  {#each [...Array(rows).keys()] as index (index)}
    <li>
      {index}
    </li>
  {/each}
</table>
