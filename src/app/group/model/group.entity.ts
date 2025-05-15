export class Group {
    id: number;
    name: string;
    description: string;

    constructor(group: {
        id?: number;
        name?: string;
        description?: string;
    }) {
        this.id = group.id || 0;
        this.name = group.name || '';
        this.description = group.description || '';
    }
}
