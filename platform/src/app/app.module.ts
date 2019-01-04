import { Compiler, CompilerFactory, COMPILER_OPTIONS, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JitCompilerFactory } from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExtensionsModule } from './extensions/extensions.module';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from './material.module';

export function createCompiler(fn: CompilerFactory): Compiler {
  return fn.createCompiler();
}

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [BrowserModule, ExtensionsModule.forRoot(), AppRoutingModule, BrowserAnimationsModule, MaterialModule],
  providers: [
    {
      provide: COMPILER_OPTIONS,
      useValue: {},
      multi: true,
    },
    {
      provide: CompilerFactory,
      useClass: JitCompilerFactory,
      deps: [COMPILER_OPTIONS],
    },
    {
      provide: Compiler,
      useFactory: createCompiler,
      deps: [CompilerFactory],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
