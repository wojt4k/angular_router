import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})

export class SearchbarComponent implements OnInit
{
  searchForm = this.forms.group({
    'searchInput': ['', Validators.required]
  });

  constructor(private service: DataService, private forms: FormBuilder) { }

  ngOnInit(): void
  {
    // Pobiera zapisany stan => string inputa
    this.searchForm.get('searchInput')?.setValue(this.service.states.searchbar.searchString.getValue() || '')

    // Aktualizacja stringa wyszukującego, zapis stringa jako stan komponentu
    this.searchForm.get("searchInput")?.valueChanges.subscribe(
      data => {
        this.service.states.searchbar.searchString.next(data)
        this.service.updateVegetableName(data)
      }
    ); // ^^^ wysyła dany obiekt z formularza jako string - .get("nazwa_pola")?

    // this.bookForm.valueChanges.subscribe(data => {console.log(data); this.service.updateVegetableName(data)})
    // ^^^ wysyła cały cały formularz jako obiekt. W serwisie trzeba wtedy zmienną, która jest obsługiwana ustawić jako obiekt z ustalonymi wcześniej parametrami
  }
}
