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
            //our store contain ChoiceModel objects, each has namd and value properties, we have
            //to configure value property to be the IdProperty of this store.
            //firstStore.idProperty = "value";

            var secondStore = registry.create("multipledropdownproperty.secondchoicedropdownreststore", this._getRestPath("secondchoicedropdownreststore"));
            //secondStore.idProperty = "value";
        },

        _getRestPath: function (name) {
            return routes.getRestPath({ moduleArea: "app", storeName: name });
        }
    });
});