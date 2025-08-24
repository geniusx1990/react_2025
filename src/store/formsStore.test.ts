import { useFormsStore } from './formsStore';

test('adds entry and marks seen', () => {
    const add = useFormsStore.getState().addEntry;
    add({ id:'1', name:'N', age:1, email:'e', password:'p', gender:'male', terms:true, country:'LT' });
    expect(useFormsStore.getState().entries[0]._new).toBe(true);
    useFormsStore.getState().markAllSeen();
    expect(useFormsStore.getState().entries[0]._new).toBe(false);
});
