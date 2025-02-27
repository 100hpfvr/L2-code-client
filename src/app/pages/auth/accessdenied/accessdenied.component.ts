import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    templateUrl: './accessdenied.component.html',
    standalone: true,
    imports: [RouterLink, CommonModule],
})
export class AccessdeniedComponent { }
