export class Submission {
    id:number;
    challengeId:number;
    studentId:number;
    content:string;
    score:number;

    constructor(submission:{id?:number, challengeId?:number, studentId?:number, content?:string, score?:number}) {
        this.id = submission.id || 0;
        this.challengeId = submission.challengeId || 0;
        this.studentId = submission.studentId || 0;
        this.content = submission.content || '';
        this.score = submission.score || 0;
    }
}
