export interface Management<T> {
    add(data: T);
    showAll();
    edit(name: string, data:T);
    delete(name: string);
    findByName(name: string);
}