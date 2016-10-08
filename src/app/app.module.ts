import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ToastyModule } from 'ng2-toasty';
import { ReactiveFormsModule } from '@angular/forms';
import { DND_PROVIDERS, DND_DIRECTIVES } from 'ng2-dnd';
import { Ng2PaginationModule } from 'ng2-pagination';
import { ModalModule } from 'ng2-modal';
import { DatePicker } from 'ng2-datepicker/ng2-datepicker';
// import { ColorPickerService, ColorPickerDirective } from 'angular2-color-picker';



import { AppComponent } from './app.component';
import { NAV_DROPDOWN_DIRECTIVES } from './shared/nav-dropdown.directive';

import { SIDEBAR_TOGGLE_DIRECTIVES } from './shared/sidebar.directive';
import { AsideToggleDirective } from './shared/aside.directive';
import { BreadcrumbsComponent } from './shared/breadcrumb.component';
import { routing } from './app.routing';

// Layouts
import { FullLayoutComponent } from './components/layouts/full-layout.component';

// Main view
import { ApiService } from './services/api-service.service';
import { AlertService } from './services/alert-service.service';
import { ScreenshotComponent } from './components/screenshot/screenshot.component';
import { IndexPageComponent } from './components/index-page/index-page.component';

import { p404Component } from './components/pages/404.component';
import { p500Component } from './components/pages/500.component';
import { RegisterComponent } from './components/pages/register.component';


import { IndexPageSortableComponent } from './components/index-page-sortable/index-page-sortable.component';

import { StashService } from './services/stash.service';
import { InputComponent } from './components/input/input.component';

import { ToggleComponent } from './components/input/toggle.component';
import { InputFileComponent } from './components/screenshot/input-file.component';




import { SelectComponent } from './components/select/select.component';

import { LightSortableComponent } from './components/light-sortable/light-sortable.component';
import { RadioComponent } from './components/radio/input-radio.component';
import { ImageListComponent } from './components/image-list/image-list.component';

import {
  DemoComponent,
  DemoCreateComponent,
  DemoEditComponent,
  DesignComponent,
  DesignCreateComponent,
  DesignEditComponent,
  SectionComponent,
  SectionCreateComponent,
  SectionEditComponent,
  StructureSlideComponent,
  StructureSlideCreateComponent,
  StructureSlideEditComponent,
  WorkCreateComponent,
  WorkEditComponent,
  WorksComponent
} from './admin'

@NgModule({
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpModule,
    Ng2PaginationModule,
    ModalModule,
    ToastyModule.forRoot(),
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    FullLayoutComponent,
    p404Component,
    p500Component,
    RegisterComponent,
    NAV_DROPDOWN_DIRECTIVES,
    BreadcrumbsComponent,
    SIDEBAR_TOGGLE_DIRECTIVES,
    AsideToggleDirective,
    ScreenshotComponent,
    IndexPageComponent,
    IndexPageSortableComponent,
    // ColorPickerDirective,
    DND_DIRECTIVES,
    InputComponent,
    ToggleComponent,
    InputFileComponent,
    SelectComponent,
    LightSortableComponent,
    RadioComponent,
    // DatePicker,
    ImageListComponent,

    DemoComponent,
    DemoCreateComponent,
    DemoEditComponent,
    DesignComponent,
    DesignCreateComponent,
    DesignEditComponent,
    SectionComponent,
    SectionCreateComponent,
    SectionEditComponent,
    StructureSlideComponent,
    StructureSlideCreateComponent,
    StructureSlideEditComponent,
    WorkCreateComponent,
    WorkEditComponent,
    WorksComponent
  ],
  providers: [
    // ColorPickerService,
    DND_PROVIDERS,
    ApiService,
    AlertService,
    StashService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
