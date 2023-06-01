import { NgModule } from "@angular/core";
import { VendlyLogoComponent } from "./meli-logo/vendly-logo.component";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [VendlyLogoComponent],
    exports: [VendlyLogoComponent],
    imports: [
        IonicModule,
        CommonModule,
        FormsModule
    ]
})
export class IconModule {

}