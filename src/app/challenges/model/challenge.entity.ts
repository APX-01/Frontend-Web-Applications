export class Challenge {
    id: number;
    title: string;
    description: string;
    groupId: number;
    deadline: Date;

    constructor(challenge:{id?: number, title?: string, description?: string, groupId?: number, deadline?: Date}) {
        this.id = challenge.id || 0;
        this.title = challenge.title || '';
        this.description = challenge.description || ''  ;
        this.groupId = challenge.groupId || 0 ;
        this.deadline = challenge.deadline || new Date();
    }
}
