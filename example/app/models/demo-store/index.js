import { types } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-env"

export const DemoStoreModel = types
    .model("DemoStore")
    .props({
        token: "demo main store"
    })
    .extend(withEnvironment)
    .actions((self) => ({
        saveDemo: (characterSnapshots) => {
            self.token = characterSnapshots
        },
    }))

export const createDemoStoreModelDefaultModel = () => types.optional(DemoStoreModel, {})
