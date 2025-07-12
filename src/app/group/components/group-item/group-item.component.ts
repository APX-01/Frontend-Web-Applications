import { Component, Input, OnInit } from '@angular/core';
import { Group } from "../../model/group.entity";
import {
    MatCard, MatCardActions,
    MatCardContent,
    MatCardFooter,
    MatCardHeader, MatCardImage,
    MatCardSubtitle,
    MatCardTitle
} from "@angular/material/card";
import { MatButton, MatIconButton } from "@angular/material/button";
import { ProfileInGroup } from "../../../iam/model/profile-in-group.entity";
import { RouterLink } from "@angular/router";
import { MatIcon } from "@angular/material/icon";
import {TranslatePipe} from "@ngx-translate/core";

@Component({
    selector: 'app-group-item',
    imports: [
        MatCard,
        MatCardHeader,
        MatCardTitle,
        MatCardSubtitle,
        MatCardContent,
        MatCardFooter,
        RouterLink,
        MatCardImage,
        MatIcon,
        MatIconButton,
        TranslatePipe
    ],
    templateUrl: './group-item.component.html',
    standalone: true,
    styleUrl: './group-item.component.css'
})
export class GroupItemComponent implements OnInit {
    @Input() group: Group = new Group({});
    @Input() groupProfile: ProfileInGroup = new ProfileInGroup({});

    ngOnInit(): void {

    }
}
