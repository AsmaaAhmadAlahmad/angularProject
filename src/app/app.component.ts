import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VerseService } from './service/verse.service';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { SpinnerComponent } from './shared/spinner/spinner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule, SpinnerComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  errorMessage: string = '';
  title = 'angular-homework';
  loadingForSpinner: boolean = false;
  verseResponseToView  : string | undefined;
  verseNumberToView: string | undefined;
  chapterNumberToView: string | undefined;
  arabicVerseInterpretationResponseToView: string | undefined;
  englishVerseInterpretationResponseToView: string | undefined;
  formSubmitted: boolean | undefined; // هذا المتغير من اجل التحكم فيما إذا كان سيظهر العنصر الذي
                                     // يحوي الاستجابة بداخله او سيظهر العنصر الذي يحوي رسالة
                                     // الخطا بداخله حيث قمت باستخدامه لاني عانيت من مشكلة أنه
                                     // في حال حدوث خطا وكان هناك استجابة سابقة سيظهر الخطا
                                     // بدون اختفاء الاستجابة السابقة والعكس ايضا

  // APIs حقن السيرفيس التي تتكلم مع ال
  constructor(private verseService: VerseService) { }



// APIs الدالة التالية تستدعي الدالة التي تقوم بجلب الاية وتفسيرها من ال
  // عن طريق السيرفيس
  get(form: NgForm) {
    this.chapterNumberToView = form.value.chapterNumber;
    this.verseNumberToView = form.value.verseNumber;
    this.loadingForSpinner = true;
    this.verseService.getAllData(form.value.chapterNumber, form.value.verseNumber).subscribe({
      next: (responses: any[]) => {
        this.verseResponseToView  = responses[0];
        this.arabicVerseInterpretationResponseToView = responses[1];
        this.englishVerseInterpretationResponseToView = responses[2];
        this.loadingForSpinner = false;
        this.formSubmitted = true; // تم إرسال النموذج بنجاح
      },
      error: (err) => {
        this.errorMessage = err;
        this.formSubmitted = false; // فشل إرسال النموذج
        this.loadingForSpinner = false;
      }
    });
  }



   // التي الدالة سيتم استدعائها في الفيو من اجل حلقات الفور
   counter(i: number)
   {
     return new Array(i)
   }
}

