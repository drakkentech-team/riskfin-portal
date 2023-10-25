<!-- Modal.vue -->
<template>
  <div class="modal" :class="{ 'is-active': isOpen }">
    <div class="modal-background" @click="closeModal"></div>
    <div class="modal-content">
      <!-- Modal Header with close button -->
      <header class="modal-header">
        <h2>{{ title }}</h2>
        <button class="modal-close" @click="closeModal">×</button>
      </header>

      <!-- Slot for modal content -->
      <div class="modal-body"
        style=" padding-top: 10px;border-top: 0.5px solid rgb(202, 199, 199); border-bottom: 0.5px solid rgb(202, 199, 199);">
        <slot></slot>
      </div>

      <!-- Modal Footer with close button -->
      <footer class="modal-footer">
        <!-- <button class="modal-close" @click="closeModal">Close</button> -->
        <button @click="closeModal"
          style="padding: 3px 12px; border: solid 1px #39f; border-radius: 4px; background-color: #98142c; color: #fff; cursor: pointer;">Close</button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isOpen: Boolean,
    title: String,
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
/* Add styling for the modal and its elements */
.modal {
  position: fixed;
  z-index: 1000;
  display: none;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 50%);
  block-size: 100%;
  inline-size: 100%;
  inset-block-start: 0;
  inset-inline-start: 0;
}

.modal.is-active {
  display: flex;
}

.modal-content {
  padding: 20px;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 20%);
  inline-size: 60%;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-block-end: 10px;
}

.modal-header h2 {
  margin: 0;
}

.modal-close {
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 20px;
}

.modal-body {
  margin-block-end: 20px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
}

/* Add additional styles as needed */
</style>
