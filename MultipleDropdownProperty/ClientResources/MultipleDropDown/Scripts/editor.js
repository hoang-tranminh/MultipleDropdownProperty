define([
"dojo/_base/declare",
"dojo/_base/xhr",
"dojo/on",
"dojo/store/Memory",
"dijit/_WidgetBase",
"dijit/_TemplatedMixin",
"dijit/_WidgetsInTemplateMixin",
"epi-cms/_ContentContextMixin", 
 "epi/dependency"
], function (
    declare,
    xhr,
    on,
    Memory,
    _WidgetBase,
    _TemplatedMixin,
    _WidgetsInTemplateMixin,
    _ContentContextMixin,
    dependency
    ) {
    return declare("multipledropdownproperty.scripts.editor",
        [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, _ContentContextMixin], {
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
                    //this.choices1Store = new Memory({idProperty:"value", data: [{name:"option 1", value:0},{name:"option 2", value:1}]});

                    this.choices1StoreName = this.params.choice1StoreName;
                    var registry = dependency.resolve("epi.storeregistry");
                    this.choices1Store = registry.get(this.choices1StoreName);
                }
                if (this.params.choice2StoreName) {
                    //this.apiGetChoices2 = this.params.apiGetChoices2;
                    //this.choices2Store = new JsonRest({ target: this.apiGetChoices2 });
                    //this.choices2Store = new Memory({data: [{name:"choice 1", value:0},{name:"choice 2", value:1}]});

                    this.choices2StoreName = this.params.choice2StoreName;
                    var registry = dependency.resolve("epi.storeregistry");
                    this.choices2Store = registry.get(this.choices2StoreName);
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

                //listen to change event of first drop down to 
                //fill values for second dropdown 
                var widget =this;
                on(this.choices1, "change", function (e){ widget._firstDropdownChanged(e); });

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
            onChange: function () { },
            _firstDropdownChanged: function (e) {
                var data = [];
                var firstItem = null;
                var widget = this;
                this.choices2Store.query({ selectedFirstChoiceId: e, currentContentId: this._currentContext.id }).then(function (results) {
                    results.forEach(function (item, i) {
                        data.push(item);
                        if (i == 0) firstItem = item;
                    });

                    if (firstItem != null) {
                        var store2 = new Memory({ data: data });
                        widget.choices2.store = store2;
                        widget.choices2.startup();

                        //set first item to be selected!
                        widget.choices2.set('value', firstItem.id);
                    }
                });
            },
            // Setter for value property
            _setValueAttr: function (value) {

                this._set("value", value);
            },
            //Pretty self explanatory, returns wether our module is valid or not
            // what's interesting here is that epi will call isValid on every module to make sure the page is valid
            // This is the place to do any validation of the value entered by the user, in our case there won't really be any.
            isValid: function () {

            },
            contextChanged: function (context, callerData) {
                var that = this;
            }
    });

});