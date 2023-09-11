import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Character } from '../../../_interfaces/character';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.css']
})
export class CharacterDetailsComponent {

  constructor(
    public dialogRef: MatDialogRef<CharacterDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Character
  ) { }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
