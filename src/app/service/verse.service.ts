import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, forkJoin, map, throwError } from "rxjs";
import { IVerse } from "../verse";

@Injectable({
    providedIn: 'root',
  }
)


export class VerseService
{
  err: any;
  constructor(private httpClient: HttpClient) {}


// API الايند بوينت التالية لجلب الاية من ال
getVerse(chapter: number, verse: number): Observable<string>
{

   return this.httpClient.get<IVerse>(`https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ara-quranindopak/${chapter}/${verse}.json`)
        .pipe(
            map(res => res.text),
            catchError(this.handleError));
}


// API الايند بوينت التالية لجلب تفسير الاية باللغة الانكليزية من ال
getArabicVerseInterpretation(chapter: number, verse: number): Observable<string>
{
  return this.httpClient.get<IVerse>(` https://cdn.jsdelivr.net/gh/spa5k/tafsir_api@main/tafsir/ar-tafsir-muyassar/${chapter}/${verse}.json`)
  .pipe(
      map(res => res.text),
      catchError(this.handleError)
  );
}



// API الايند بوينت التالية لجلب تفسير الاية باللغة الانكليزية من ال
getEnglishVerseInterpretation(chapter: number, verse: number): Observable<string>
{
      return this.httpClient.get<IVerse>(`https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/eng-abdelhaleem/${chapter}/${verse}.json`)
        .pipe(
            map(res => res.text),
            catchError(this.handleError));
}


// Method to fetch all data concurrently using forkJoin
getAllData(chapter: number, verse: number): Observable<any[]> {
  // Array of observables representing different API calls
  const observables = [
    this.getVerse(chapter, verse),
    this.getArabicVerseInterpretation(chapter, verse),
    this.getEnglishVerseInterpretation(chapter, verse)
  ];

  // Use forkJoin to make parallel API calls and wait for all responses
  return forkJoin(observables);
}


private handleError(err: HttpErrorResponse)
{
     let errorMessagae = '';

     if(err.error instanceof ErrorEvent)
     {
      errorMessagae = `Something went wrong, try again later msg: + ${err.error.message}`;
     }
     else
     {
        errorMessagae = `Server returned error code: ${err.status}, error message: ${err.message}`;
     }
     console.log(errorMessagae)
     return throwError(() => new Error('Something bad happened'));

}

}





