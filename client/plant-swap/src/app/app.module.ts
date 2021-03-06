import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { HomeComponent } from './home/home.component';
import { DataService } from './data.service';
import { AccountComponent } from './account/account.component';

const routes: Routes = [{
  path: 'swaps',
  component: ListComponent
}, {
  path: '',
  component: HomeComponent
}, {
  path: 'account',
  component: AccountComponent
}, {
	path: 'swaps/:id',
	component: DetailComponent
}]

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    DetailComponent,
    HomeComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})


export class AppModule { }
