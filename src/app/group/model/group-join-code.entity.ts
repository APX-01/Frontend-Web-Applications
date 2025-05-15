export class GroupJoinCode {
    key: string;
    groupId: number;

    constructor(groupJoinCode: {
        key?: string,
        groupId?: number
    }) {
        this.key = groupJoinCode.key || '';
        this.groupId = groupJoinCode.groupId || 0;
    }
}
