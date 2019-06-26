var canvas = new fabric.Canvas('c', {
    backgroundColor: 'white',
});

//CREATE TEXT
$('#create_text').click(function(){
    text = new fabric.Textbox('Type some Text', {
      // fontFamily: 'Arial',
      left: 100,
      top: 100,
      width:300,
      
      // textAlign: 'left'
  });
  canvas.add(text);
  canvas.renderAll();
  });


//UPLOAD PHOTOS
document.getElementById('upload-photo').onchange = function handleImage(e) {
  var reader = new FileReader();
  reader.onload = function(event) {
    var imgObj = new Image();
    imgObj.src = event.target.result;
    imgObj.onload = function() {
      var image = new fabric.Image(imgObj);
      image.set({
        left: 10,
        top: 10,
      }).scale(0.2);
      canvas.add(image);
    };
  };
  reader.readAsDataURL(e.target.files[0]);
};


  
// PANEL SHOW AND HIDE 
function onObjectSelected(e) {
    
    console.log(e.target.get('type'));
    if (e.target.get('type') === 'textbox'){
        document.getElementById("canvas_panel").style.display="none";
        document.getElementById("text_panel").style.display="block";
        
    }
    else if (e.target.get('type') === 'image'){
        console.log(e.target.isType) 
        document.getElementById("canvas_panel").style.display="none";
        document.getElementById("text_panel").style.display="none";
        document.getElementById("image_panel").style.display="block";
    }
    
  }
  
  canvas.on('object:selected', onObjectSelected);