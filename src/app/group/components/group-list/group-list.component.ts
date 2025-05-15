import {Component, OnInit} from '@angular/core';
import {Group} from "../../model/group.entity";
import {GroupService} from "../../services/group.service";
import {GroupItemComponent} from "../group-item/group-item.component";
import {MatFormField, MatHint, MatInput, MatLabel} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {GroupJoinCode} from "../../model/group-join-code.entity";
import {GroupJoinCodeService} from "../../services/group-join-code.service";
import {AuthService} from "../../../iam/services/auth.service";

@Component({
  selector: 'app-group-list',
  imports: [
    GroupItemComponent,
    MatFormField,
    MatInput,
    FormsModule,
    MatLabel,
    MatIcon,
    MatIconButton,
    MatButton,
    MatHint
  ],
  templateUrl: './group-list.component.html',
  standalone: true,
  styleUrl: './group-list.component.css'
})
export class GroupListComponent implements OnInit {

  joinCodeString: string = '';

  joinCode!: GroupJoinCode;
  joinFailed: boolean = false;

  availableGroups:number[]= [];
  groups: Group[] = [];

  constructor(private groupService: GroupService, private groupJoinCodeService: GroupJoinCodeService,private authService: AuthService) { }

  ngOnInit(): void {
    this.getAvailableGroups()

  }

  private getAvailableGroups(): void {
    this.groups = []

    this.availableGroups.forEach((groupId) => {
      this.groupService.getById(groupId).subscribe({
        next: group => {
          this.groups.push(group)
        },
        error: err => {
          console.error(`Error al obtener el grupo con ID ${groupId}:`, err);
        }
      })
    })
  }

  submitCode(): void {



    this.joinCode = new GroupJoinCode({});

    this.groupJoinCodeService.getByKey(this.joinCodeString).subscribe({
      next: code => {
        this.joinCode = code;
        console.log(code)

        /*const user = this.authService.getUser();
        if (user) {
          console.log(user.profilesInGroups,"AQUIIIIII ANTES DE HACER EL PUSH");
          this.authService.addProfilesInGroups(user, this.joinCode.key).subscribe({
            next: updatedUser => {
              console.log('Perfiles en grupos actualizados:', updatedUser);
            },
            error: err => {
              console.error('Error al actualizar perfiles en grupos:', err);
            }
          });

        }*/

        console.log(`Codigo de grupo asignado al código: ${code.groupId}`)

        if (this.joinCode && !this.availableGroups.includes(this.joinCode.groupId)) {
          this.availableGroups.push(this.joinCode.groupId)
          console.log(this.availableGroups)
          this.getAvailableGroups()

        } else {
          this.joinFailed = true;
        }

      },
      error: err => {
        console.error(`No existe el código: ${this.joinCodeString}:`, err);
      }
    })
  }
}
