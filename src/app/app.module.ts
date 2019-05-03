import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import {
  MatToolbarModule,
  MatTabsModule,
  MatTableModule,
  MatPaginatorModule,
} from "@angular/material";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TaskMISComponent } from "./mis/task/task.component";
import { UserMISComponent } from "./mis/user/user.component";
import { HeaderComponent } from "./common/header/header.component";
import { FooterComponent } from "./common/footer/footer.component";
import { ErrorComponent } from "./common/error/error.component";
import { WelcomeComponent } from "./common/welcome/welcome.component";

@NgModule({
  declarations: [
    AppComponent,
    TaskMISComponent,
    UserMISComponent,
    HeaderComponent,
    FooterComponent,
    ErrorComponent,
    WelcomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
