export class ProfilesInGroups {
    groupId: number;
    score: number;

    constructor(profileInGroup: { groupId: number, score: number }) {
        this.groupId = profileInGroup.groupId;
        this.score = profileInGroup.score;
    }
}
