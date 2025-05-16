export class Group {
    id: number;
    name: string;
    description: string;
    imageUrl: string;

    constructor(group: {
        id?: number;
        name?: string;
        description?: string;
        imageUrl?: string;
    }) {
        this.id = group.id || 0;
        this.name = group.name || '';
        this.description = group.description || '';
        this.imageUrl = group.imageUrl || `https://picsum.photos/seed/${Date.now() + Math.random()}/1600/800`;
    }
}
