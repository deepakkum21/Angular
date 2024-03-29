import { NgModule } from "@angular/core";
import {
  Routes,
  RouterModule,
  PreloadAllModules,
  UrlSerializer,
  NoPreloading,
} from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { AboutComponent } from "./about/about.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { CanLoadAuthGuard } from "./services/can-load-auth.guard";
import { CustomPreloadingStrategy } from "./services/custom-preloading.strategy";
import { ChatComponent } from "./chat/chat.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/courses",
    pathMatch: "full",
  },
  {
    path: "courses",
    loadChildren: () =>
      import("./courses/courses.module").then((m) => m.CoursesModule),
    // canLoad: [CanLoadAuthGuard]
    data: {
      preload: false,
    },
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "about",
    component: AboutComponent,
  },
  {
    path: "helpdesk-chat",
    component: ChatComponent,
    outlet: "chat",
  },
  {
    path: "**",
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: CustomPreloadingStrategy,
      enableTracing: false, // for debugging when route transition take place
      useHash: false, // for treating every route as a internal page
      scrollPositionRestoration: "enabled",
      paramsInheritanceStrategy: "always",
      relativeLinkResolution: "corrected", // helpful for "" empty route component when want to move using "./" and the parent one is "" empty route at that time "../" should be correct so it makes that changes
      malformedUriErrorHandler: (
        error: URIError,
        urlSerializer: UrlSerializer,
        url: string
      ) => urlSerializer.parse("/page-not-found"), // gets triggered when URL parsing gets into issue
    }),
  ],
  exports: [RouterModule],
  providers: [CanLoadAuthGuard, CustomPreloadingStrategy],
})
export class AppRoutingModule {}
