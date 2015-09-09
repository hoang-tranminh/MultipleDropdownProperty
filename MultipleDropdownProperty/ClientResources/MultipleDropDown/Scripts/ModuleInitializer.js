define([
// Dojo
    "dojo",
    "dojo/_base/declare",
//CMS
    "epi/_Module",
    "epi/dependency",
    "epi/routes"
], function (
// Dojo
    dojo,
    declare,
//CMS
    _Module,
    dependency,
    routes
) {

    return declare("multipledropdownproperty.scripts.moduleinitializer", [_Module], {
        // summary: Module initializer for the MultipleDropdownProperty module.

        initialize: function () {

            this.inherited(arguments);

            var registry = this.resolveDependency("epi.storeregistry");

            //Register the stores
            var firstStore = registry.create("multipledropdownproperty.firstchoicedropdownreststore", this._getRestPath("firstchoicedropdownreststore"));
            
            var secondStore = registry.create("multipledropdownproperty.secondchoicedropdownreststore", this._getRestPath("secondchoicedropdownreststore"));
        },

        _getRestPath: function (name) {
            //we use the default module area named "app" of EPiServer Shell module
            return routes.getRestPath({ moduleArea: "app", storeName: name });
        }
    });
});