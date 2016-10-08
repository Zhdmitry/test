import { Component, OnInit } from '@angular/core';
@Component({
    selector: 'body',
    template: `<router-outlet></router-outlet>`
})

export class AppComponent implements OnInit {
    ngOnInit() {
        console.log('AppComponent initializing...');
        this.main();
    }

    async main() {
        let pr: Promise<any> = new Promise((r, rj) => {
            r(1);
        })
        let res = await pr;
        console.log(res);

    }


}
