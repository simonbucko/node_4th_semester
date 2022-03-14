<script>
  import Introduction from "./sections/Introduction.svelte";
  import Reactivity from "./sections/Reactivity.svelte";
  import Props from "./sections/Props.svelte";
  import Logic from "./sections/Logic.svelte";

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
<Logic />
<hr />

<style>
</style>
