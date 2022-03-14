<script>
  import TableHead from "./TableHead.svelte";
  import { faker } from "@faker-js/faker";
  import TableRow from "./TableRow.svelte";
  export let rows = 10;
</script>

<table>
  <TableHead />
  {#each [...Array(rows).keys()] as index (index)}
    <TableRow
      rowNumber={index + 1}
      name={faker.name.findName()}
      email={faker.internet.email()}
      city={faker.address.city()}
      picture={faker.image.avatar()}
    />
  {/each}
</table>

<style>
  table {
    border: 1px solid black;
    width: 100%;
    border-collapse: collapse;
  }
</style>
