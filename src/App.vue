<template>
  <w-app>
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <Suspense timeout="0">
          <template #default>
            <component :is="Component" />
          </template>
          <template #fallback> Loading... uwu </template>
        </Suspense>
      </transition>
    </router-view>
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
