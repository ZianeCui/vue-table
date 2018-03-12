import table from './table';

const components = {
    table
};

const install = function(Vue) {
    for (const component in components) {
        if (components.hasOwnProperty(component)) {
            Vue.component(components[component].name, components[component]);
        }
    }
};

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

components.install = install;

module.exports = components;
