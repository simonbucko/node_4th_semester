<script>
  let customers = [
    { id: 1, name: "Simon", isActive: true },
    { id: 2, name: "Adam", isActive: false },
    { id: 3, name: "Lark", isActive: true },
    { id: 4, name: "Silvia", isActive: true },
    { id: 5, name: "Garau", isActive: false },
  ];
</script>

<h2>Logic</h2>
{#each customers as customer (customer.id)}
  {#if customer.isActive}
    <div>{customer.name} is active</div>
  {:else}
    <div>{customer.name} is not active</div>
  {/if}
{/each}
