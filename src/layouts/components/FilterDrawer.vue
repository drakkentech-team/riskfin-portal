<template>
  <v-card style="height: 100%;" 
    :value="show"
    @input="$emit('update:show', $event)"
    v-if = "show"
  >
    <VCardTitle 
      class="text-md-h5 text-primary"
    >
      Filters
    </VCardTitle>
    <v-row class="pl-6 pt-3">
      <v-col cols="10">
        First Name
        <v-text-field
          v-model="firstName"
          required
        />
      </v-col>
    </v-row>
    <v-row class="pl-6 pt-3">
      <v-col cols="10">
        Last Name
        <v-text-field
          v-model="firstName"
          required
        />
      </v-col>
    </v-row>

  </v-card>
</template>

<script>
  export default {
    props: {
      show: {
        type: Boolean,
        default: false
      }
    }
  }
</script>
