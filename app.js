(function(doc,window){
    
    function getGrid(){
    
       const CELLWIDTH = ( window.innerWidth - 2*30)/21 + "px";
       const CELLHEIGHT = ( window.innerHeight - 2*24)/27 + "px";
       const ROWNUM = 27;
       const COLNUM = 21;
           
       var grid = createGrid(ROWNUM); 
       
       window.grid = grid;
       
       for(var i = 0 ; i< ROWNUM ; i ++){
           
           var row = document.createElement('div');
           row.setAttribute('id',i);
           row.className = 'row';
           row.style.display = 'table-row';
           doc.getElementById("sheet1").appendChild(row);
           
           for(var j = 0 ; j< COLNUM ; j++){
               var cssClass;
               i === 0 || j === 0 ? cssClass = "cell-col-header" : cssClass = "data-cell";
               grid[i][j] = new Cell().setElement().setClass(cssClass).setId(i+'-'+j).addAttributes({ contentEditable : "true"});
               doc.getElementById(i).appendChild(grid[i][j].el); 
               if(i===0){
                   grid[i][j].el.style.width = CELLWIDTH;
                   grid[i][j].el.style.height = CELLHEIGHT;
                   grid[i][j].addAttributes({draggable : "true"});
                   grid[i][j].el.addEventListener('dragstart',function(e){  
                      e.preventDefault();
                      var prev_dim = [];
                      var col_num = parseInt(e.target.getAttribute('id').split('-')[1]);
                      for(var idx=col_num; idx < COLNUM; idx++){
                          prev_dim[idx] = document.getElementById('0-'+idx).style.width;
                      }
                      console.log(prev_dim);
                      e.target.style.width = '200px';
                      console.log('sheet width', document.getElementById('sheet1').style.width);
                      document.getElementById('sheet1').style.width = parseInt(document.getElementById('sheet1').style.width) + 200 + 'px';
                   });
                    grid[i][j].el.addEventListener('contextmenu',function(e){
                        e.preventDefault();
                        console.log(e);
                        console.log(doc.getElementById('cm').style);
                        doc.getElementById('cm').style.visibility = 'visible';
                        doc.getElementById('cm').style.top = e.clientY+'px';
                        doc.getElementById('cm').style.left = e.clientX+'px';
                    });
                   
                   grid[i][j].el.addEventListener('dragend',function(e){
                       console.log('drag ended',e);
                   })
                   
                   grid[i][j].el.addEventListener(onkeydown,function(){
                       
                       alert('You got me!');
                   });
               }
           }
       }
    }
    
    function createGrid(row){    
        
        var arr = [];
        for(var i = 0 ; i<row; i++){
            arr.push([]);
        }
        
        //assign the dimension of sheet
        document.getElementById('sheet1').style.height = window.innerHeight+'px';
        document.getElementById('sheet1').style.width = window.innerWidth+'px';
        return arr;
    }
    
    function attachEvent(id,vent,callback){
        
        doc.getElementById(id).addEventListener(vent,callback);
    }
    
    function setHeaderColumn(){
        
        
    }
    
    function Cell(){
        
        this.el = 'div';
        this.el.className = null;
        this.el.id = null;
    }
    
    Cell.prototype = {
        setElement : function(el){
            if(el){
                    this.el = doc.createElement(el);
            }
            else{
                this.el = doc.createElement('div');
            }
            return this;
        },
        
        getElement : function(){
            return this.el;
        },
        
        setClass : function(className){
            if(className){   
                this.el.className = className;
            }
            return this;
        },
        
        getClass : function(){
            return this.className;
        },
        
        setContent : function(content){    
            if(content)
            {
                //this.content = content
                this.el.innerHTML = content;
            }
            return this;
        },
 
        getContent : function(){
                return this.el.innerHTML;
        },
        
        setId : function(id){
            if(id){
                this.el.id = id;
            }
            return this;
        },
        

        addStyle : function(){
            var styleString = '';
            if(arguments.length === 1){
                var keys = Object.keys(arguments[0]);
                for(var i in keys){
                    styleString += keys[i] + ':' + arguments[0][keys[i]] + ';';
                }
                this.el.setAttribute('style',styleString);
            }
            return this;
        },
        
        addAttributes : function(){
            if(arguments.length === 1){
                var keys = Object.keys(arguments[0]);
                for(var i in keys){
                    this.el.setAttribute(keys[i],arguments[0][keys[i]]);
                }
            }
            return this;
        }
    }
    
    document.getElementById('item1').addEventListener('click',function(e){
        document.getElementById('cm').style.visibility = 'hidden';
    },false);
    
    document.getElementById('item2').addEventListener('click',function(e){
        document.getElementById('cm').style.visibility = 'hidden';
    },false);
    
    
    var keyboardKeys = [];
    window.addEventListener("keydown", function(e){
      console.log('keyCode : ',e.keyCode);
      keyboardKeys[e.keyCode] = true;
      //Control + b
      if(keyboardKeys[17] === true){
      if (keyboardKeys[66] === true) {
          e.preventDefault(); //console.log('document.getElementById(e.target.id).style.fontWeight',document.getElementById(e.target.id).style.fontWeight);
           if(document.getElementById(e.target.id).style.fontWeight){
               
               if(document.getElementById(e.target.id).style.fontWeight != 100){
                   document.getElementById(e.target.id).style.fontWeight = 100;
               }
               else{
                    document.getElementById(e.target.id).style.fontWeight = 700;
               }
           }
           else{
                document.getElementById(e.target.id).style.fontWeight = 700;
           }
        }
      // control + u
      else if(keyboardKeys[85] === true){
          
          e.preventDefault();
          if(document.getElementById(e.target.id).style.textDecoration){
            if(document.getElementById(e.target.id).style.textDecoration == 'underline')
            {    
                document.getElementById(e.target.id).style.textDecoration = '';
            }
            else{
                document.getElementById(e.target.id).style.textDecoration =  'underline';
            }
          }
          else{
               document.getElementById(e.target.id).style.textDecoration =  'underline';
          }
      }
          
      else if(keyboardKeys[73] === true){
          
          e.preventDefault();
          if(document.getElementById(e.target.id).style.fontStyle){
            if(document.getElementById(e.target.id).style.fontStyle == 'italic')
            {    
                document.getElementById(e.target.id).style.fontStyle = 'normal';
            }
            else{
                document.getElementById(e.target.id).style.fontStyle =  'italic';
            }
          }
          else{
               document.getElementById(e.target.id).style.fontStyle =  'italic';
          }
      }
      
      
      }
    }, false);
    
    window.addEventListener("keyup", function(e){
        //console.log('onkeyup : ' + keyboardKeys);
        keyboardKeys[e.keyCode] = false;
    }, false);
    
    //calling getGrid
    getGrid();
    
})(document,window);