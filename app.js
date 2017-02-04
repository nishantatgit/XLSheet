(function(doc,window){
    
    function getGrid(){
        
       var grid = [[]]; 
        
       var cellWidth = ( window.innerWidth - 2*30)/21;
       var cellHeight = ( window.innerHeight - 2*24)/25;
       
       for(var i = 0 ; i< 25 ; i ++){
           
           for(var j = 0 ; j< 21 ; j++){
              
               var cssClass;
               
               i === 0 ? cssClass = "cell-col-header" : cssClass = "data-cell";
               
               doc.getElementById("container1").appendChild(new Cell().setElement().setClass(cssClass).addStyle({width : cellWidth, height : cellHeight}).el);
               
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
    
    function attachEvent(id,vent,callback){
        
        doc.getElementById(id).addEventListener(vent,callback);
    }
    
    var cell = {
        
        positionX : null,
        positionY : null,
        content: null
    }
    
    function Cell(){
        
        this.el = 'div';
        this.el.className = null;
        this.content = null;
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
            
                return this.content;
        },

        addStyle : function(){
            
            var styleString = '';
            if(arguments.length === 1){
                
                var keys = Object.keys(arguments[0]);
                
                for(var i in keys){
                    
                    styleString += keys[i] + ':' + arguments[0][keys[i]] + 'px;';
                }
                this.el.setAttribute('style',styleString);
            }
            
            return this;
        }
    }
    
    //calling getGrid
    getGrid();
    
})(document,window);