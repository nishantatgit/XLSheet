(function(doc,window){
    
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
               grid[i][j] = new Cell().setElement().setClass(cssClass).setId(String.fromCharCode(A+j-1)+i).addAttributes({ contentEditable : "true"}).addStyle({width : CELLWIDTH, height : CELLHEIGHT});
               doc.getElementById("container1").appendChild(grid[i][j].el);   
           }
       }
    }
    
    function getCellDiv(type){
        
        var el = doc.createElement('div');
        if(type==="col-header")
            el.className = "cell-col-header";
        else if(type === "row-header")
            el.className = "cell-row-header";
        else
            el.className = "data-cell";
        return el;
        
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
    
    //calling getGrid
    getGrid();
    
})(document,window);