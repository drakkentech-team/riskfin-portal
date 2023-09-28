<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn 
        variant="text"
        v-bind="props"
        prepend-icon="ic:round-plus"
      >
        {{text}}
      </v-btn>
    </template>

    <v-list>
      <v-list-item
        v-for="(item, index) in fields"
        :key="index"
        :value="index"
        @click="insertPlaceholder(item.value)"
      >
        <v-list-item-title>{{ item.heading }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: 'Placeholders',
  props: {
    text: {
      type: String,
      default: () => ""
    },
    body: {
      type: String,
      default: () => ""
    },
    setRef: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      fields: [
        { title: 'First Name', value: '{First Name}' },
        { title: 'Last Name', value: '{Last Name}' },
        { title: 'Policy', value: '{Policy}' },
        { title: 'Date', value: '{Date}' },
        { title: 'Days in arrears', value: '{Days in arrears}' },
      ]
    }
  },
  methods: {
    insertPlaceholder(placeholder) {
      console.log('this is body', this.setRef)
      let updatedText;
      const lastCharacter = this.body.slice(-1);
      if (lastCharacter === ' ') {
        updatedText = this.body + placeholder;
      } else {
        updatedText = this.body + ' ' + placeholder;
      }
      this.$emit('placeholder', updatedText);
    }
  }
}
</script>


