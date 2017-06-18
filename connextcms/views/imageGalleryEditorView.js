//Image Gallery Plugin: imageGalleryEditorView.js

//debugger;

var ImageGalleryEditorTemplate;

var ImageGalleryEditorView = Backbone.View.extend({

  tagName:  'div',

  el: '', 

  //template: _.template(ExampleTemplate1),

  // The DOM events specific to an item.
  events: {
    'click #addImage': 'addImage',
    'click #allDetails': 'showAllDetails',
    'click #selectedImage': 'launchImageLibrary',
    'click #deleteImageBtn': 'deleteImageFromGallery',
    'change #galleryContentForm input': 'updateModelData'
  },

  initialize: function () {
    try {
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

    } catch (err) {
      debugger;
      var msg = 'Error while trying to update existing post in imageGalleryEditorView.js/initialize(). Error message: ';
      console.error(msg);
      console.error(err.message);

      log.push(msg);
      log.push(err.message);
      //sendLog();
      
      global.modalView.errorModal(msg);
    }
  },

  render: function () {
    try {
      //debugger;

      //Render this view
      this.$el = $('#imageGalleryEditorDiv');
      this.$el.html(this.template);    
      this.$el.show();

      return this;
      
    } catch (err) {
      debugger;
      var msg = 'Error while trying to update existing post in imageGalleryEditorView.js/render(). Error message: ';
      console.error(msg);
      console.error(err.message);

      log.push(msg);
      log.push(err.message);
      //sendLog();
      
      global.modalView.errorModal(msg);
    }
  },

  //This function control the behavior of the 'Add Image' button.
  addImage: function() {
    try {
      //debugger;

      //Clear the selectedGUID.
      this.selectedGUID = "";

      //Re-render the view.
      this.render();

      //Show the view.
      this.$el.find('#editorRow').show();
    
    } catch (err) {
      debugger;
      var msg = 'Error while trying to update existing post in imageGalleryEditorView.js/addImage(). Error message: ';
      console.error(msg);
      console.error(err.message);

      log.push(msg);
      log.push(err.message);
      //sendLog();
      
      global.modalView.errorModal(msg);
    }
    
  },
  
  //This function is called when a user clicks on an image in the gallery. It renders the editor and loads the
  //image data into into it.
  editImage: function(event) {
    try {
      //debugger;

      //Retrieve the image thumnbnail GUID from the event data.
      var GUID = event.data[0];
      if((GUID == undefined) || (GUID == ""))
        return;

      var thisView = event.data[1];
      var thisModel = thisView.pluginHandle.collections[0].get(GUID);

      var editor = thisView.$el.find('#editorRow');

      //Populate the editor view.
      editor.find('#selectedImage').attr('src', thisModel.get('urlThumbnail'));
      editor.find('#imgTitle').val(thisModel.get('title'));
      editor.find('#imgAlt').val(thisModel.get('altTag'));
      editor.find('#content1').val(thisModel.get('content1'));
      editor.find('#content2').val(thisModel.get('content2'));

      //Set the selected GUID.
      thisView.selectedGUID = GUID;

      //Hide the details list if it is being shown.
      thisView.showAllDetails('hide');

      //Show the editor view.
      editor.show();
    
    } catch (err) {
      debugger;
      var msg = 'Error while trying to update existing post in imageGalleryEditorView.js/editImage(). Error message: ';
      console.error(msg);
      console.error(err.message);

      log.push(msg);
      log.push(err.message);
      //sendLog();
      
      global.modalView.errorModal(msg);
    }
  },
  
  //This function shows the image details when the user clicks the 'View All Details' link.
  showAllDetails: function(cmd) {
    try {
      //debugger;

      var thisModel = this.pluginHandle.collections[0].get(this.selectedGUID);

      var allDetailsLink = this.$el.find('#allDetails');
      
      if((allDetailsLink.text() == 'Hide All Details') || (cmd == 'hide')) {
        allDetailsLink.text('View All Details');
        this.$el.find('ul').slideUp();

      } else {
        allDetailsLink.text('Hide All Details');

        //Remove all previous li elements from the list.
        this.$el.find('ul').find('li').remove();

        //Height
        var newHtml = '<li><strong>Height: </strong>'+thisModel.get('height')+'px</li>';
        this.$el.find('ul').append(newHtml);

        //Width
        var newHtml = '<li><strong>Width: </strong>'+thisModel.get('width')+'px</li>';
        this.$el.find('ul').append(newHtml);

        //imgName
        var newHtml = '<li><strong>Image Name: </strong>'+thisModel.get('imageName')+'</li>';
        this.$el.find('ul').append(newHtml);

        //Thumbnail GUID
        var newHtml = '<li><strong>Thumbnail GUID: </strong>'+thisModel.get('thumbnailGUID')+'</li>';
        this.$el.find('ul').append(newHtml);

        //Thumbnail URL
        var newHtml = '<li><strong>Thumbnail URL: </strong><a href="'+thisModel.get('urlThumbnail')+'" target="_blank">'+thisModel.get('urlThumbnail')+'</a></li>';
        this.$el.find('ul').append(newHtml);

        //Parent GUID
        var newHtml = '<li><strong>Parent GUID: </strong>'+thisModel.get('parentGUID')+'</li>';
        this.$el.find('ul').append(newHtml);

        //Parent URL
        var newHtml = '<li><strong>Parent URL: </strong><a href="'+thisModel.get('urlParent')+'" target="_blank">'+thisModel.get('urlParent')+'</a></li>';
        this.$el.find('ul').append(newHtml);

        this.$el.find('ul').slideDown();

      }
    
    } catch (err) {
      debugger;
      var msg = 'Error while trying to update existing post in imageGalleryEditorView.js/showAllDetails(). Error message: ';
      console.error(msg);
      console.error(err.message);

      log.push(msg);
      log.push(err.message);
      //sendLog();
      
      global.modalView.errorModal(msg);
    }
  },
  
  //This function is responsible for launching the Image Library modal when the 'selected photo' in the
  //editor is clicked.
  launchImageLibrary: function() {
    try {
      //debugger;

      //Launch the Image Library modal with a global reference to this View. It will call swapPhoto() on exiting.
      global.modalView.browseImageLibrary('global.pluginView.imageGalleryView.pluginHandle.viewHandles.ImageGalleryEditorView.swapPhoto');
      
    } catch (err) {
      debugger;
      var msg = 'Error while trying to update existing post in imageGalleryEditorView.js/launchImageLibrary(). Error message: ';
      console.error(msg);
      console.error(err.message);

      log.push(msg);
      log.push(err.message);
      //sendLog();
      
      global.modalView.errorModal(msg);
    }
  },
  
  //This function controls the click event on the 'selected photo', the image in the editor. It is
  //responsible for bringing up the Image Library modal and swapping out the image and image information.
  swapPhoto: function(retVal) {
    try {
      //debugger;

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
          newModel.set('altTag', retVal.selectedImage.get('alt1'));
          var parentModel = global.parentImageCollection.get(parentId);
          newModel.set('urlParent', parentModel.get('url'));
          newModel.set('title', parentModel.get('imageName'));
          newModel.set('height', parentModel.get('height'));
          newModel.set('width', parentModel.get('width'));
          newModel.set('imageName', parentModel.get('imageName'));
          //newModel.set('altTag', parentModel.get('alt1'));
          newModel.set('attributes', parentModel.get('attributes1'));

          //Register the model on the server.
          newModel.createNewModelOnServer();

          //Add the model to the collection
          thisCollection.add(newModel);
          
          //Note: Additional view manipulation takes place in imageGalleryBackboneModel.js/createNewModelOnServer()
          //after the server returns.

        } catch(err) {
          debugger;

          console.error('Error while trying to create new Image Gallery model imageGalleryEditorView.js/swapPhoto(). Error message: ');
          console.error(err.message);

          log.push('Error while trying to create new Image Gallery model imageGalleryEditorView.js/swapPhoto(). Error message: ');
          log.push(err.message);
          //sendLog();  //Send error log to admin.
      
          global.modalView.errorModal(msg);
        }

      //Replacing a previous image.
      } else {
        //debugger;
        
        //The model that already exists and needs to be removed.
        var thisModel = thisCollection.get(selectedGUID);
        
        //Swap out information
        var parentId = retVal.selectedImage.get('parent');
        thisModel.set('parentGUID', parentId);
        thisModel.set('thumbnailGUID', retVal.selectedImage.get('_id'));
        thisModel.set('urlThumbnail', retVal.selectedImage.get('url'));
        var parentModel = global.parentImageCollection.get(parentId);
        thisModel.set('urlParent', parentModel.get('url'));
        thisModel.set('title', parentModel.get('imageName'));
        thisModel.set('height', parentModel.get('height'));
        thisModel.set('width', parentModel.get('width'));
        thisModel.set('imageName', parentModel.get('imageName'));
        thisModel.set('altTag', parentModel.get('alt1'));
        thisModel.set('attributes', parentModel.get('attributes1'));
        
        //Update data on the server.
        thisModel.save();
        
        //Since this function is only called by swapPhoto(), I can assume the view and know that I need to set the selectedGUID.
        //var thisView = global.pluginView.imageGalleryView.pluginHandle.viewHandles.ImageGalleryEditorView;
        //thisView.selectedGUID = GUID;

        //Refresh the gallery view.
        global.pluginView.imageGalleryView.render();

        //Simulate a user click on the newly created model.
        var event = {};
        event.data = [];
        event.data[0] = thisView.selectedGUID;
        event.data[1] = thisView;
        thisView.editImage(event);
      }

    } catch (err) {
      debugger;
      var msg = 'Error while trying to update existing post in imageGalleryEditorView.js/swapPhoto(). Error message: ';
      console.error(msg);
      console.error(err.message);

      log.push(msg);
      log.push(err.message);
      //sendLog();
      
      global.modalView.errorModal(msg);
    }
    
  },
  
  //This function is fired when the user clicks on the delete button. The scope of this
  //function is to remove the selected image from the gallery Collection.
  deleteImageFromGallery: function() {
    try {
      //debugger;

      //Create a local copy of the collection and model.
      var thisCollection = this.pluginHandle.collections[0];
      var thisModel = thisCollection.get(this.selectedGUID);

      //Delete the model from the server.
      thisModel.deleteFromServer();

      //Remove the model from the collection.
      thisCollection.remove(this.selectedGUID);

      //Clear the selected GUID.
      this.selectedGUID = "";

      //Refresh the gallery view.
      global.pluginView.imageGalleryView.render();

    } catch (err) {
      debugger;
      var msg = 'Error while trying to update existing post in imageGalleryEditorView.js/deleteImageFromGallery(). Error message: ';
      console.error(msg);
      console.error(err.message);

      log.push(msg);
      log.push(err.message);
      //sendLog();
      
      global.modalView.errorModal(msg);
    }
  },
  
  //This function is called whenever any of the input fields are changed. The model automatically gets updated.
  updateModelData: function() {
    try {
      //debugger;

      //Exit if there is no image selected.
      if(this.selectedGUID == "")
        return;

      //Create a local copy of the collection and model.
      var thisCollection = this.pluginHandle.collections[0];
      var thisModel = thisCollection.get(this.selectedGUID);

      //Update the model with the changes.
      thisModel.set('title', this.$el.find('#imgTitle').val());
      thisModel.set('altTag', this.$el.find('#imgAlt').val());
      thisModel.set('content1', this.$el.find('#content1').val());
      thisModel.set('content2', this.$el.find('#content2').val());

      //Persist the changes to the server.
      thisModel.save();

    } catch (err) {
      debugger;
      var msg = 'Error while trying to update existing post in imageGalleryEditorView.js/updateModelData(). Error message: ';
      console.error(msg);
      console.error(err.message);

      log.push(msg);
      log.push(err.message);
      //sendLog();
      
      global.modalView.errorModal(msg);
    }
  }


});





