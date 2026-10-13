import { Component, inject, signal } from '@angular/core';
import { MailSenderService } from '../../core/service/mail-sender.service';

@Component({
  imports: [],
  selector: 'app-mail-sender',
  styleUrl: './mail-sender.css',
  templateUrl: './mail-sender.html',
})
export class MailSender {


  private mailSenderService = inject(MailSenderService);
  selectedFile = signal<File | null>(null);


  isUploading = false;
  loading = signal(false);
  error = signal<string | null>(null);



  onFileSelected(event: Event): void {

    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {

      this.selectedFile.set(input.files?.[0] ?? null);
      this.UploadTempalteFile();


    }
  }


  UploadTempalteFile(): void {
    const file = this.selectedFile();
    if (!file) return;

    debugger

    this.mailSenderService.UploadFile(file).subscribe({

      next: data => {

      },
      error: err => {

        this.error.set(typeof err.error === 'string' ? err.error : 'Eroare la procesarea fișierului.');
        this.loading.set(false);

      }
    });
  }

}
