(function(doc,window){
    
       var onkeydown = (function (ev) {
                var key;
                var isShift;
                if (window.event) {
                key = window.event.keyCode;
                    isShift = !!window.event.shiftKey; // typecast to boolean
                } else {
                key = ev.which;
                isShift = !!ev.shiftKey;
                }
  if ( isShift ) {
    switch (key) {
      case 16: // ignore shift key
        break;
      default:
        alert(key);
        // do stuff here?
        break;
    }
  }
});
    
    
    function getGrid(){
    
       const CELLWIDTH = ( window.innerWidth - 2*30)/21 + "px";
       const CELLHEIGHT = ( window.innerHeight - 2*24)/27 + "px";
       const A = 65;
       const ROWNUM = 27;
       const COLNUM = 21;
           
       var grid = createGrid(ROWNUM); 
       
       window.grid = grid;
       
       for(var i = 0 ; i< ROWNUM ; i ++){
           for(var j = 0 ; j< COLNUM ; j++){
               var cssClass;
               i === 0 || j === 0 ? cssClass = "cell-col-header" : cssClass = "data-cell";
               grid[i][j] = new Cell().setElement().setClass(cssClass).setId(i+'-'+j).addAttributes({ contentEditable : "true"}).addStyle({width : CELLWIDTH, height : CELLHEIGHT});
               doc.getElementById("container1").appendChild(grid[i][j].el); 
               if(i===0){
                   
                   grid[i][j].addAttributes({draggable : "true"});
                   grid[i][j].el.addEventListener('dragstart',function(e){  
                      e.preventDefault();
                   });
                    grid[i][j].el.addEventListener('contextmenu',function(e){
                        e.preventDefault();
                        console.log(e);
                        console.log(doc.getElementById('cm').style);
                        doc.getElementById('cm').style.visibility = 'visible';
                        doc.getElementById('cm').style.top = e.clientY+'px';
                        doc.getElementById('cm').style.left = e.clientX+'px';
                    });
                   
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
    });
    
    document.getElementById('item2').addEventListener('click',function(e){
        document.getElementById('cm').style.visibility = 'hidden';
    })
    
    //calling getGrid
    getGrid();
    
})(document,window);