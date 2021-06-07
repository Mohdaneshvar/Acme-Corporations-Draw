import { NgModule } from '@angular/core';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { CheckboxModule } from 'primeng/checkbox';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import {StepsModule} from 'primeng/steps';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {AccordionModule} from 'primeng/accordion';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DialogModule } from 'primeng/dialog';
import { PanelModule } from 'primeng/panel';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { FileUploadModule } from 'primeng/fileupload';
import { ProgressBarModule } from 'primeng/progressbar';
import { ListboxModule } from 'primeng/listbox';
import { TooltipModule } from 'primeng/tooltip';
import { FieldsetModule } from 'primeng/fieldset';
import { SliderModule } from 'primeng/slider';
import { MultiSelectModule } from 'primeng/multiselect';
import { TimelineModule } from 'primeng/timeline';
import {CardModule} from 'primeng/card';

@NgModule({
  exports: [
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    InputTextareaModule,
    InputMaskModule,
    DropdownModule,
    AutoCompleteModule,
    CheckboxModule,
    RadioButtonModule,
    InputSwitchModule,
    TableModule,
    ChartModule,
    TabViewModule,
    ToastModule,
    ContextMenuModule,
    OverlayPanelModule,
    StepsModule,
    ConfirmDialogModule,
    PanelModule,
    AccordionModule,
    MessagesModule,
    MessageModule,
    FileUploadModule,
    ProgressBarModule,
    FieldsetModule,
    TooltipModule,
    DialogModule,
    ListboxModule,
    ConfirmPopupModule,
    SliderModule,
    MultiSelectModule,
    TimelineModule,
    CardModule
  ]
})
export class PrimeNgModule { }
