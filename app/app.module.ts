import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './components/app.component';
import { AnimalListComponent } from './components/animal-list.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    AnimalListComponent
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
