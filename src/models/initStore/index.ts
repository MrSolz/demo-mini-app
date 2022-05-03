import { types } from "mobx-state-tree"

export interface InitSnapshotType {
    api_url: string,
    token: string,
    project: string
}
export const InitStoreModel = types
    .model("InitStore")
    .props({
        api_url: "",
        token: "",
        project: ""
    })
    .actions((self) => ({
        saveInit: (initSnapshotType: InitSnapshotType) => {
            self.api_url = initSnapshotType.api_url
            self.token = initSnapshotType.token
            self.project = initSnapshotType.project

        },
        getInit: () => {

        }
    }))
