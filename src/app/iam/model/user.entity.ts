export type Role = 'student' | 'teacher';
export class User {
    email: string;             // Requerido y único
    firstName: string;
    lastName: string;
    role: Role;                // Solo 'estudiante' o 'profesor'
    password: string;         // Solo para formularios (¡nunca lo almacenes en frontend!)


    constructor() {
        this.email = "";
        this.firstName = "";
        this.lastName = "";
        this.role = "student";
        this.password = "";
    }

}