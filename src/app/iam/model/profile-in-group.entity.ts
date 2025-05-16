export class ProfileInGroup {
    groupId: number;
    score: number;

    constructor(profileInGroup: {
        groupId?: number,
        score?: number
    }) {
        this.groupId = profileInGroup.groupId || 0;
        this.score = profileInGroup.score || 0;
    }
}
