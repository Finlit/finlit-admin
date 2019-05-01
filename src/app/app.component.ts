import {  Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  
  ngOnInit() {
    setTimeout(() => {
      window.clearInterval(window['randomLoader'])
    }, 10000)
  }

  
}
