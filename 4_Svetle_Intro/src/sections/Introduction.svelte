<script>
  import CustomHeading from "../components/introduction/CustomHeading.svelte";
  let name = "Simon Bucko";
  let src =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Svelte_Logo.svg/1200px-Svelte_Logo.svg.png";
</script>

<h2>Introduction</h2>
<CustomHeading text={name} />
<img {src} alt="svelte" />

<style>
  img {
    width: 50px;
  }
</style>
