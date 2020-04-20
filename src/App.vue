<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}

html,
body,
#app {
  position: relative;
  height: 100%;
}
</style>
