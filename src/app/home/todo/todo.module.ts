import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TodoeditComponent } from './todoedit/todoedit.component';
import { TodoaddComponent } from './todoadd/todoadd.component';

@NgModule({
  declarations: [TodoaddComponent, TodoeditComponent],
  imports: [CommonModule, FormsModule],
  providers: [],
})
export class TodoModule {}
