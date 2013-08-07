#target InDesign-7.0
#includepath "../"
#include "indd-emitter.jsx"

// for run, $ jsx -n test.jsx

var doc = app.documents.add();
var pages = doc.pages;

pages = new InddEmitter(pages);
pages.on('addPage',function(page){
  var num = page.name;
  var tf = page.textFrames.add();
  tf = new InddEmitter(tf);
  
  // when append textdata to TextFrame.contents
  tf.on('textInsert',function(){
    var self = this;
    self.geometricBounds = [0,0,100,100];
    self.parentStory.pointSize = "100Q";
  });
  
  // when change pointSize
  tf.on('resizeFont', function(){
    var self = this;
    self.fit(FitOptions.frameToContent);
  });

  // when fit TextFrame
  tf.on('fitFrame',function(){
    alert('done!');
  });

  tf.contents = num;
  tf.emit('textInsert').emit('resizeFont').emit('fitFrame');
});

var page = pages[0];
pages.emit('addPage',page);