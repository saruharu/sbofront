import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatDatepickerModule  } from '@angular/material/datepicker';

import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule,  } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AppCommonModule } from '@common/app-common.module';
@NgModule({
    declarations: [AppComponent],
    imports: [ 
        AppCommonModule, BrowserModule, AppRoutingModule, BrowserAnimationsModule,
         MatNativeDateModule, MatDatepickerModule,MatFormFieldModule, MatInputModule],
    providers: [ AppCommonModule ],
    bootstrap: [AppComponent]   
    
})


export class AppModule {}
