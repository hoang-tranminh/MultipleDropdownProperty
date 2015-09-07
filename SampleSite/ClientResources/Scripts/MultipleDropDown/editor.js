define([
"dojo/_base/declare",
"dojo/_base/xhr",
"dijit/_Widget",
"dijit/_TemplatedMixin",
 "dijit/_WidgetsInTemplateMixin",
 "dojo/store/JsonRest",
 "dojo/store/Memory",
], function (
    declare,
    xhr,
    _Widget,
    _TemplatedMixin,
    _WidgetsInTemplateMixin,
    JsonRest,
    Memory
    ) {
    return declare("multipledropdownproperty.multipledropdown.editor",
        [_Widget, _TemplatedMixin, _WidgetsInTemplateMixin], {
            constructor: function () {
                //constructor is called before parameters are mixed in
                //this.choices1Store = new JsonRest({ target: "/choices1Api" });
                //this.choices2Store = new JsonRest({ target: "/choices2Api" });
            },
            choices1Store: null,
            choices2Store:null,
            postMixInProperties: function () {
                //called after constructor and after parameters are mixed in current widget instance
                //before DOM nodes are created

                //call the base implementation
                this.inherited(arguments);

                //get setting values from server
                //from EPiServer specific params attribute
                if (this.params.apiGetChoices1) {
                    this.apiGetChoices1 = this.params.apiGetChoices1;
                    //this.choices1Store = new JsonRest({ target: this.apiGetChoices1 });
                    this.choices1Store = new Memory({data: [{name:"option 1", value:0},{name:"option 2", value:1}]});
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
                this.choices1.set('value', this.choices1Store[0]);

                //call the base implementation
                this.inherited(arguments);
            },
            templateString: "<div>" +
                                "<div><span>${choices1Label}: <span>" +
                                    "<input data-dojo-type=\"dijit/form/FilteringSelect\" data-dojo-attach-point=\"choices1\">" +
                                "</div>" +
                                "<div><span>${choices2Label}: <span>" +
                                    "<input data-dojo-type=\"dijit/form/FilteringSelect\" data-dojo-attach-point=\"choices2\">" +
                                "</div>" +
                            "</div>",
            choices1Label: "Choices 1",
            choices2Label: "Choices 2",
            value: null,
            apiGetChoices1:"http://choice1.net",
            apiGetChoices2:"http://choice2.net",
            onChange: function () { },
            _getParamsAttr: function () {
                return this._get("params");
            },
            _setParamsAttr: function (params) {
                this._set("params", params);
            }
    });

});