# ConnextCMS Image Gallery Plugin

This image gallery plugin is based on the [ConnextCMS Plugin Template](https://github.com/skagitpublishing/plugin-template-connextcms).
It implements a user interface for easy management of front end image galleries.

## Installation
It is assumed that this repository will be cloned into a working copy of [ConnextCMS](http://connextcms.com/). 
You can [clone your own working copy of ConnextCMS here](http://connextcms.com/page/clone-your-own) for testing purposes.

To install this example project, clone this repository into your home directory and run the `merge-plugin` script. This script assumes you are using a [ConnextCMS installation best practices](https://github.com/skagitpublishing/ConnextCMS/wiki/2.-Installation#installation-best-practice).
 

## Examples & Usage
Two live examples of the image gallery are below:

* [Pam's Past Times Antiques](http://www.pamspasttimes.com/)

* [Happy Trees](http://happytreesi90.com/)

Both sites have the following JavaScript function, which is responsible for pulling the image gallery information
from the CMS via an AJAX call, then manipulating the DOM to display the thumbnail image. Larger, parent images
are displayed in a Bootstrap Modal.

```
//This function replaces the default gallery with data retrieved from the ConnextCMS Image Gallery plugin.
function renderGallery() {
  //debugger;

  //Retrieve all the CMS data on the image gallery.
  $.get('/api/imagegallery/list', '', function(data) {
    //debugger;

    try {

      //Exit if the gallery is empty.
      if(data.collection.length == 0)
        return;

      //Copy the gallery data to a local variable.
      gallery = data.collection;

      //Clone the first image in the gallery, to use as scaffolding.
      var scaffold = $('.grid').find('figure').first();

      //Remove all the images in the default gallery.
      $('.grid').empty();

      //Loop through each image in the gallery.
      for(var i=0; i < gallery.length; i++) {
        var thisImage = gallery[i];

        //Error Handling
        if(thisImage.urlThumbnail == "")
          continue;

        //Clone the scaffolding element.
        var tmpElem = scaffold.clone();

        //Populate the element with image data
        tmpElem.find('img').attr('src', thisImage.urlThumbnail);
        tmpElem.find('img').find('h2').text(thisImage.content1);
        tmpElem.find('img').find('p').text(thisImage.content2);
        tmpElem.attr('onclick', 'openImageInModal("'+thisImage.parentGUID+'")');


        //Add the element to the DOM.
        $('.grid').append(tmpElem);

      }


    } catch(err) {
      debugger;
    }
  })
  //If sending the data to the server fails:
  .fail(function( jqxhr, textStatus, error ) {
    debugger;

    var err = textStatus + ", " + error;

    try {
        console.log( "Request Failed: " + error );
        console.error('Error message: '+jqxhr.responseText);
    } catch(err) {
      console.error('Error trying to retrieve JSON data from server response.');
    }            
  });
}
```
