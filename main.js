var canvas = new fabric.Canvas('c');


// RIGHT HAND SIDE ITEMS

$(document).ready(function(){
  $('#text').click(function(){
    text = new fabric.Textbox('Type some Text', {
      // fontFamily: 'Arial',
      left: 100,
      top: 100,
      width:300,
      
      // textAlign: 'left'
  });
  canvas.add(text);
  canvas.renderAll();
  })
})

// REMOVE OBJECT
$(document).ready(function(){
  $('#remove').click(function(){
    var selection = canvas.getActiveObject();
    if (selection.type === 'activeSelection') {
        selection.forEachObject(function(element) {
            console.log(element);
            canvas.remove(element);
        });
    }
    else{
        canvas.remove(selection);
    }
    canvas.discardActiveObject();
    canvas.renderAll();
  })
})

//ZOOM IN/OUT
$(document).ready(function(){
  $("#zoomin").click(function() {   
    $("#c").width(
        $("#c").width() * 1.2
    );

    $("#c").height(
        $("#c").height() * 1.2
    );
});
$("#zoomout").click(function() {
  $("#c").width(
      $("#c").width() * 0.8
  );

  $("#c").height(
      $("#c").height() * 0.8
  );
});

});

//LEFT HAND SIDE ITEMS
var fontControl = $('#font-control');
    $(document.body).on('change', '#font-control', function () {
        text.fontFamily = fontControl.val();
        canvas.renderAll();
});

var alignControl = $('#font-control-alignment');
    $(document.body).on('change', '#font-control-alignment', function () {
      console.log(alignControl.val());
      text.textAlign = alignControl.val();
        canvas.renderAll();
});

//SLIDER font size
var slider = document.getElementById('slider');
var val = document.getElementById('value');
val.innerHTML= slider.value;
slider.oninput=function(){
  val.innerHTML=this.value;
  text.fontSize = this.value;
   canvas.renderAll();
  console.log(this.value);
}

// var slider1 = document.getElementById('opacity1');
// var val1 = document.getElementById('opacityValue');
// val1.innerHTML= slider1.value;
// slider1.oninput=function(){
//   val1.innerHTML=this.value;
//   text.opacity = this.value;
//    canvas.renderAll();
//   console.log(this.value);
// }

var canvasopacity=$('#opacity');
$(document.body).on('change', '#opacity', function(event){
  console.log(canvasopacity.val());
  text.opacity=canvasopacity.val();
  canvas.renderAll();

})

// var fontSizeControl = $('#font-size-control');
//     $(document.body).on('change', '#font-size-control', function () {
//       console.log(fontSizeControl.val());
//       text.fontSize = fontSizeControl.val();
//         canvas.renderAll();
// });

var canvasColor1=$('#textColor');
$(document.body).on('change', '#textColor', function(event){
  console.log(canvasColor1.val());
  text.setColor(canvasColor1.val())
  canvas.renderAll();

})



var canvasBgColor=$('#color');
$(document.body).on('change', '#color', function(event){
  console.log(event.target.value);
  canvas.backgroundColor = event.target.value;
  canvas.renderAll();

})


var canvasColor=$('#bgColor');
$(document.body).on('change', '#bgColor', function(event){
  console.log(canvasColor.val());
  text.set('backgroundColor',canvasColor.val() )
  canvas.renderAll();

})


// CLIP ART JS
//show div
 function showdiv(){
  let clipart= document.getElementById('clipArt');
  clipart.style.display = "block";
 }

 //close div
 function closeDiv(){
   let closeBtn=document.getElementById('clipArt');
   closeBtn.style.display = "none";
 }

 //ADD CLIP ART
 const list = document.querySelector('ul');
 list.addEventListener('click', selectImage);

 function selectImage(e){
   var imgsrc = e.target.currentSrc;
   console.log(imgsrc);
   fabric.Image.fromURL(e.target.currentSrc, function(myImg) {
   canvas.add(myImg);
   let div=document.getElementById('clipArt');
   div.style.display="none" 
 });

 }


 //UPLOAD CUSTOM PHOTOS
//  function showPhotoDiv(){
//    let wrapper = document.getElementById('uploadPhoto');
//    wrapper.style.display="block";
//  }

//  //close div
//  function closePhotoDiv(){
//   let closeBtn=document.getElementById('uploadPhoto');
//   closeBtn.style.display = "none";
// }


//UPLOAD PHOTOS

