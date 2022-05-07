/*** @jest-environment node */
import { setActivePinia, createPinia } from "pinia";
import useCraftStatus from "../../src/composables/useCraftStatus";
import * as Fake from "../fake/FakeCraftResponse";

describe("useCraftStatus.ts", () => {
  setActivePinia(createPinia());
  const use = useCraftStatus();

  beforeEach(() => {
    use.resetCraftStore();
  });

  it("craftHistory property returns same data set", () => {
    use.addToCraftedHistory(Fake.CraftResponseA);
    expect(use.craftHistory.value).toContainEqual(Fake.CraftResponseA);
  });

  it("flatCraftHistory property has items with correct craftType", () => {
    use.addToCraftedHistory(Fake.CraftResponseB);
    const isCraftTypeEqual = () => {
      if (
        use.flatCraftedHistory.value[use.flatCraftedHistory.value.length - 1]
          .craftType === "removed"
      ) {
        return true;
      }
      return false;
    };
    expect(isCraftTypeEqual()).toBeTruthy();
  });
});
