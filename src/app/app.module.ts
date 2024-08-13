import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { HomeComponent } from './home/home.component'; 

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HomeComponent  
  ],
  providers: []
})
export class AppModule { }
