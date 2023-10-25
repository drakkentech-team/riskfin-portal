<template>
  <button class="rounded-button" @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<style scoped>
  .rounded-button {
    border: 1px solid black; /* Remove the border or customize as needed */
    border-radius: 20px; /* Adjust the border-radius as needed */

    /* background-color: #007bff; Set the background color */
    color: #fff; /* Set the text color */
    cursor: pointer;
    font-size: 16px; /* Adjust the font size as needed */
    padding-block: 10px;
    padding-inline: 20px; /* Adjust padding as needed */
  }
</style>
