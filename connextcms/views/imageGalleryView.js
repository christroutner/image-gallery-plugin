//Image Gallery Plugin: imageGalleryView.js

//The image gallery plugin makes extensive use of the global.thumbnailImageCollection object. 
//This object is a Backbone Collection that stores imageUpload Models that are thumbnails only. 
//Each model contain links to the parent images in the global.imageUploadCollection object, 
//which is the main Collection that contains all the image models stored on the server. The 
//thumbnailImageCollection is defined in ConnextCMS Core imageLibraryView.js/getThumbnailImageCollection().

//debugger;

var ImageGalleryTemplate;

var ImageGalleryView = Backbone.View.extend({

  tagName:  'div',

  el: '', 

  // The DOM events specific to an item.
  events: {

  },

  initialize: function () {
    try {
      //debugger;

      //Load the plugin metdata as a local variables.
      this.pluginData = this.options.pluginData;

      //Load a handle to the plugin constructs as a local variable.
      this.pluginHandle = this.options.pluginHandle;

      //Declare the view Constructor name. Needed to distinguish between views and to identify the primary view.
      this.viewName = "ImageGalleryView";

      var thisView = this; //Maitain scope inside the AJAX handler.

      //Get the template associated with this view.
      ImageGalleryTemplate = '/'+this.pluginData.backboneTemplateFiles[0];
      var templatePath = '/plugins/'+this.pluginData.pluginDirName+ImageGalleryTemplate;
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
      var msg = 'Error while trying to update existing post in imageGalleryView.js/initialize(). Error message: ';
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

      //Hide all views.
      global.leftMenuView.hideAll();

      //Render this view
      this.$el.html(this.template);    
      this.$el.show();

      //Create a div and rende the editor.
      this.$el.prepend('<div id="imageGalleryEditorDiv"></div>');
      this.pluginHandle.viewHandles.ImageGalleryEditorView.render();

      //Visually update the left menu to inidicate that this plugin view was selected.
      this.updateLeftMenuView();

      //Fill in the View with any model data.
      this.loadData();

      //Hide the delete button on the scaffolding template.
      //this.$el.find('#pluginScaffold').find('.delBtn').hide();

      //Refresh the collection in case there has been changes.
      this.pluginHandle.collections[0].fetch();
      
      return this;
      
    
    } catch (err) {
      debugger;
      var msg = 'Error while trying to update existing post in imageGalleryView.js/render(). Error message: ';
      console.error(msg);
      console.error(err.message);

      log.push(msg);
      log.push(err.message);
      //sendLog();
      
      global.modalView.errorModal(msg);
    }
  },

  
  //This function is called by render(). It's responsible for maintinain visual consistency in the
  //left menu when the menu item for this plugin is selected.
  updateLeftMenuView: function() {
    try {
      //debugger;

      //Remove the 'active' class from the menu item, unless it's a treeview menu item.
      //(treeview) menu items will remove their active class in their click event.
      if( !global.leftMenuView.$el.find('.sidebar-menu').find('.active').hasClass('treeview') )
        global.leftMenuView.$el.find('.sidebar-menu').find('.active').removeClass('active');
      else
        global.leftMenuView.closeCollapsableLeftMenu();

      //Switch the 'active' class to the selected menu item
      $('#example1-link').addClass('active');

      //Update the location text.
      $('#app-location').text('Image Gallery');

    } catch (err) {
      debugger;
      var msg = 'Error while trying to update existing post in imageGalleryView.js/updateLeftMenuView(). Error message: ';
      console.error(msg);
      console.error(err.message);

      log.push(msg);
      log.push(err.message);
      //sendLog();
      
      global.modalView.errorModal(msg);
    }
  },
  
  //This function is called by render(). It populates the View with Model data retrieved from the Collection.
  loadData: function() {
    try {
      //debugger;

      //Handles
      var scaffoldElem = this.$el.find('#galleryScaffold');
      var thisCollection = this.pluginHandle.collections[0];

      var imgCnt = 0;

      //Clone the scaffolding element      
      var tmpElem = scaffoldElem.clone();
      tmpElem.attr('id', '');

      //Loop through all the Models in the Collection.
      //for(var i=0; i < thisCollection.models.length; i++) {
      for(var i=thisCollection.models.length-1; i > -1; i--) {

        var thisModel = thisCollection.models[i];

        //Get the thumbnail image URL.
        var thumbUrl = thisModel.get('urlThumbnail');
        if(thumbUrl == '')
          thumbUrl = "http://via.placeholder.com/300x300";

        //Populate the cloned element with information from the model
        tmpElem.find('.img'+imgCnt).attr('src', thumbUrl);

        //Add a click handler to image.
        tmpElem.find('.img'+imgCnt).click([thisModel.id, this.pluginHandle.viewHandles.ImageGalleryEditorView],this.pluginHandle.viewHandles.ImageGalleryEditorView.editImage);

        imgCnt++;
        if(imgCnt > 3) {
          imgCnt = 0;

          //Add the cloned row to the DOM.
          this.$el.append(tmpElem);

          //This check prevents a new row from being created if we're on the last image.
          if(i < thisCollection.models.length-1) {        
            //Clone a new image row
            var tmpElem = scaffoldElem.clone();
            tmpElem.attr('id', '');
          }

        }
      }

      //Add the last cloned element to the DOM.
      //this.$el.find('.form-horizontal').prepend(tmpElem);
      this.$el.append(tmpElem);

      //Hide the scaffolding element.
      scaffoldElem.hide();

    } catch (err) {
      debugger;
      var msg = 'Error while trying to update existing post in imageGalleryView.js/loadData(). Error message: ';
      console.error(msg);
      console.error(err.message);

      log.push(msg);
      log.push(err.message);
      //sendLog();
      
      global.modalView.errorModal(msg);
    }
  },
  


});





