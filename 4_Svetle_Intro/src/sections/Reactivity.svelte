<script>
  let index = 1;

  $: doubled = index * 2;

  $: console.log("current doubled value is: ", doubled);

  function handleClick() {
    index++;
  }
</script>

<h2>Reactivity</h2>
<button on:click={handleClick}>Add 2</button>
<div>Value: {doubled}</div>
