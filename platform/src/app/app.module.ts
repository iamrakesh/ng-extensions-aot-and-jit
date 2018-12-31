import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExtensionsModule } from './extensions/extensions.module';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [BrowserModule, ExtensionsModule.forRoot(), AppRoutingModule, BrowserAnimationsModule, MaterialModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
