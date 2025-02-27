import { CommonModule } from '@angular/common';
import { Component, input, Input } from '@angular/core';

@Component({
  selector: 'app-avatar-photo-placeholder',
  templateUrl: './avatar-photo-placeholder.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./avatar-photo-placeholder.component.scss'],
})
export class AvatarPhotoPlaceholderComponent {
  public photoUrl = input<string>()
  public name = input<string>()
  public showInitials = false;
  public initials: string = '';
  public circleColor: string = '';

  private colors = [
    '#EB7181', // red
    '#468547', // green
    '#FFD558', // yellow
    '#3670B2', // blue
  ];

  ngOnInit() {
    if (!this.photoUrl()) {
      this.showInitials = true;
      this.createInititals();

      const randomIndex = Math.floor(
        Math.random() * Math.floor(this.colors.length)
      );
      this.circleColor = this.colors[randomIndex];
    }
  }

  private createInititals(): void {
    let initials = '';
    let providerName = this.name();
    for (let i = 0; i < providerName!.length; i++) {
      if (providerName?.charAt(i) === ' ') {
        continue;
      }

      if (providerName?.charAt(i) === providerName?.charAt(i).toUpperCase()) {
        initials += providerName?.charAt(i);

        if (initials.length == 2) {
          break;
        }
      }
    }

    this.initials = initials;
  }
}
