import {ModuleWithProviders}  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Layouts
import { FullLayoutComponent } from './components/layouts/full-layout.component';
import { AppComponent } from './app.component';



import {
    DemoComponent,
    DemoCreateComponent,
    DemoEditComponent,
    DesignComponent,
    DesignCreateComponent,
    DesignEditComponent,
    SectionComponent,
    SectionCreateComponent,
    SectionEditComponent,
    StructureSlideComponent,
    StructureSlideCreateComponent,
    StructureSlideEditComponent,
    WorkCreateComponent,
    WorkEditComponent,
    WorksComponent
} from './admin';


const appRoutes: Routes = [
    {
        path: '',
        component: FullLayoutComponent,
        data: {
            title: 'Home'
        },
        children: [
            {
                path: 'admin',
                redirectTo: 'admin/demos',
                pathMatch: 'full'
            },
            {
                path: 'admin',
                data: {
                    title: 'admin'
                },
                children: [
                    {
                        path: 'sections',
                        children: [
                            {
                                path: '',
                                component: SectionComponent,
                                data: {
                                    api: '/sections'
                                }
                            },

                            {
                                path: 'create',
                                component: SectionCreateComponent,
                                data: {
                                    api: '/sections'
                                }
                            },
                            {
                                path: 'edit/:id',
                                component: SectionEditComponent,
                                data: {
                                    api: '/sections'
                                }
                            }
                        ]
                    },
                    {
                        path: 'works',
                        children: [
                            {
                                path: '',
                                component: WorksComponent,
                                data: {
                                    api: '/works'
                                }
                            },
                            {
                                path: 'create',
                                component: WorkCreateComponent,
                                data: {
                                    api: '/works'
                                }
                            },
                            {
                                path: 'edit/:id',
                                component: WorkEditComponent,
                                data: {
                                    api: '/works'
                                }
                            },
                        ]
                    },
                    {
                        path: 'demos',
                        children: [
                            {
                                path: '', component: DemoComponent,
                                data: {
                                    api: '/demos'
                                }
                            },

                            {
                                path: 'create',
                                component: DemoCreateComponent,
                                data: {
                                    api: '/demos'
                                }
                            },
                            {
                                path: 'edit/:id',
                                component: DemoEditComponent,
                                data: {
                                    api: '/demos'
                                }
                            }
                        ]

                    },
                    {
                        path: 'structure_slides',
                        children: [
                            {
                                path: '',
                                component: StructureSlideComponent,
                                data: {
                                    api: '/structure_slides'
                                }
                            },

                            {
                                path: 'create',
                                component: StructureSlideCreateComponent,
                                data: {
                                    api: '/structure_slides'
                                }
                            },
                            {
                                path: 'edit/:id',
                                component: StructureSlideEditComponent,
                                data: {
                                    api: '/structure_slides'
                                }
                            }
                        ]


                    },
                    {
                        path: 'design_slides',
                        children: [
                            {
                                path: '',
                                component: DesignComponent,
                                data: {
                                    api: '/design_slides'
                                }
                            },

                            {
                                path: 'create',
                                component: DesignCreateComponent,
                                data: {
                                    api: '/design_slides'
                                }
                            },
                            {
                                path: 'edit/:id',
                                component: DesignEditComponent,
                                data: {
                                    api: '/design_slides'
                                }
                            }
                        ]
                    }
                ],
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'admin/demos'
    }
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
