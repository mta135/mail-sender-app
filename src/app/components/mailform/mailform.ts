import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-mailform',
  styleUrl: './mailform.css',
  templateUrl: './mailform.html',
})
export class Mailform {

  selectedFile: File | null = null;
  isUploading = false;


  onFileSelected(event: Event): void {
    debugger;
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0]; // Capture the file object
    }
  }

}
