import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, map, Observable, of, tap} from 'rxjs';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Meme} from "../models/meme";
import {Book} from "../models/book";

@Injectable({providedIn: 'root'})
export class DataService
{
  private vegetableInputSource = new BehaviorSubject('') // '' <= default message
  currentName = this.vegetableInputSource.asObservable()
  protected httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  states = {
    apiretriever: {
      meme: new BehaviorSubject<any>(null)
    },
    searchbar: {
      searchString: new BehaviorSubject<string>('')
    },
    books: new BehaviorSubject<Book[]>([])
  }

  private serviceUrl = 'https://zadru.eu/RestClient/index.php'
  private headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})

  constructor(protected http: HttpClient)
  {
  }

  updateVegetableName(vegetableName: string)
  {
    this.vegetableInputSource.next(vegetableName)
  }


  getItem(): Observable<Meme>
  {
    const params = new FormData();
    // params.append('search-data');

    return this.http.get<Meme>(this.serviceUrl)
  }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>('https://zadru.eu/files/books.php')
  }

  // addContact(contact: Contact): Observable<any> {
  //   return this.http.post<Response>(this.serviceUrl + 'createcontact', contact, {headers: this.headers, responseType: 'json'}).pipe(
  //     map((data: Response) => {
  //       // console.log(data)
  //       // return data
  //     }),
  //     tap(_ => this.log('add organization 200')),
  //     catchError(this.handleError<any>('shake', {}))
  //   )
  // }

  protected handleError<T>(operation = 'operation', result?: T): any
  {
    return (error: any): Observable<T> =>
    {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService contacts with the MessageService */
  protected log(message: string): void
  {
    console.log(message);
  }

}
