/*** @jest-environment node*/

import CommunityDragon from "../../src/apis/CommunityDragon";

describe("CommunityDragon.js", () => {
  let api;

  beforeEach(() => {
    api = new CommunityDragon();
  });

  it("getTileIcon(path) returns a buffer object", async () => {
    const buffer = await api.getTileIcon(
      "/lol-game-data/assets/v1/champion-tiles/711/711000.jpg"
    );
    expect(Buffer.isBuffer(buffer)).toBeTruthy();
  });

  it("getLootTranslation() returns a valid loot translation json object", async () => {
    const json = await api.getLootTranslation();
    expect(json?.loot_type_material?.includes("Material")).toBeTruthy();
  });
});
