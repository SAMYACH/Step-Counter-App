'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">true</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AppModule-ea3cda9b4090dcc2ce9f87d217277cb22d82a9d6a7aab58df06d645fcf8b0507a67d1b074cb60eb0d605d640f2131fce8629ea866e05593c24a912c96e84ca47"' : 'data-target="#xs-controllers-links-module-AppModule-ea3cda9b4090dcc2ce9f87d217277cb22d82a9d6a7aab58df06d645fcf8b0507a67d1b074cb60eb0d605d640f2131fce8629ea866e05593c24a912c96e84ca47"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-ea3cda9b4090dcc2ce9f87d217277cb22d82a9d6a7aab58df06d645fcf8b0507a67d1b074cb60eb0d605d640f2131fce8629ea866e05593c24a912c96e84ca47"' :
                                            'id="xs-controllers-links-module-AppModule-ea3cda9b4090dcc2ce9f87d217277cb22d82a9d6a7aab58df06d645fcf8b0507a67d1b074cb60eb0d605d640f2131fce8629ea866e05593c24a912c96e84ca47"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-ea3cda9b4090dcc2ce9f87d217277cb22d82a9d6a7aab58df06d645fcf8b0507a67d1b074cb60eb0d605d640f2131fce8629ea866e05593c24a912c96e84ca47"' : 'data-target="#xs-injectables-links-module-AppModule-ea3cda9b4090dcc2ce9f87d217277cb22d82a9d6a7aab58df06d645fcf8b0507a67d1b074cb60eb0d605d640f2131fce8629ea866e05593c24a912c96e84ca47"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-ea3cda9b4090dcc2ce9f87d217277cb22d82a9d6a7aab58df06d645fcf8b0507a67d1b074cb60eb0d605d640f2131fce8629ea866e05593c24a912c96e84ca47"' :
                                        'id="xs-injectables-links-module-AppModule-ea3cda9b4090dcc2ce9f87d217277cb22d82a9d6a7aab58df06d645fcf8b0507a67d1b074cb60eb0d605d640f2131fce8629ea866e05593c24a912c96e84ca47"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/categoriesModule.html" data-type="entity-link" >categoriesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-categoriesModule-c763a938c54cb58ac842e3ec0a264579c3fb4d4c058d9655e617a26cb6f2e563786f99c9dca813e8775cd5fce03e543e82a1da748dace8e43dff7201b3cabb10"' : 'data-target="#xs-controllers-links-module-categoriesModule-c763a938c54cb58ac842e3ec0a264579c3fb4d4c058d9655e617a26cb6f2e563786f99c9dca813e8775cd5fce03e543e82a1da748dace8e43dff7201b3cabb10"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-categoriesModule-c763a938c54cb58ac842e3ec0a264579c3fb4d4c058d9655e617a26cb6f2e563786f99c9dca813e8775cd5fce03e543e82a1da748dace8e43dff7201b3cabb10"' :
                                            'id="xs-controllers-links-module-categoriesModule-c763a938c54cb58ac842e3ec0a264579c3fb4d4c058d9655e617a26cb6f2e563786f99c9dca813e8775cd5fce03e543e82a1da748dace8e43dff7201b3cabb10"' }>
                                            <li class="link">
                                                <a href="controllers/CategoriesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CategoriesController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProductsModule.html" data-type="entity-link" >ProductsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ProductsModule-139004f96cb8b7fc034e4ac0c157dce1c2240e71d88124dc7450c1c00a646ed731edd5fba0beff6b61a5b5ca1588fbc1b4cfb8e2cdceb420cd6b9b2c645fd72c"' : 'data-target="#xs-controllers-links-module-ProductsModule-139004f96cb8b7fc034e4ac0c157dce1c2240e71d88124dc7450c1c00a646ed731edd5fba0beff6b61a5b5ca1588fbc1b4cfb8e2cdceb420cd6b9b2c645fd72c"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ProductsModule-139004f96cb8b7fc034e4ac0c157dce1c2240e71d88124dc7450c1c00a646ed731edd5fba0beff6b61a5b5ca1588fbc1b4cfb8e2cdceb420cd6b9b2c645fd72c"' :
                                            'id="xs-controllers-links-module-ProductsModule-139004f96cb8b7fc034e4ac0c157dce1c2240e71d88124dc7450c1c00a646ed731edd5fba0beff6b61a5b5ca1588fbc1b4cfb8e2cdceb420cd6b9b2c645fd72c"' }>
                                            <li class="link">
                                                <a href="controllers/ProductsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ProductsModule-139004f96cb8b7fc034e4ac0c157dce1c2240e71d88124dc7450c1c00a646ed731edd5fba0beff6b61a5b5ca1588fbc1b4cfb8e2cdceb420cd6b9b2c645fd72c"' : 'data-target="#xs-injectables-links-module-ProductsModule-139004f96cb8b7fc034e4ac0c157dce1c2240e71d88124dc7450c1c00a646ed731edd5fba0beff6b61a5b5ca1588fbc1b4cfb8e2cdceb420cd6b9b2c645fd72c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ProductsModule-139004f96cb8b7fc034e4ac0c157dce1c2240e71d88124dc7450c1c00a646ed731edd5fba0beff6b61a5b5ca1588fbc1b4cfb8e2cdceb420cd6b9b2c645fd72c"' :
                                        'id="xs-injectables-links-module-ProductsModule-139004f96cb8b7fc034e4ac0c157dce1c2240e71d88124dc7450c1c00a646ed731edd5fba0beff6b61a5b5ca1588fbc1b4cfb8e2cdceb420cd6b9b2c645fd72c"' }>
                                        <li class="link">
                                            <a href="injectables/ProductsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#controllers-links"' :
                                'data-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/CategoriesController.html" data-type="entity-link" >CategoriesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ProductsController.html" data-type="entity-link" >ProductsController</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#entities-links"' :
                                'data-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/Category.html" data-type="entity-link" >Category</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Product.html" data-type="entity-link" >Product</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CategoryDTO.html" data-type="entity-link" >CategoryDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/HttpExceptionFilter.html" data-type="entity-link" >HttpExceptionFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/NotNullException.html" data-type="entity-link" >NotNullException</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProductDTO.html" data-type="entity-link" >ProductDTO</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CatagoriesService.html" data-type="entity-link" >CatagoriesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProductsService.html" data-type="entity-link" >ProductsService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/ErrnoException.html" data-type="entity-link" >ErrnoException</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});