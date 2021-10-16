<template>
  <div class="app-container">
    <span>{{ docs }}</span>
  </div>
</template>
<script>
import {apiDocs} from "@/api/swagger";

export default {
  name: "Info",
  data() {
    return {
      docs: null
    }
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      apiDocs().then(data => {
        this.docs = data;
      });
    }
  }
}
</script>
<style></style>