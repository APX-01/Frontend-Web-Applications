import {ProfilesInGroups} from "./profiles-in-groups.entity";

export type Role = 'student' | 'teacher';
export class User {
    id: number;              // Solo para el backend
    email: string;             // Requerido y único
    firstName: string;
    lastName: string;
    role: Role;                // Solo 'estudiante' o 'profesor'
    password: string;         // Solo para formularios (¡nunca lo almacenes en frontend!)
    profilesInGroups?: ProfilesInGroups[];

    constructor() {
        this.id = 0;
        this.email = "";
        this.firstName = "";
        this.lastName = "";
        this.role = "student";
        this.password = "";
        this.profilesInGroups = [];
    }

}