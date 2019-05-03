import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { TaskMISComponent } from "./mis/task/task.component";
import { UserMISComponent } from "./mis/user/user.component";
import { ErrorComponent } from "./common/error/error.component";
import { WelcomeComponent } from "./common/welcome/welcome.component";

const routes: Routes = [
  {
    path: "",
    component: WelcomeComponent,

    pathMatch: "full",
  },
  {
    path: "task",
    component: TaskMISComponent,
  },
  {
    path: "user",
    component: UserMISComponent,
  },
  {
    path: "*",
    component: ErrorComponent,
  },
  {
    path: "**",
    component: ErrorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
