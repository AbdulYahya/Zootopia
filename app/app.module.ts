import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './components/app.component';
import { AnimalListComponent } from './components/animal-list.component';
import { AnimalNewComponent } from './components/animal-new.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    AnimalListComponent,
    AnimalNewComponent
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
