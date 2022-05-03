export { default as DemoScreen } from './screens/Demo/demo'
import { Subject } from 'rxjs';
import { store, getStore } from './models';
interface DefaultProps {
    api_url: string,
    token: string,
    project: string
};
export const setInit = (obj: DefaultProps) => {
    console.log("set store", obj);
    store.initStore.saveInit(obj)
    console.log('====================================');
    console.log("initStore", getStore);
    console.log('====================================');
}
export const subject = new Subject()