/*** @jest-environment node*/

import CommunityDragon from "../../src/apis/communitydragon";

describe("communitydragon.js", () => {
  it("processes a tile icon when passed", async () => {
    const api = new CommunityDragon();

    const buffer = await api.getTileIcon(
      "/lol-game-data/assets/v1/champion-tiles/711/711000.jpg"
    );

    expect(buffer).toBeTruthy();
  });
});
