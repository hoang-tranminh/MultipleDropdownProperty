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

    return declare("multipledropdownproperty.multipledropdown.moduleinitializer", [_Module], {
        // summary: Module initializer for the MultipleDropdownProperty module.

        initialize: function () {

            this.inherited(arguments);

            var registry = this.resolveDependency("epi.storeregistry");

            //Register the store
            registry.create("multipledropdownproperty.firstchoicedropdownreststore", this._getRestPath("firstchoicedropdownreststore"));
            registry.create("multipledropdownproperty.secondchoicedropdownreststore", this._getRestPath("secondchoicedropdownreststore"));
        },

        _getRestPath: function (name) {
            return routes.getRestPath({ moduleArea: "app", storeName: name });
        }
    });
});