import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Info } from 'src/app/_interfaces/character';
import { Episode } from 'src/app/_interfaces/episode';
import { EpisodesService } from 'src/app/_services/episodes/episodes.service';
import { EpisodeDetailsComponent } from './episode-details/episode-details.component';

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.css']
})
export class EpisodesComponent {

  episodes: Episode[] = [];
  selectedCharacter: Episode | null = null;
  error: string | null = null;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;
  pageInfo: Info | null = null;

  constructor(
    private router: Router,
    private episodesService: EpisodesService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadEpisodes();
  }

  loadEpisodes(url?: string) {
    this.episodesService.getEpisodes(url).subscribe(
      (data) => {
        this.episodes = data.results;
        this.totalPages = data.info.pages;
        this.pageInfo = data.info;
      },
      (error) => {
        this.error = error;
      });
  }

  showEpisodeDetails(episode: Episode) {
    const dialogRef = this.dialog.open(EpisodeDetailsComponent, {
      data: episode,
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`El diálogo se cerró con resultado: ${result}`);
    });
  }

  loadPreviousPage() {
    const prevUrl = this.pageInfo?.prev;
    if (prevUrl) {
      this.currentPage--;
      this.loadEpisodes(prevUrl);
    }
  }

  loadNextPage() {
    const nextUrl = this.pageInfo?.next;
    if (nextUrl) {
      this.currentPage++;
      this.loadEpisodes(nextUrl);
    }
  }

  navigateToLocations() {
    this.router.navigate(['/locations']);
  }

  navigateToCharacters() {
    this.router.navigate(['/characters']);
  }

}
