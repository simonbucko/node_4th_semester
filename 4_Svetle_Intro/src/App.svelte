<script>
  import Introduction from "./sections/Introduction.svelte";
  import Reactivity from "./sections/Reactivity.svelte";
  import Props from "./sections/Props.svelte";

  const data = {
    color: "red",
    text: "Hey sister",
  };
</script>

<Introduction />
<hr />
<Reactivity />
<hr />
<Props {...data} />
<hr />

<style>
</style>
