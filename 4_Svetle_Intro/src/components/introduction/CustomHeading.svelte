<script>
  export let text = "";
  let template = "<strong>This</strong> website was created by";
</script>

<h3>{@html template} {text}</h3>

<style>
  h3 {
    color: brown;
    font-weight: unset;
  }
</style>
