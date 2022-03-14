<script>
  let index = 1;

  $: doubled = index * 2;

  function handleClick() {
    index++;
  }
</script>

<h2>Reactivity</h2>
<button on:click={handleClick}>Add 2</button>
<div>Value: {doubled}</div>
