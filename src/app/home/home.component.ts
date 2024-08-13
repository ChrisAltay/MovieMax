import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class HomeComponent implements OnInit, OnDestroy {
  genres = [
    { id: 28, name: 'Action' },
    { id: 27, name: 'Horror' },
    { id: 35, name: 'Comedy' },
    { id: 10749, name: 'Romance' },
    { id: 878, name: 'Sci-Fi' },
    { id: 14, name: 'Fantasy' },
    { id: 53, name: 'Thriller' },
    { id: 16, name: 'Animation' },
    { id: 18, name: 'Drama' }
  ];

  moviesByGenre: { [key: string]: any[] } = {};
  topRatedMovies: any[] = [];
  featuredMovies: any[] = [
    { title: 'Deadpool & Wolverine', description: 'Description of Deadpool & Wolverine', imageUrl: 'assets/w&d.jpg' },
    { title: ' The Last Breath', description: 'Description of The Last Breath', imageUrl: 'assets/lastbreath.avif' },
    { title: 'Stranger Things', description: 'Description of Stranger Things', imageUrl: 'assets/stranger.webp' },
    { title: 'A Quiet Place', description: 'Description of A Quiet Place', imageUrl: 'assets/aquietplace.jpg' }
  ];
  featuredMovie: any;
  intervalId: any;

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.featuredMovie = this.featuredMovies[0];
    this.startCarousel();

    // Fetch movies for each genre
    this.genres.forEach(genre => {
      this.movieService.getMoviesByGenre(genre.id).subscribe((response: any) => {
        this.moviesByGenre[genre.name] = response.results;
      });
    });

    // Fetch top-rated movies
    this.movieService.getTopRatedMovies().subscribe((response: any) => {
      this.topRatedMovies = response.results;
    });
  }

  startCarousel() {
    let currentIndex = 0;
    this.intervalId = setInterval(() => {
      currentIndex = (currentIndex + 1) % this.featuredMovies.length;
      this.featuredMovie = this.featuredMovies[currentIndex];
    }, 7000); // Change movie every 7 seconds
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId); 
    }
  }

  scrollLeft(genre: string) {
    const element = document.getElementById(genre)?.querySelector('.movies');
    if (element) {
      const scrollAmount = element.scrollWidth / element.childElementCount; 
      element.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });

      // Loop back to the end if we're at the start
      if (element.scrollLeft <= 0) {
        element.scrollLeft = element.scrollWidth;
      }
    }
  }

  scrollRight(genre: string) {
    const element = document.getElementById(genre)?.querySelector('.movies');
    if (element) {
      const scrollAmount = element.scrollWidth / element.childElementCount; // Calculate the width of one movie
      element.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });

      // Loop back to the start if we're at the end
      if (element.scrollLeft + element.clientWidth >= element.scrollWidth) {
        element.scrollLeft = 0;
      }
    }
  }
}
