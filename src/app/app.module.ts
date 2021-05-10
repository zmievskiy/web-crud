import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDSService} from './api/in-memory-ds.service';
import {HttpClientModule} from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import {ContextMenuModule, ContextMenuService} from 'ngx-contextmenu';
import { UserInfoComponent } from './users/userInfo/userInfo.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    NavbarComponent,
    UserInfoComponent,
  ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        AppRoutingModule,
        NgbModule,
        ContextMenuModule.forRoot(),
        HttpClientModule,
        HttpClientInMemoryWebApiModule.forRoot(
            InMemoryDSService, {dataEncapsulation: false}
        ),
        FormsModule,
    ],
  providers: [
    ContextMenuService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
