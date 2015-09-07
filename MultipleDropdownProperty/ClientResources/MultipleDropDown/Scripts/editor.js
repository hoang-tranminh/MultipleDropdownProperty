define([
"dojo/_base/declare",
"dojo/_base/xhr",
"dijit/_WidgetBase",
"dijit/_TemplatedMixin",
 "dijit/_WidgetsInTemplateMixin",
 "dojo/store/JsonRest",
 "dojo/store/Memory",
 "epi/dependency"
], function (
    declare,
    xhr,
    _WidgetBase,
    _TemplatedMixin,
    _WidgetsInTemplateMixin,
    JsonRest,
    Memory,
    dependency
    ) {
    return declare("multipledropdownproperty.scripts.editor",
        [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
            constructor: function (params) {
                //"params" contained all settings sent from class MultipleDropdownEditorDescriptor at server side
                //"params" will be mixed in after this constructor is call and before postMixInProperties is called
            },
            choices1StoreName: "",
            choices1Store: null, //data store for first drop down
            choices2StoreName: "",
            choices2Store: null, //data store for second drop down
            choices1Label: "Choices 1", //label for first drop down
            choices2Label: "Choices 2", //label for second drop down
            value: null,
            templateString: "<div>" +
                                "<div><span>${choices1Label}: <span>" +
                                    "<input data-dojo-type=\"dijit/form/FilteringSelect\" data-dojo-attach-point=\"choices1\">" +
                                "</div>" +
                                "<div><span>${choices2Label}: <span>" +
                                    "<input data-dojo-type=\"dijit/form/FilteringSelect\" data-dojo-attach-point=\"choices2\">" +
                                "</div>" +
                            "</div>",
            postMixInProperties: function () {
                //called after constructor and after parameters are mixed in current widget instance
                //before DOM nodes are created

                //call the base implementation
                this.inherited(arguments);

                //get setting values from server
                //from EPiServer specific params attribute
                if (this.params.choice1StoreName) {
                    //this.apiGetChoices1 = this.params.apiGetChoices1;
                    //this.choices1Store = new JsonRest({ target: this.apiGetChoices1 });
                    //this.choices1Store = new Memory({data: [{name:"option 1", value:0},{name:"option 2", value:1}]});

                    this.choices1StoreName = this.params.choice1StoreName;
                    var registry = dependency.resolve("epi.storeregistry");
                    this.choices1Store = registry.get(this.choices1StoreName);
                }
                if (this.params.apiGetChoices2) {
                    this.apiGetChoices2 = this.params.apiGetChoices2;
                    //this.choices2Store = new JsonRest({ target: this.apiGetChoices2 });
                    this.choices2Store = new Memory({data: [{name:"choice 1", value:0},{name:"choice 2", value:1}]});
                }
            },
            postCreate: function () {
                //widgets has been render but not subwidgets, not attached to DOM yet

                //call the base implementation
                this.inherited(arguments);
            },
            startup: function () {
                //all child widgets are created

                this.choices1.store = this.choices1Store;
                this.choices1.startup();

                //set first item to be selected!
                var dd1 = this.choices1;
                this.choices1Store.query().forEach(function (item, i) {
                    if (i == 0) {
                        dd1.set('value', item.id);
                    }
                });


                //call the base implementation
                this.inherited(arguments);
            },
            onChange: function () { }
           
    });

});