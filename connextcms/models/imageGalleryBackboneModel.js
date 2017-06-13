//plugin-template: imageGalleryBackboneModel.js


//Create local Model to represent the Post model I'll retrieve from the server.
var ImageGalleryModel = Backbone.Model.extend({

  idAttribute: "_id",  //Map the Model 'id' to the '_id' assigned by the server.

  //When initialized this.id is undefined. This url gets fixed in the initialize() function.
  url: '',

  //Initialize is called upon the instantiation of this model. This function is executed once
  //per model retrieved from the server.
  initialize: function(attributes, options) {
    //debugger;

    //Load the plugin metdata as a local variables.
    this.pluginData = options.pluginData;
    
    //Load a handle to the plugin constructs as a local variable.
    this.pluginHandle = options.pluginHandle;
    
    this.url = '/api/imagegallery/'+this.id+'/update';
    
    this.refreshView = false;
  },

  defaults: {
    '_id': '',
    'altTag': '',
    'attributes': '',
    'height': -1,
    'width': -1,
    'imageName': '',
    'parentGUID': '',
    'thumbnailGUID': '',
    'urlThumbnail': '',
    'urlParent': '',
    'title': '',
    'content1': '',
    'content2': '',
    'content3': '',
    'content4': ''
  },

  //Override the default Backbone save() function with one that our API understands.
  save: function() {
    //debugger;

    var thisModel = this;
    
    $.post(this.url, this.attributes, function(data) {
      //Regardless of success or failure, the API returns the JSON data of the model that was just updated.
      //debugger;
      
      //If the refreshView flag is set, then refresh the Collection and then refresh the View.
      if(thisModel.refreshView) {
        
        debugger;
        //var thisPlugin = global.pluginView.getHandle('plugin-template-connextcms');
        var thisPlugin = thisModel.pluginHandle;
        //if(!thisPlugin) {
        //  console.error('Could not find plugin that matches: '+'plugin-template-connextcms');
        //  return;
        //}
        
        thisModel.refreshView = false;
        thisPlugin.collections[0].refreshView = true;
        thisPlugin.collections[0].fetch(); 
      }
      
      log.push('exampleBackboneModel.js/save() executed.');
    })
    .fail(function( jqxhr, textStatus, error ) {
      debugger;
      
      global.modalView.errorModal("Request failed because of: "+error+'. Error Message: '+jqxhr.responseText);
      console.log( "Request Failed: " + error );
      console.error('Error message: '+jqxhr.responseText);

      log.push('Error while trying imageGalleryBackboneModel.js/save(). Most likely due to communication issue with the server.');
      log.push('responseText: '+jqxhr.responseText);
      //sendLog(); //Send an error log to the admin.
      
      console.error('Communication error with server while execute imageGalleryBackboneModel.js/save()');
    });
  },
  
  //This function creates a new model on the server and updates the Backbone model with the correct ID.
  //Assumption: this function is only called by imageGalleryEditorView.js/swapPhoto().
  createNewModelOnServer: function() {
    
    var thisModel = this;
    
    $.post('/api/imagegallery/create', this.attributes, function(data) {
      debugger;
      
      var GUID = data.collection._id;
      
      //Set the ID assigned by the server.
      thisModel.set('_id', GUID);
      
      //Since this function is only called by swapPhoto(), I can assume the view and know that I need to set the selectedGUID.
      var thisView = global.pluginView.imageGalleryView.pluginHandle.viewHandles.ImageGalleryEditorView;
      thisView.selectedGUID = GUID;
      
      //Refresh the gallery view.
      global.pluginView.imageGalleryView.render();
      
      //Simulate a user click on the newly created model.
      var event = {};
      event.data = [];
      event.data[0] = GUID;
      event.data[1] = thisView;
      thisView.editImage(event);
      
    })
    .fail(function( jqxhr, textStatus, error ) {
      debugger;
      
      global.modalView.errorModal("Request failed because of: "+error+'. Error Message: '+jqxhr.responseText);
      console.log( "Request Failed: " + error );
      console.error('Error message: '+jqxhr.responseText);

      log.push('Error while trying imageGalleryBackboneModel.js/createNewModelOnServer(). Most likely due to communication issue with the server.');
      log.push('responseText: '+jqxhr.responseText);
      //sendLog(); //Send an error log to the admin.
      
      console.error('Communication error with server while execute imageGalleryBackboneModel.js/createNewModelOnServer()');
    });
  }
});

