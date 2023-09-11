import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Episode } from 'src/app/_interfaces/episode';
import { CharactersService } from 'src/app/_services/characters/characters.service';

@Component({
  selector: 'app-episode-details',
  templateUrl: './episode-details.component.html',
  styleUrls: ['./episode-details.component.css']
})
export class EpisodeDetailsComponent {

  charactersEspisodes: string[] = [];
  charactersIds: string[] = [];
  charactersNames: string[] = [];
  charactersNamesString: string = '';
  error: string | null = null;

  constructor(
    public dialogRef: MatDialogRef<EpisodeDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Episode,
    private charactersService: CharactersService
  ) { }

  ngOnInit(): void {
    this.loadEpisodeDetails();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  loadEpisodeDetails() {
    this.charactersEspisodes = this.data.characters;
    if (this.charactersEspisodes.length > 0) {
      this.charactersEspisodes.forEach((character, i) => {
        if (character.length > 0) {
            const episodeSplit = character.split("/");
            const characterId = episodeSplit[episodeSplit.length - 1];
            this.charactersIds.push(characterId);
        }
      });

      let consulta = this.charactersIds.join(',');
      if (this.charactersIds.length > 1) {
        this.charactersService.getMultipleCharacters(consulta).subscribe(
          (response) => {
            response.forEach((character) => {
              this.charactersNames.push(character.name);
              this.charactersNamesString = this.charactersNames.join(',');
            });
          },
          (error) => {
            this.error = error;
          });
        } else {
          this.charactersService.getSingleCharacters(consulta).subscribe(
            (response) => {
              this.charactersNamesString = response.name;
            },
            (error) => {
              this.error = error;
            });
        }
      }
  }

}
