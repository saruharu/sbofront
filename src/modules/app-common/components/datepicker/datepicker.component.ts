import { Component, OnInit, OnDestroy, ElementRef, forwardRef } from '@angular/core';

import { NativeDateAdapter, DateAdapter } from "@angular/material/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AppCommonService } from '@common/services';

export class FrenchDateAdapter extends NativeDateAdapter {
  parse(value: any): Date | null {
    if ((typeof value === 'string') && (value.indexOf('/') > -1)) {
      const str = value.split('/');
      if (str.length < 2 || isNaN(+str[0]) || isNaN(+str[1]) || isNaN(+str[2])) {
        return null;
      }
      return new Date(Number(str[2]), Number(str[1]) - 1, Number(str[0]), 12);
    }
    const timestamp = typeof value === 'number' ? value : Date.parse(value);
    return isNaN(timestamp) ? null : new Date(timestamp);
  }
}


@Component({
  selector: 'sb-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  providers: [{provide: DateAdapter, useClass: FrenchDateAdapter},
  {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatepickerComponent),
    multi: true
  }
],

})
export class DatepickerComponent implements OnInit,ControlValueAccessor, OnInit, OnDestroy {
  
  public datee : any;
  locale: string;
  
  constructor(private dateAdapter: DateAdapter<Date>, private el: ElementRef, private appcommonservice : AppCommonService) {
    this.locale = 'fr';
    this.dateAdapter.setLocale('fr');   
    
  }

  
  ngOnInit(): void {

  }


  OnDateChange($event){
    this.datee = $event.value;
    console.log("date??"+ this.datee);
    this.appcommonservice.date = this.datee;

    return this.datee;
  }


    private value: any;
  
    /**
     * Write value to the editor
     */
    public writeValue(value:any) {
      this.value = value;
    }
  
    /**
     * Register on change
     */
    public registerOnChange(fn) {
  
    }
  
    /**
     * Register on touch
     */
    public registerOnTouched(fn) {
  
    }
  
    ngOnDestroy() {
  
    }

  }