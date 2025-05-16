export class GroupJoinCode {
    id: number;
    key: string;
    groupId: number;

    constructor(groupJoinCode: {
        id?: number;
        key?: string,
        groupId?: number
    }) {
        this.id = groupJoinCode.id || 0;
        this.key = groupJoinCode.key || '';
        this.groupId = groupJoinCode.groupId || 0;
    }
}
