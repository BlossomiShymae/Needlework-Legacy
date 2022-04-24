import { Ref, ref } from "vue";

export default function useComponentKey() {
  const componentKey = ref(0);
  const forceRerender = (componentKey: Ref<number>) => {
    componentKey.value += 1;
  };
  return {
    componentKey,
    forceRerender,
  };
}
