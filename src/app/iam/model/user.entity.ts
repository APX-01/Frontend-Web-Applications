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



    constructor(user:{id?: number, email?: string, firstName?: string, lastName?: string, role?: Role, password?: string, profilesInGroups?: ProfilesInGroups[]}) {
        this.id = user.id || 0;
        this.email = user.email || '';
        this.firstName = user.firstName || '';
        this.lastName = user.lastName || '';
        this.role = user.role || 'student';
        this.password = user.password || '';
        this.profilesInGroups = user.profilesInGroups || [];
    }
}