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
    'click #addImage': 'addImage',
    'click #allDetails': 'showAllDetails'
  },

  initialize: function () {
    //debugger;
    
    //Load the plugin metdata as a local variables.
    this.pluginData = this.options.pluginData;
    
    //Load a handle to the plugin constructs as a local variable.
    this.pluginHandle = this.options.pluginHandle;
    
    //Declare the view constructor name. Needed to distinguish between views and to identify the primary view.
    this.viewName = "ImageGalleryEditorView";
    
    //Initialize the selectedGUID. This contains the GUID of the model that we're current working with.
    this.selectedGUID = "";
    
    
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
    //debugger;
    
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

  addImage: function() {
    debugger;
    
    //Clear the selectedGUID.
    this.selectedGUID = "";
    
    //Re-render the view.
    this.render();
    
    //Show the view.
    this.$el.find('#editorRow').show();
  },
  
  editImage: function(event) {
    debugger;
    
    //Retrieve the image thumnbnail GUID from the event data.
    var GUID = event.data[0];
    if((GUID == undefined) || (GUID == ""))
      return;
    
    var thisView = event.data[1];
    var thisModel = thisView.pluginHandle.collections[0].get(GUID);
    
    var editor = thisView.$el.find('#editorRow');
    
    editor.find('#selectedImage').attr('src', thisModel.get('urlThumbnail'));
    
    //editor.find('#allDetails').click([GUID, thisView], thisView.showAllDetails);
    thisView.selectedGUID = GUID;
    
    editor.show();
  },
  
  showAllDetails: function() {
    debugger;
    
    var alreadyRendered = false;
    
    var thisModel = this.pluginHandle.collections[0].get(this.selectedGUID);
    
    var allDetailsLink = this.$el.find('#allDetails');
    if(allDetailsLink.text() == 'Hide All Details') {
      allDetailsLink.text('View All Details');
      this.$el.find('ul').slideUp();
      
    } else {
      allDetailsLink.text('Hide All Details');

      if(!alreadyRendered) {
      
        //Height
        var tmpElem = this.$el.find('#scaffoldLi').clone();
        tmpElem.attr('id', '');
        tmpElem.text('Height: '+thisModel.get('height')+'px');
        this.$el.find('ul').append(tmpElem);

        //Width
        var tmpElem = this.$el.find('#scaffoldLi').clone();
        tmpElem.attr('id', '');
        tmpElem.text('Width: '+thisModel.get('width')+'px');
        this.$el.find('ul').append(tmpElem);

        //imgName
        var tmpElem = this.$el.find('#scaffoldLi').clone();
        tmpElem.attr('id', '');
        tmpElem.text('Image Name: '+thisModel.get('imageName'));
        this.$el.find('ul').append(tmpElem);

        //Thumbnail GUID
        var tmpElem = this.$el.find('#scaffoldLi').clone();
        tmpElem.attr('id', '');
        tmpElem.text('Thumbnail GUID: '+thisModel.get('thumbnailGUID'));
        this.$el.find('ul').append(tmpElem);

        //Thumbnail URL
        var tmpElem = this.$el.find('#scaffoldLi').clone();
        tmpElem.attr('id', '');
        tmpElem.html('<li>Thumbnail URL: <a href="'+thisModel.get('urlThumbnail')+'" target="_blank">'+thisModel.get('urlThumbnail')+'</a></li>');
        this.$el.find('ul').append(tmpElem);

        //Parent GUID
        var tmpElem = this.$el.find('#scaffoldLi').clone();
        tmpElem.attr('id', '');
        tmpElem.text('Parent GUID: '+thisModel.get('parentGUID'));
        this.$el.find('ul').append(tmpElem);

        //Parent URL
        var tmpElem = this.$el.find('#scaffoldLi').clone();
        tmpElem.attr('id', '');
        tmpElem.html('<li>Parent URL: <a href="'+thisModel.get('urlParent')+'" target="_blank">'+thisModel.get('urlParent')+'</a></li>');
        this.$el.find('ul').append(tmpElem);
        
        alreadyRendered = true;
      }


      this.$el.find('#scaffoldLi').hide();
      this.$el.find('ul').slideDown();
      
    }
  }


});





