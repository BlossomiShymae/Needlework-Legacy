/*** @jest-environment node*/

import Needlework from "@/apis/Needlework";

jest.useFakeTimers();

describe("Needlework.js", () => {
  let api;

  beforeEach(() => {
    const POLL_PERIOD = 2500;
    api = new Needlework(POLL_PERIOD);
    return api.initialize();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
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
