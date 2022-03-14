<script>
  export let rowNumber;
  export let name;
  export let email;
  export let city;
  export let picture;
</script>

<tr>
  <td>
    {rowNumber}.
  </td>
  <td>
    {name}
  </td>
  <td>
    {email}
  </td>
  <td>
    {city}
  </td>
  <td class="picture_cell">
    <img src={picture} alt="profile" />
  </td>
</tr>

<style>
  tr,
  td {
    border: 1px solid black;
    border-collapse: collapse;
  }
  td {
    padding: 0 8px;
  }
  .picture_cell {
    text-align: center;
  }
</style>
