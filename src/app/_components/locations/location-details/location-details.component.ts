import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LocationSingleResponse } from 'src/app/_interfaces/location';
import { CharactersService } from '../../../_services/characters/characters.service';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.css']
})
export class LocationDetailsComponent implements OnInit {

  charactersResidents: string[] = [];
  residentsIds: string[] = [];
  residentsNames: string[] = [];
  residentsNamesString: string = '';
  error: string | null = null;

  constructor(
    public dialogRef: MatDialogRef<LocationDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LocationSingleResponse,
    private charactersService: CharactersService
  ) { }

  ngOnInit(): void {
    this.loadLocationDetails();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  loadLocationDetails() {
    this.charactersResidents = this.data.residents;
    if (this.charactersResidents.length > 0) {
      this.charactersResidents.forEach((resident, i) => {
        if (resident.length > 0) {
            const residentSplit = resident.split("/");
            const residentId = residentSplit[residentSplit.length - 1];
            this.residentsIds.push(residentId);
        }
      });

      let consulta = this.residentsIds.join(',');
      if (this.residentsIds.length > 1) {
        this.charactersService.getMultipleCharacters(consulta).subscribe(
          (response) => {
            response.forEach((resident) => {
              this.residentsNames.push(resident.name);
              this.residentsNamesString = this.residentsNames.join(',');
            });
          },
          (error) => {
            this.error = error;
          });
        } else {
          this.charactersService.getSingleCharacters(consulta).subscribe(
            (response) => {
              this.residentsNamesString = response.name;
            },
            (error) => {
              this.error = error;
            });
        }
      }
  }

}
