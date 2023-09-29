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
        <v-list-item-title>{{ item.title }}</v-list-item-title>
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
      let updatedText;
      const cursorPosition = this.setRef.selectionStart;
      const beforeCursor = this.body.substring(0, cursorPosition);
      const afterCursor = this.body.substring(cursorPosition);
      const addSpaceBefore = beforeCursor && !beforeCursor.endsWith(' ');
      const addSpaceAfter = afterCursor && !afterCursor.startsWith(' ');
      
      updatedText = beforeCursor + (addSpaceBefore ? ' ' : '') +
                    placeholder + (addSpaceAfter ? ' ' : '') +
                    afterCursor;

      const newCursorPosition = cursorPosition + placeholder.length + (addSpaceBefore ? 1 : 0);
      this.setRef.setSelectionRange(newCursorPosition, newCursorPosition);

      this.$emit('placeholder', updatedText);
    }
  }
}
</script>


