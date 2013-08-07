#target InDesign-7.0
#includepath "../"
#include "indd-emitter.jsx"

// for run, $ jsx -n test.jsx

// TextFrame actions
var onFrame = {

  // when append textdata to TextFrame.contents
  whenTextInsert: function(){
    var self = this;
    self.geometricBounds = [0,0,100,100];
    self.parentStory.pointSize = "100Q";
  },

  // when change pointSize
  whenResizeFont: function(){
    var self = this;
    self.fit(FitOptions.frameToContent);
  },

  // when fit TextFrame
  whenFitFrame: function(){
    alert('done!');
  }
};

// Page actions
var onPage = {
  whenAdd: function(page,opt){
    var num = page.name;
    var tf = page.textFrames.add();
    tf = new InddEmitter(tf);
  
    tf.on('textInsert', onFrame.whenTextInsert);
    tf.on('resizeFont', onFrame.whenResizeFont);
    tf.on('fitFrame', onFrame.whenFitFrame);

    tf.contents = num;
    tf.emit('textInsert').emit('resizeFont').emit('fitFrame');
  }
};

// main //

var doc = app.documents.add();
var pages = doc.pages;

pages = new InddEmitter(pages);
pages.on('addPage', onPage.whenAdd);

var page = pages[0];
pages.emit('addPage', page, {textFrame: ['textInsert','resizeFont','fitFrame']});