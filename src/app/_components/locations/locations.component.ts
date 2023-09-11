import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocationsService } from '../../_services//locations/locations.service';
import { MatDialog } from '@angular/material/dialog';
import { Location, LocationSingleResponse } from 'src/app/_interfaces/location';
import { Info } from 'src/app/_interfaces/character';
import { LocationDetailsComponent } from './location-details/location-details.component';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent {

  locations: LocationSingleResponse[] = [];
  selectedCharacter: LocationSingleResponse | null = null;
  error: string | null = null;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;
  pageInfo: Info | null = null;

  constructor(
    private router: Router,
    private locationsService: LocationsService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadLocations();
  }

  loadLocations(url?: string) {
    this.locationsService.getLocations(url).subscribe(
      (data) => {
        this.locations = data.results;
        this.totalPages = data.info.pages;
        this.pageInfo = data.info;
      },
      (error) => {
        this.error = error;
      });
  }

  showLocationDetails(location: Location) {
    const dialogRef = this.dialog.open(LocationDetailsComponent, {
      data: location,
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`El diálogo se cerró con resultado: ${result}`);
    });
  }

  loadPreviousPage() {
    const prevUrl = this.pageInfo?.prev;
    if (prevUrl) {
      this.currentPage--;
      this.loadLocations(prevUrl);
    }
  }

  loadNextPage() {
    const nextUrl = this.pageInfo?.next;
    if (nextUrl) {
      this.currentPage++;
      this.loadLocations(nextUrl);
    }
  }

  navigateToEpisodes() {
    this.router.navigate(['/episodes']);
  }

  navigateToCharacters() {
    this.router.navigate(['/characters']);
  }

}
