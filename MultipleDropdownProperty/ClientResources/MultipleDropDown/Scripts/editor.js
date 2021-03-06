﻿define([
"dojo/_base/declare",
"dojo/on",
"dojo/store/Memory",
"dijit/_WidgetBase",
"dijit/_TemplatedMixin",
"dijit/_WidgetsInTemplateMixin",
"dijit/form/FilteringSelect",
"epi-cms/_ContentContextMixin", 
 "epi/dependency"
], function (
    declare,
    on,
    Memory,
    _WidgetBase,
    _TemplatedMixin,
    _WidgetsInTemplateMixin,
    FilteringSelect,
    _ContentContextMixin,
    dependency
    ) {
    return declare("multipledropdownproperty.scripts.editor",
        [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, _ContentContextMixin], {
            choices1StoreName: "",
            choices1Store: null, //data store for first drop down
            choices2StoreName: "",
            choices2Store: null, //data store for second drop down
            choices1Label: "Categories", //label for first drop down
            choices2Label: "Pages", //label for second drop down
            value: null,  //required for EPiServer CMS
            templateString: "<div class=\"dijitReset dijitInputField dijitInputContainer dijitInline epi-resourceInputContainer\">" +
                                "<div><span class=\"dropdownLabel\">${choices1Label}: </span>" +
                                    "<input class=\"dropdown\" data-dojo-type=\"dijit/form/FilteringSelect\" data-dojo-attach-point=\"choices1\"/>" +
                                "</div>" +
                                "<div><span class=\"dropdownLabel\">${choices2Label}: </span>" +
                                    "<input  class=\"dropdown\" data-dojo-type=\"dijit/form/FilteringSelect\" data-dojo-attach-point=\"choices2\"/>" +
                                "</div>" +
                            "</div>",
            constructor: function (params) {
                //"params" contained all settings sent from class MultipleDropdownEditorDescriptor at server side
                //"params" will be mixed in after this constructor is call and before postMixInProperties is called
            },
            postMixInProperties: function () {
                //called after constructor and after parameters are mixed in current widget instance
                //before DOM nodes are created

                //call the base implementation
                this.inherited(arguments);

                //get setting values from server
                if (this.params.choice1StoreName) {
                    this.choices1StoreName = this.params.choice1StoreName;
                    var registry = dependency.resolve("epi.storeregistry");
                    this.choices1Store = registry.get(this.choices1StoreName);
                }
                if (this.params.choice2StoreName) {
                    this.choices2StoreName = this.params.choice2StoreName;
                    var registry = dependency.resolve("epi.storeregistry");
                    this.choices2Store = registry.get(this.choices2StoreName);
                }
            },
            postCreate: function () {
                //widgets has been render but not attached to DOM yet

                this.choices1.store = this.choices1Store;
                var widget = this;
                
                //we query all items of the store from server side (probably take some time)
                //then data bind the first dropdown,
                this.choices1.store.query().then(function () {

                    //data bind the first dropdown
                    widget.choices1.startup();
                    var currentValue = widget.value;

                    if (currentValue.choice1.id && widget.choices1) {
                        widget.choices1.set('value', currentValue.choice1.id);

                        if (currentValue.choice2.id && widget.choices2) {
                            //query data for second dropdown based on first selection, then bind this data to second dropdown
                            widget._setupStoreForSecondDropdown(currentValue.choice1.id, currentValue.choice2.id);
                        }
                    }
                });
               
                //call the base implementation
                this.inherited(arguments);
            },
            startup: function () {
                //all child widgets are created

                //call the base implementation
                this.inherited(arguments);

                //listen to change event of first drop down to 
                //fill values for second dropdown 
                var widget =this;
                on(widget.choices1, "change", function (e) {
                    widget._firstDropdownChanged(e);
                });

                
                on(widget.choices1, "focus", function (e) {
                    widget._dropdownOnFocus(this, e);
                });
                
                //listen to change event of second drop down to 
                //save selected values of dropdown 1 and 2 to "value" property of widget
                on(widget.choices2, "change", function (e) {
                    widget._secondDropdownChanged(e);
                });

                on(widget.choices2, "focus", function (e) {
                    widget._dropdownOnFocus(this, e);
                });

                //first dropdown: set first item to be selected if non is selected
                if (!this.choices1.get('value')) {
                    var dd1 = this.choices1;
                    this.choices1Store.query().forEach(function (item, i) {
                        if (i == 0) {
                            dd1.set('value', item.id);
                        }
                    });
                }
            },
            onChange: function (value) { }, //required for EPiServer CMS
            onBlur: function (e) { },      //required for EPiServer CMS
            onFocus: function (value) { }, //required for EPiServer CMS
            _onChange: function (value) {
                console.log("Notifying EPiServer with onChange: " + JSON.stringify(value));
                this.onChange(value);
                console.log("Notitying EPiServer that we're done editing.");
                this.onBlur();
            },
            _dropdownOnFocus: function (obj, e) {
                this.onFocus(e);
            },
            _firstDropdownChanged: function (e) {
                this.choices2.set('value', null);
                this._setupStoreForSecondDropdown(e);
            },
            _setupStoreForSecondDropdown: function (selectedFirstChoiceId, selectedId) {
                var data = [];
                var widget = this;
                var firstItem = null;
                var firstChoiceId = selectedFirstChoiceId;
                var sId = selectedId;

                //query data for second dropdown based on first selection, then bind this data to second dropdown
                this.choices2Store.query({ selectedFirstChoiceId: firstChoiceId, currentContentId: this._currentContext.id }).then(function (results) {
                    results.forEach(function (item, i) {
                        data.push(item);
                        if (i == 0) firstItem = item;
                    });

                    if (firstItem != null) {

                        //after querying to get items from server side, put them in a
                        //memory store to bind to second dropdown
                        var store2 = new Memory({ data: data });
                        widget.choices2.store = store2;
                        widget.choices2.startup();

                        var id = sId ? sId : firstItem.id;

                        //set first item or selected item from param to be selected!
                        if (!widget.choices2.get('value')) {
                            widget.choices2.set('value', id);
                        }
                    } else {
                        //if found no items from server for 2nd dropdown
                        widget._secondDropdownChanged();
                    }
                });
            },
            _secondDropdownChanged: function (e) {
                this._onChange(this._getValueAttr());
            },
            //custom setter for value attribute
            _setValueAttr: function (value) {
                if (value && value.choice1 && value.choice2) {
                    //call the base so that can base widget can raise observable events.
                    this._set("value", value);
                }
            },
            //custom getter for value attribute
            _getValueAttr: function () {
                var item = { choice1: { name: "", id: "" }, choice2: { name: "", id: "" } };
                if (this.choices1.get('value')) {
                    item.choice1.id = this.choices1.get('value');
                    item.choice1.name = this.choices1.get('displayedValue');
                }
                if (this.choices2.get('value')) {
                    item.choice2.id = this.choices2.get('value');
                    item.choice2.name = this.choices2.get('displayedValue');
                }
                return item;
            },
            //returns wether our module is valid or not, required for EPiServer CMS
            isValid: function () {
                if (this.choices1 && this.choices1.isValid())
                    return true;
                return false;
            }
    });

});