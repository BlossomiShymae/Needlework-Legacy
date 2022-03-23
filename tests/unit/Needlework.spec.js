/*** @jest-environment node*/

import Needlework from "@/apis/Needlework";

// Currently this test suite only works with an active League Client instance.
// Make sure the League Client is running before starting this suite.

describe("Needlework.js", () => {
  let api;

  beforeEach(() => {
    api = new Needlework();
    return api.initialize();
  });

  it("currentSummoner() getter returns an object", async () => {
    const summoner = await api.currentSummoner;
    expect(summoner).toEqual(expect.any(Object));
  });

  it("wallet() getter returns an object", async () => {
    const wallet = await api.wallet;
    expect(wallet).toEqual(expect.any(Object));
  });

  it("playerLootMap() getter returns an object", async () => {
    const map = await api.playerLootMap;
    expect(map).toEqual(expect.any(Object));
  });
});
