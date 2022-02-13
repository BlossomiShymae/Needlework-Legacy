<template>
  <w-app>
    <Suspense>
      <router-view />
    </Suspense>
  </w-app>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Oxygen:wght@300;400;700&display=swap");
html {
  box-sizing: border-box;
  overflow-y: hidden;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

#app {
  font-family: "Oxygen", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: $app-background-color;
  color: black;
}

#nav {
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.loot-grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-auto-rows: 100px;
  gap: 20px;
}
</style>