// document.getElementById('upload-photo').onchange = function handleImage(e) {
//   var reader = new FileReader();
//   reader.onload = function(event) {
//     var imgObj = new Image();
//     imgObj.src = event.target.result;
//     imgObj.onload = function() {
//       var image = new fabric.Image(imgObj);
//       image.set({
//         left: 10,
//         top: 10,
//       }).scale(0.2);
//       canvas.add(image);
//     };
//   };
//   reader.readAsDataURL(e.target.files[0]);
// };

//CANVAS BACKGROUND IMAGE

document.getElementById('upload-photo').addEventListener("change", function(e) {
  var file = e.target.files[0];
  var reader = new FileReader();
  reader.onload = function(f) {
     var data = f.target.result;
     fabric.Image.fromURL(data, function(img) {
        // add background image
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
           scaleX: canvas.width / img.width,
           scaleY: canvas.height / img.height
        });
     });
  };
  reader.readAsDataURL(file);
});

  //COPY OBJECT
  function duplicateObj() {
    var obj = canvas.getActiveObject();
    var clone = fabric.util.object.clone(obj);
    clone.set({left: 150,top: 150});
    canvas.add(clone); 
  }

// CLIP BACKGROUND COLOR  
var canvasColor=$('#clipbgcolor');
$(document.body).on('change', '#clipbgcolor', function(event){
  console.log(canvasColor.val());
  canvas.myImg.set("fill", canvasColor.val())
  canvas.renderAll();

})


// TEXT BOX OBJECT

var originalRender = fabric.Textbox.prototype._render;
fabric.Textbox.prototype._render = function(ctx) {
  originalRender.call(this, ctx);
  //Don't draw border if it is active(selected/ editing mode)
  if (this.active) return;
  if(this.showTextBoxBorder){
    var w = this.width,
      h = this.height,
      x = -this.width / 2,
      y = -this.height / 2;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + w, y);
      ctx.lineTo(x + w, y + h);
      ctx.lineTo(x, y + h);
      ctx.lineTo(x, y);
      ctx.closePath();
      var stroke = ctx.strokeStyle;
      ctx.strokeStyle = this.textboxBorderColor;
      ctx.stroke();
      ctx.strokeStyle = stroke;
  }
}
fabric.Textbox.prototype.cacheProperties = fabric.Textbox.prototype.cacheProperties.concat('active');
$(document).ready(function(){
  $('#textbox').click(function(){
    text = new fabric.Textbox('Input type', {
      left: 50,
      top: 50,
      width: 200,
      height: 50,
      fontSize: 20,
      fontFamily: 'Arial',
      backgroundColor: 'white',
      borderColor: 'gray',
      editingBorderColor: 'blue',
      padding: 5,
      showTextBoxBorder: true,
      textboxBorderColor: 'gray'
      
      // textAlign: 'left'
  });
  canvas.add(text);
  canvas.renderAll();
  })
})


// FONT WEIGHT
var fontweight=$('#fontWeight');
$(document.body).on('change', '#fontWeight', function(event){
  console.log(fontweight.val());
  text.fontWeight=fontweight.val();
  canvas.renderAll();

})


// FONT STYLE
var font_style=$('#fontstyle');
$(document.body).on('change', '#fontstyle', function(event){
  console.log(font_style.val());
  text.fontStyle=font_style.val();
  canvas.renderAll();

})


