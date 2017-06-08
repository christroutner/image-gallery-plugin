//Image Gallery Plugin: imageGalleryEditorView.js

//debugger;

//'use strict'; //Causes error trying to import ExampleView1 object into ConnextCMS.

//var ImageGalleryTemplate = '/'+pluginData.backboneTemplateFiles[0];
var ImageGalleryEditorTemplate;

var ImageGalleryEditorView = Backbone.View.extend({

  tagName:  'div',

  el: '', 

  //template: _.template(ExampleTemplate1),

  // The DOM events specific to an item.
  events: {

  },

  initialize: function () {
    //debugger;
    
    //Load the plugin metdata as a local variables.
    this.pluginData = this.options.pluginData;
    
    //Load a handle to the plugin constructs as a local variable.
    this.pluginHandle = this.options.pluginHandle;
    
    //Declare the view constructor name. Needed to distinguish between views and to identify the primary view.
    this.viewName = "ImageGalleryEditorView";
    
    var thisView = this; //Maitain scope inside the AJAX handler.
    
    //Get the template associated with this view.
    ImageGalleryEditorTemplate = '/'+this.pluginData.backboneTemplateFiles[1];
    var templatePath = '/plugins/'+this.pluginData.pluginDirName+ImageGalleryEditorTemplate;
    $.get(templatePath, '', function(template) {
      //debugger;
      
      //Copy the contents of the template file into this views template object.
      thisView.template = _.template(template);

    })
    .fail(function( jqxhr, error, exception ) {
      debugger;
    });
    
  },

  render: function () {
    debugger;
    
    //Hide all views.
    //global.leftMenuView.hideAll();
    
    //Render this view
    this.$el = $('#imageGalleryEditorDiv');
    this.$el.html(this.template);    
    this.$el.show();
    
    //Visually update the left menu to inidicate that this plugin view was selected.
    //this.updateLeftMenuView();
    
    //Fill in the View with any model data.
    //this.loadData();
    
    //Hide the delete button on the scaffolding template.
    //this.$el.find('#pluginScaffold').find('.delBtn').hide();
    
    return this;
  },

  


});





