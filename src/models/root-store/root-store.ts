import { getSnapshot, types } from "mobx-state-tree"
import { DemoStoreModel } from "../demo-store"
import { InitStoreModel } from "../initStore"

/**
 * A RootStore model.
 */
// prettier-ignore
const RootStoreModel = types.model("RootStore").props({
    demoStore: types.optional(DemoStoreModel, {} as any),
    initStore: types.optional(InitStoreModel, {} as any),
})

export const store = RootStoreModel.create({
    demoStore: {}, // users is required here because it's not marked as optional
    initStore: {}
});
export const getStore = getSnapshot(store);