/*** @jest-environment node*/

import ElectronStore from '../../src/apis/ElectronStore';

describe('ElectronStore.js', () => {
  let api: ElectronStore;

  beforeEach(() => {
    api = ElectronStore.getInstance();
  });

  it('getStore() returns an object', () => {
    const store = api.getStore();
    expect(store).toEqual(expect.any(Object));
  });

  // it("setStore(store) properly sets the store object", () => {
  //   const store = vuexInjector(config);
  //   api.setStore(store);
  //   expect(api.store.store).toEqual(vuexInjector(config));
  // });
});
