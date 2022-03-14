<script>
  import Wrapper from "../components/events/Wrapper.svelte";

  let userName = "";

  function setUserName(e) {
    userName = e.detail.name;
    console.log(e);
  }
</script>

<h2>Events</h2>
<Wrapper on:user={setUserName} />
<div>User name is: {userName}</div>