// CREATE BUTTON
function draw_square() {
  // Double-click event handler
var fabricDblClick = function (obj, handler) {
  return function () {
      if (obj.clicked) handler(obj);
      else {
          obj.clicked = true;
          setTimeout(function () {
              obj.clicked = false;
          }, 500);
      }
  };
};

// ungroup objects in group
var items
var ungroup = function (group) {
  items = group._objects;
  group._restoreObjectsState();
  canvas.remove(group);
  for (var i = 0; i < items.length; i++) {
      canvas.add(items[i]);
  }
  // if you have disabled render on addition
  canvas.renderAll();
};

// Re-group when text editing finishes
var dimensionText = new fabric.IText("Dimension Text", {
  fontFamily: 'Comic Sans',
  fontSize: 14,
  stroke: '#000',
  strokeWidth: 1,
  fill: "#000",
  left: 200,
  top: 67
});
dimensionText.on('editing:exited', function () {
  var items = [];
  canvas.forEachObject(function (obj) {
      items.push(obj);
      canvas.remove(obj);
  });
  var grp = new fabric.Group(items.reverse(), {});
  canvas.add(grp);
  grp.on('mousedown', fabricDblClick(grp, function (obj) {
      ungroup(grp);
      canvas.setActiveObject(dimensionText);
      dimensionText.enterEditing();
      dimensionText.selectAll();
  }));
});

function addRuler() {
   dimension_mark = new fabric.Rect({
    width: 150, 
    height: 30, 
    left: 170,
    top: 60,
    fill: 'white',
    stroke:'#777',
    strokeWidth:2,
    rx: 0,
    ry: 10,
  });
  // dimension_mark.set({
  
  // });
  var dimension_group = new fabric.Group([dimension_mark, dimensionText], {
      left: 50,
      top: 50
  });
  canvas.add(dimension_group);
  dimension_group.on('mousedown', fabricDblClick(dimension_group, function (obj) {
      ungroup(dimension_group);
      canvas.setActiveObject(dimensionText);
      dimensionText.enterEditing();
      dimensionText.selectAll();
  }));
}
addRuler();
}

// BLANK BUTTON
function draw_rect(){
  rect_mark = new fabric.Rect({
    width: 150, 
    height: 30, 
    left: 170,
    top: 60,
    fill: 'white',
    stroke:'#777',
    strokeWidth:2,
    rx: 5,
    ry: 5
  });
  canvas.add(rect_mark);
  canvas.renderAll();
}

// BUTTON BACKGROUND COLOR
// var button_Color=$('#btnColor');
// $(document.body).on('change', '#btnColor', function(event){
//   console.log(button_Color.val());
//   rect_mark.set('fill',button_Color.val() )
//   canvas.renderAll();

// })
var button_Color=$('#btnColor');
$(document.body).on('change', '#btnColor', function(event){
  console.log(button_Color.val());
  dimension_mark.set('fill',button_Color.val() )
  canvas.renderAll();

})

// BUTTON RADIUS
var btnRadius=$('#xRadius');
$(document.body).on('change', '#xRadius', function(event){
  console.log(btnRadius.val());
  dimension_mark.set('rx',btnRadius.val() )
  canvas.renderAll();

})
// var btnRadius=$('#xRadius');
// $(document.body).on('change', '#xRadius', function(event){
//   console.log(btnRadius.val());
//   rect_mark.set('rx',btnRadius.val() )
//   canvas.renderAll();

// })
var btnRadiusy=$('#yRadius');
$(document.body).on('change', '#yRadius', function(event){
  console.log(btnRadiusy.val());
  dimension_mark.set('ry',btnRadiusy.val() )
  canvas.renderAll();

})

var btnStroke=$('#btnStroke');
$(document.body).on('change', '#btnStroke', function(event){
  console.log(btnStroke.val());
  dimension_mark.set('stroke',btnStroke.val() )
  canvas.renderAll();

})

var btnStrokewidth=$('#btnStrokeWidth');
$(document.body).on('change', '#btnStrokeWidth', function(event){
  console.log(btnStrokewidth.val());
  dimension_mark.set('strokeWidth',btnStrokewidth.val() )
  // square.strokeWidth = btnStrokewidth.val();
  canvas.renderAll();

})

//HORIZENTAL LINE
$(document).ready(function(){
  $('#lines').click(function(){
    hLine = new fabric.Line([550, 100, 100, 100], {
      left: 50,
      top: 50,
      stroke: 'black',
      perPixelTargetFind: true,
      strokeWidth: 2
      
  });
  canvas.add(hLine);
  canvas.renderAll();
  })
})

var linestroke=$('#lineStroke');
$(document.body).on('change', '#lineStroke', function(event){
  console.log(linestroke.val());
  hLine.set('stroke',linestroke.val() )
  canvas.renderAll();

})

$('#saveCanvas').click(function(){
  $('#c').get(0).toBlob(function(blob){
    saveAs(blob, 'myImg.png');
  });
});

$("#addCircle").click(function(){
  canvas.add(new fabric.Circle({
radius: 20, fill: 'white', left: 100, top: 100
}));
});


//GET SELECTED OBJECT
function onObjectSelected(e) {
  console.log(e.target.get('type'));
}
canvas.on('object:selected', onObjectSelected);






// new js
// var myCanvas = new fabric.Canvas('myCanvas',
//  {
//     width: 900, 
//     height: 600
//  });
  
  



