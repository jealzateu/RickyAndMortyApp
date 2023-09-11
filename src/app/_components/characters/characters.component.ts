import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CharactersService } from '../../_services/characters/characters.service';
import { Character, Info } from '../../_interfaces/character';
import { MatDialog } from '@angular/material/dialog';
import { CharacterDetailsComponent } from './character-details/character-details.component';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {

  characters: Character[] = [];
  selectedCharacter: Character | null = null;
  error: string | null = null;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;
  pageInfo: Info | null = null;

  constructor(
    private router: Router,
    private charactersService: CharactersService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    const savedPage = localStorage.getItem('currentPage');
    this.currentPage = savedPage ? parseInt(savedPage, 10) : 1;
    const currentPageUrl = `https://rickandmortyapi.com/api/character?page=${this.currentPage}`;
    this.loadCharacters(currentPageUrl);
  }

  loadCharacters(url: string) {
    this.charactersService.getCharacters(url).subscribe(
      (data) => {
        this.characters = data.results;
        this.totalPages = data.info.pages;
        this.pageInfo = data.info;
        localStorage.setItem('currentPage', this.currentPage.toString());
        
      },
      (error) => {
        this.error = error;
      });
  }

  showCharacterDetails(character: Character) {
    const dialogRef = this.dialog.open(CharacterDetailsComponent, {
      data: character,
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`El diálogo se cerró con resultado: ${result}`);
    });
  }

  loadPreviousPage() {
    const prevUrl = this.pageInfo?.prev;
    if (prevUrl) {
      this.currentPage--;
      localStorage.setItem('currentPage', this.currentPage.toString());
      this.loadCharacters(prevUrl);
    }
  }

  loadNextPage() {
    const nextUrl = this.pageInfo?.next;
    if (nextUrl) {
      this.currentPage++;
      localStorage.setItem('currentPage', this.currentPage.toString());
      this.loadCharacters(nextUrl);
    }
  }

  navigateToEpisodes() {
    this.router.navigate(['/episodes']);
  }

  navigateToLocations() {
    this.router.navigate(['/locations']);
  }

}
