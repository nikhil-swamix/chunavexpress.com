import { writable } from 'svelte/store';

const english = false;
const hindi = false;
let store = writable({ english, hindi });

// store.subscribe(value => console.log(value));
export default store;
