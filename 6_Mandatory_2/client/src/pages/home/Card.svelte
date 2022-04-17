<script>
  import Button, { Label } from "@smui/button";
  export let name;
  export let price;
  export let productId;
  export let src;
</script>

<div class="card">
  <img {src} alt={name} />
  <div>{name}</div>
  <div>{price} &euro;</div>
  <div class="bottom">
    <Button variant="raised">
      <Label>Details</Label>
    </Button>
  </div>
</div>

<style>
  .card {
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    border-radius: 12px;
  }
  img {
    width: 100%;
    aspect-ratio: 16/9;
    object-fit: cover;
  }
  div {
    padding: 8px;
  }
  .bottom {
    display: flex;
    justify-content: flex-end;
  }
</style>
