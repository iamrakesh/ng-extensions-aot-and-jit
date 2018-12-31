import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { OneComponent } from './one/one.component';
import { SampleExtRoutingModule } from './sample-ext-routing.module';

@NgModule({
  declarations: [OneComponent],
  imports: [CommonModule, SampleExtRoutingModule, MatButtonModule, MatIconModule, MatTooltipModule],
  providers: [],
})
export class SampleExtModule {}
