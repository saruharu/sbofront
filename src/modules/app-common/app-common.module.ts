/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/* Third Party */
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IconsModule } from '@modules/icons/icons.module';

const thirdParty = [IconsModule, NgbModule];

/* Containers */
import * as appCommonContainers from './containers';

/* Components */
import * as appCommonComponents from './components';

/* Guards */
import * as appCommonGuards from './guards';

/* Services */
import * as appCommonServices from './services';
import * as authServices from '@modules/auth/services';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule,  } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule  } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [FormsModule,MatNativeDateModule, MatDatepickerModule,MatFormFieldModule, MatInputModule, CommonModule, RouterModule, ...thirdParty],
    providers: [...appCommonServices.services, ...authServices.services, ...appCommonGuards.guards],
    declarations: [...appCommonContainers.containers, ...appCommonComponents.components, DatepickerComponent],
    exports: [...appCommonContainers.containers, ...appCommonComponents.components, ...thirdParty],
})
export class AppCommonModule {}
