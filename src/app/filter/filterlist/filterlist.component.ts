import {Component, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
import {DatePipe} from "@angular/common";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'filterlist',
  templateUrl: './filterlist.component.html',
  styleUrls: ['./filterlist.component.css'],
  animations: [
    trigger('openClose', [
      state('true', style({height: '*'})),
      state('false', style({height: '0px'})),
      transition('false <=> true', animate(500))
    ])
  ],
})

export class FilterlistComponent implements OnInit
{
  vegetables = ["Acorn squash", "Anise", "Artichoke", "Arugula", "Asparagus", "Banana squash", "Basil", "Bean sprouts", "Beet greens", "Beetroot", "Black beans", "Black-eyed peas", "Bok choy", "Borlotti bean", "Broad beans", "Broccoflower", "Broccoli", "Brussels sprouts", "Butternut squash", "Cabbage", "Calabrese", "Caraway", "Carrot", "Cauliflower", "Cayenne pepper", "Celeriac", "Celery", "Chamomile", "Chard", "Chickpeas", "Chili pepper", "Chives", "Cilantro seeds are Coriander", "Collard greens", "Corn salad", "Courgette", "Cucumber", "Daikon", "Delicata", "Dill", "Endive", "Fennel", "Fennel", "Fiddleheads", "Frisee", "Garlic", "Gem squash", "Ginger", "Green beans", "Green pepper and Red pepper", "Habanero", "Herbs and spices", "Horseradish", "Hubbard squash", "Jalapeño", "Jerusalem artichoke", "Jicama", "Kale", "Kidney beans", "Kohlrabi", "Lavender", "Leek Allium porrum", "Lemon Grass", "Lentils", "Lettuce Lactuca sativa", "Lima beans or Butter bean", "Maize", "Mangel-wurzel", "Marjoram", "Marrow", "Mung beans", "Mushrooms", "Mustard greens", "Navy beans", "Nettles", "New Zealand spinach", "Okra", "Onion", "Onion family", "Oregano", "Paprika", "Parsley", "Parsnip", "Patty pans", "Peas", "Peppers", "Pinto beans", "Potato", "Pumpkin", "Quandon", "Radicchio", "Radish", "Rhubarb", "Root vegetables", "Rosemary", "Runner beans", "Rutabaga", "Sage", "Salsify", "Shallot", "Skirret", "Soy beans", "Spaghetti squash", "Spinach", "Split peas", "Spring onion", "Squashes", "Sunchokes", "Swede", "Sweet potato", "Tabasco pepper", "Taro", "Tat soi", "Thyme", "Topinambur", "Tubers", "Turnip", "Turnip", "Turnip greens", "Wasabi", "Water chestnut", "Watercress", "White radish", "Yam"]
  searchVegetablesList: string[] = this.vegetables
  percentOfAllVegs: number = 100
  vegesCount: number = this.vegetables.length
  veggiesFound: number = 0
  fluidValue: number = this.percentOfAllVegs
  sliderValues = {
    radius: 50,
    strokewidth: 4
  }
  sliders = this.forms.group({
    'slider_radius': [50],
    'slider_stroke-width': [4]
  });
  time = Number(this.datePipe.transform((new Date), 'ms')) / 10;

  constructor(private service: DataService, private forms: FormBuilder, private datePipe: DatePipe) { }

  ngOnInit()
  {
    this.service.currentName.subscribe(vegetableName =>
      {
        const that = this
        const pattern = new RegExp("(" + vegetableName + ")", 'i') // case insensitive

        // Po otrzymaniu treści inputu czyścimy listę znalezionych warzyw
        this.searchVegetablesList = []

        // Zabawy sliderami z formularza ze sliderami
        this.sliders.valueChanges.subscribe(
          data =>
          {
            console.log(data);
            this.sliderValues.radius = data['slider_radius'];
            this.sliderValues.strokewidth = data['slider_stroke-width']
          }
        )

        // Filtrowanie warzyw: listujemy zmienną ze wszystkimi warzywami,
        // sprawdzamy czy wylistowany element pasuje do patternu regex-a (po prostu wpisana fraza szukania),
        // jeśli znalezione, to element jest dodawany do listy ze znalezionymi warzywami.
        // Sprawdzamy ile warzyw zostało znalezionych
        this.vegetables.map(function (element, index)
        {
          if (element.match(pattern))
          {
            that.searchVegetablesList.push(element)
          }
          that.veggiesFound = that.searchVegetablesList.length
        })

        // Jakim procentem z całej puli warzyw są warzywa wyfiltrowane
        this.percentOfAllVegs = (this.veggiesFound * 100) / this.vegesCount

        // Stopniowe zwiększanie/zmniejszanie zmiennej do wartości docelowej
        const interval = setInterval(() =>
        {
          // Jeśli różnica między zmienną docelową, a "stopniowanej" jest większa niż 1, to delta zmiany jest = 1
          if (Math.abs(this.percentOfAllVegs - this.fluidValue) > 1) {
            this.fluidValue = this.updateValue(this.fluidValue, this.percentOfAllVegs)
          } else { // delta zmiany jest = 0.01
            this.fluidValue = this.updateValue(this.fluidValue, this.percentOfAllVegs, 0.01)
          }
          // Jeśli różnica między zmiennymi jest < 0.01, proces jest zatrzymywany
          if (Math.abs(this.percentOfAllVegs - this.fluidValue) < 0.01)
          {
            // Jeśli wartość docelowa = 100 to zmienna "płynna" = 100
            if (this.percentOfAllVegs == 100) this.fluidValue = 100
            // Analogicznie jak wyżej ale z 0
            if (this.percentOfAllVegs == 0 ) this.fluidValue = 0
            clearInterval(interval); // zamykanie działania zwiększania/zmniejszania wartości zmiennej
          }
        }, 1);
      }
    )


  }

  // Funkcja stopniowego zwiększania/zmniejszania zmiennej do docelowej wartości
  updateValue(startVal: number, targetVal: number, delta: number = 1) {
    if (startVal > targetVal) startVal -= delta
    else startVal += delta

    if (startVal === targetVal) return startVal;
    return startVal
  }

  limit(value: number, max: number = -1, min: number = 0) {
    if (value > max) value = max
    else if (value < min) value = min
    return value;
  }

}
