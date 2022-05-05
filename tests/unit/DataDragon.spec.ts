/*** @jest-environment node*/

import axios from "axios";
import DataDragon from "../../src/apis/DataDragon";

describe("DataDragon.js", () => {
  let api: DataDragon;

  beforeEach(() => {
    api = new DataDragon();
  });

  it("getProfileIcon(id) returns a buffer", async () => {
    const buffer = await api.getProfileIcon("0");
    expect(Buffer.isBuffer(buffer)).toBeTruthy();
  });

  it("getLatestVersion() returns a string of latest version", async () => {
    const number = await api.getLatestVersion();
    expect(number).toEqual(expect.any(String));
  });
});
