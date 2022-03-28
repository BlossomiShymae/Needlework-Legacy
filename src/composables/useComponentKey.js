import { ref } from "vue";

export default function useComponentKey() {
  const componentKey = ref(0);
  const forceRerender = (componentKey) => {
    componentKey.value += 1;
  };
  return {
    componentKey,
    forceRerender,
  };
}
