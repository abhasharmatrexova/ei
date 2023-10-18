import { Component, Input } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';

@Component({
  selector: 'app-multiple-select-input',
  templateUrl: './multiple-select-input.component.html',
  styleUrls: ['./multiple-select-input.component.scss']
})
export class MultipleSelectInputComponent {


  @Input() trackByProp: string = ''; // Input property name for tracking

  constructor(private formBuilder: UntypedFormBuilder) { }

  trackByFn(index: number, companies: any): any {
    // Use the provided property name as the unique identifier
    return companies[this.trackByProp];
  }

  
    // In your Angular component
countriesWithCities: { name: string, cities: string }[] = [
  {
    name: 'United States',
    cities: 'New York, Los Angeles, Chicago, Houston',
  },
  {
    name: 'Canada',
    cities: 'Toronto, Vancouver, Montreal, Calgary',
  },
  {
    name: 'India',
    cities: 'Torontasdo, ss, askdh , sdsCalgary',
  },

  {
    name: 'Pakistan',
    cities: 'Toroppppnto, Vancoppuver, Moppntreal, Calgappry',
  },


  // Add more countries and cities as needed
];

options: string[] = [];




  ngOnInit(): void {
   
    this.countriesWithCities.forEach((country) => {
      this.options.push(`${country.name} - ${country.cities}`);
    });
  }

  /**
    * Default Select2
    */
  selectedAccount: any = 'This is a placeholder';
  Default = [
    { name: 'Choice 1' },
    { name: 'Choice 2' },
    { name: 'Choice 3' },
  ];

  /**
   * Option groups Select2
   */
  selectedGroup = 'Choose a city';
  Groups = [
    { name: 'Montreal', country: 'CA', child: { state: 'Active' } },
    { name: 'Toronto', country: 'CA', child: { state: 'Active' } },
    { name: 'Vancouver', country: 'CA', child: { state: 'Active' } },
    { name: 'Lyon', country: 'FR', child: { state: 'Active' } },
    { name: 'Marseille', country: 'FR', child: { state: 'Active' } },
    { name: 'Paris', country: 'FR', child: { state: 'Active' } },
    { name: 'Barcelona', country: 'SP', child: { state: 'Active' } },
    { name: 'Madrid', country: 'SP', child: { state: 'Active' } },
    { name: 'Liverpool', country: 'UK', child: { state: 'Active' } },
    { name: 'London', country: 'UK', child: { state: 'Active' } },
    { name: 'Manchester', country: 'UK', child: { state: 'Active' } },
    { name: 'Michigan', country: 'US', child: { state: 'Active' } },
    { name: 'New York', country: 'US', child: { state: 'Active' } },
    { name: 'Washington', country: 'US', child: { state: 'Inactive' } }
  ];

  //*** group dropdown search code for country and city */
  //**  */
  customSearchFn(term: string, item: any) {console.log("ss",item);
    // return item.country.toLowerCase().indexOf(term.toLowerCase()) > -1;

    const nameMatch = item.name.toLowerCase().includes(term.toLowerCase());
    const countryMatch = item.country.toLowerCase().includes(term.toLowerCase());
    return nameMatch || countryMatch;

  }
  //********** */
  
  /**
 * Option Disabled groups Select2
 */
  selectedOption = 'Label Six';
  Options = [
    { name: 'Label Five' },
    { name: 'Label Four', 'disabled': true },
    { name: 'Label One' },
    { name: 'Label Six' },
    { name: 'Label Three' },
    { name: 'Label Two', 'disabled': true },
    { name: 'Zero' }];

  /**
* Option Disabled groups Select2
*/
  searchselectedOption = 'Label Six';
  searchOptions = [
    { name: 'Label Five' },
    { name: 'Label Four', 'disabled': true },
    { name: 'Label One' },
    { name: 'Label Six' },
    { name: 'Label Three' },
    { name: 'Label Two', 'disabled': true },
    { name: 'Zero' }];

  /**
   * Multiple Default Select2
   */
  multiDefaultOption = 'Adam';

  /**
* Multiple Default Select2
*/
  selectValue = ['Alaska', 'Hawaii', 'California', 'Nevada', 'Oregon', 'Washington', 'Arizona', 'Colorado', 'Idaho', 'Montana', 'Nebraska', 'New Mexico', 'North Dakota', 'Utah', 'Wyoming', 'Alabama', 'Arkansas', 'Illinois', 'Iowa'];

  /**
  * Disabled Select2
  */
  disable = true;
  selectedPeople = [
    { name: 'josh@joshuajohnson.co.uk', disabled: true },
    { name: 'joe@bloggs.co.uk', disabled: true }
  ];
}
