import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './components/app.component';
import { AnimalListComponent } from './components/animal-list.component';
import { AnimalNewComponent } from './components/animal-new.component';
import { AnimalEditComponent } from './components/animal-edit.component';

import { AgePipe } from './age.pipe';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    AnimalListComponent,
    AnimalNewComponent,
    AnimalEditComponent,
    AgePipe
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
