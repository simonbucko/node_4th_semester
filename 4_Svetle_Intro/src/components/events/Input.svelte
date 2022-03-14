<script>
  import { createEventDispatcher } from "svelte";

  let name = "";

  const dispatch = createEventDispatcher();

  function setName(e) {
    name = e.target.value;
    dispatch("user", {
      name,
    });
  }
</script>

<input type="text" value={name} on:change|nonpassive={setName} />
