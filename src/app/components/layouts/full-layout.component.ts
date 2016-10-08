import { Component, OnInit } from '@angular/core';
import { StashService } from '../../services/stash.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './full-layout.component.html'
})
export class FullLayoutComponent implements OnInit {

    public disabled: boolean = false;
    public status: { isopen: boolean } = { isopen: false };

    constructor(
        private stashService: StashService
    ) { }


    public toggled(open: boolean): void {

    }

    public toggleDropdown($event: MouseEvent): void {
        $event.preventDefault();
        $event.stopPropagation();
        this.status.isopen = !this.status.isopen;
    }

    ngOnInit(): void { }
}
