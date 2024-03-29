<template>
  <div id="settings">
    <WindowButtonBar />
    <div id="settings-grid">
      <w-list id="settings-routes" :items="settingLinks" nav color="primary">
        <template #item="{ item }">
          <span>{{ item.label }}</span>
          <div class="spacer"></div>
          <w-icon md color="grey-dark2">{{ item.icon }}</w-icon>
        </template>
      </w-list>
      <div id="settings-view">
        <router-view />
      </div>
      <div id="settings-exit-area">
        <w-button id="exit-settings-button" @click="pushRouter()"
          >Exit</w-button
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import WindowButtonBar from '@/components/controls/WindowButtonBar.vue';

export default defineComponent({
  name: 'Settings',
  components: {
    WindowButtonBar,
  },
});
</script>

<script setup lang="ts">
import useSettings from '@/composables/useSettings';
import router from '@/router';
import { IChannel } from '@/channels';

const settingLinks = [
  {
    label: 'General',
    id: 'general',
    icon: 'mdi mdi-application-settings',
    route: '/settings/general',
  },
  {
    label: 'Data',
    id: 'data',
    icon: 'mdi mdi-code-json',
    route: '/settings/data',
  },
];

const { theme } = useSettings();

const pushRouter = async () => {
  const isClientActive = await window.ipcRenderer.invoke(
    IChannel.isClientActive
  );
  if (isClientActive === true) router.push('/home');
  if (isClientActive === false) router.push('/inactive');
};
</script>

<style lang="scss" scoped>
#settings {
  background-color: v-bind('theme.frameColor');
  color: v-bind('theme.textColor');
  z-index: 10;
  height: 100%;
  width: 100%;
}

#settings-grid {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 5fr;
  grid-template-rows: 9fr 1fr;
  overflow: hidden;
  height: 100vh;
}

#settings-routes {
  overflow-y: auto;
  grid-row: span 2;
}

#exit-settings-button {
  background-color: v-bind('theme.paletteColor[0]');
  margin: auto;
  padding: 16px;
  border: 1px solid grey;
}

#settings-exit-area {
  grid-column: 2;
  background-color: v-bind('theme.cardColor');
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
