<template>
  <div class="container">
    <div class="input-group">
      <input class="form-control my-input" type="text" placeholder="Type here..." v-model="inputText">
      <button class="btn btn-primary send-button" @click="sendData">Send</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      inputText: '',
    };
  },
  methods: {
    async sendData() {
      try {
        const response = await axios.post('http://localhost:5000/test', {
          data: this.inputText
        });
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.input-group {
  display: flex;
  width: 70%;
}

.my-input {
  flex-grow: 1;
  padding: 15px;
  font-size: 20px;
}

.send-button:hover {
  cursor: pointer;
}
</style>
