<template>
  <v-dialog v-model="isOpen" persistent max-width="600">
    <template v-slot:activator="{ on }">
      <button class="modal-button" @click="isOpen = !isOpen">{{ title }}</button>
    </template>
    <v-card>
      <!-- Modal Header with close button -->
      <v-card-title>
        <div class="modal-header">
          <h2>{{ title }}</h2>
          <v-btn icon @click="closeModal">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </v-card-title>

      <!-- Slot for modal content -->
      <v-card-text class="modal-body">
        <slot></slot>
      </v-card-text>

      <!-- Modal Footer with close button -->
      <v-card-actions class="modal-footer">
        <v-btn @click="closeModal" color="error" text>
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
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
.modal-button {
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 20px;
  color: #000;
  text-decoration: underline;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.modal-header h2 {
  margin: 0;
}

.modal-body {
  margin-bottom: 20px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
}
</style>
  