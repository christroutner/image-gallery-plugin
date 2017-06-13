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
    'click #allDetails': 'showAllDetails',
    'click #selectedImage': 'launchImageLibrary'
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

  //This function control the behavior of the 'Add Image' button.
  addImage: function() {
    debugger;
    
    //Clear the selectedGUID.
    this.selectedGUID = "";
    
    //Re-render the view.
    this.render();
    
    //Show the view.
    this.$el.find('#editorRow').show();
    
    
  },
  
  //This function is called when a user clicks on an image in the gallery. It renders the editor and loads the
  //image data into into it.
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
  
  //This function shows the image details when the user clicks the 'View All Details' link.
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
  },
  
  //This function is responsible for launching the Image Library modal when the 'selected photo' in the
  //editor is clicked.
  launchImageLibrary: function() {
    debugger;
    
    //Launch the Image Library modal with a global reference to this View. It will call swapPhoto() on exiting.
    global.modalView.browseImageLibrary('global.pluginView.imageGalleryView.pluginHandle.viewHandles.ImageGalleryEditorView.swapPhoto');
  },
  
  //This function controls the click event on the 'selected photo', the image in the editor. It is
  //responsible for bringing up the Image Library modal and swapping out the image and image information.
  swapPhoto: function(retVal) {
    debugger;
    
    var thisView = global.pluginView.imageGalleryView.pluginHandle.viewHandles.ImageGalleryEditorView;
    var thisCollection = thisView.pluginHandle.collections[0];
    
    var selectedGUID = thisView.selectedGUID;
    
    //Adding a new image to the Image Gallery
    if(selectedGUID == "") {
      
      try {
        //Create a new Gallery Backbone model.
        var newModel = new ImageGalleryModel(null, {pluginData: thisView.pluginData, pluginHandle: thisView.pluginHandle});

        //Retrieve the new model data from the selected thumbnail model and parent image model.
        var parentId = retVal.selectedImage.get('parent');
        newModel.set('parentGUID', parentId);
        newModel.set('thumbnailGUID', retVal.selectedImage.get('_id'));
        newModel.set('urlThumbnail', retVal.selectedImage.get('url'));
        var parentModel = global.parentImageCollection.get(parentId);
        newModel.set('urlParent', parentModel.get('url'));
        newModel.set('title', parentModel.get('imageName'));
        newModel.set('height', parentModel.get('height'));
        newModel.set('width', parentModel.get('width'));
        newModel.set('imageName', parentModel.get('imageName'));
        newModel.set('altTag', parentModel.get('alt1'));
        newModel.set('attributes', parentModel.get('attributes1'));

        //Register the model on the server.
        newModel.createNewModelOnServer();

        //Add the model to the collection
        thisCollection.add(newModel);
        
        //-->Start sub-function
        //var editor = thisView.$el.find('#editorRow');
    
        //editor.find('#selectedImage').attr('src', newModel.get('urlThumbnail'));

        //editor.find('#allDetails').click([GUID, thisView], thisView.showAllDetails);
        //thisView.selectedGUID = GUID;

        //editor.show();
        //-->End sub-function
        
        
        
      } catch(err) {
        debugger;
        
        console.error('Error while trying to create new Image Gallery model imageGalleryEditorView.js/swapPhoto(). Error message: ');
        console.error(err.message);

        log.push('Error while trying to create new Image Gallery model imageGalleryEditorView.js/swapPhoto(). Error message: ');
        log.push(err.message);
        //sendLog();  //Send error log to admin.
      }
      
    //Replacing a previous image.
    } else {
      debugger;
    }
    
  }


});





