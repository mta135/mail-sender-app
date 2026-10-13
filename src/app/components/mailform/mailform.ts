import { Component, inject, signal } from '@angular/core';
import { FileService } from '../../core/service/file.service';

@Component({
  imports: [],
  selector: 'app-mailform',
  styleUrl: './mailform.css',
  templateUrl: './mailform.html',
})
export class Mailform {


  private fileService = inject(FileService);
  selectedFile = signal<File | null>(null);


  isUploading = false;
  loading = signal(false);
  error = signal<string | null>(null);



  onFileSelected(event: Event): void {

    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile.set(input.files?.[0] ?? null);
    }
  }


  upload() {
    const file = this.selectedFile();
    if (!file) return;



    this.fileService.UploadFile(file).subscribe({
      next: data => {

      },
      error: err => {
        this.error.set(typeof err.error === 'string' ? err.error : 'Eroare la procesarea fișierului.');
        this.loading.set(false);
      }
    });
  }

}
