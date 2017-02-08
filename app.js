(function(doc,window){
    
    function getGrid(r,n,h,w){
    
       
       var rownum = r || 30;
       var colnum = n || 21;
        
       var CELLWIDTH = ( window.innerWidth - colnum)/colnum + "px";
       var CELLHEIGHT = ( window.innerHeight - rownum)/rownum  + "px";
        
       doc.cellwidth = CELLWIDTH;
       doc.cellheight = CELLHEIGHT;
    
       var grid = createGrid(rownum,h,w); 
       
       doc.grid = grid;
       
       for(var i = 0 ; i< rownum ; i ++){
           
           var row = document.createElement('div');
           row.setAttribute('id',i);
           row.className = 'row';
           row.style.display = 'table-row';
           doc.getElementById("sheet1").appendChild(row);
           
           for(var j = 0 ; j< colnum ; j++){
               var cssClass;
               var contentEditable = false;
               i === 0 ? cssClass = "cell-col-header" : (j === 0 ? cssClass = "cell-row-header" : cssClass = "data-cell");
               
               //make data cells (apart from row and column headers editable)
               i === 0 || j === 0 ? contentEditable = false : contentEditable = true;
               
               //create cell element and store it in gird
               grid[i][j] = new Cell().setElement().setClass(cssClass).setId(i+'-'+j).addAttributes({ contentEditable : contentEditable});
               
               //add cell to the dom
               doc.getElementById(i).appendChild(grid[i][j].el);
               
               if(i===0){
                   grid[i][j].el.style.width = CELLWIDTH;
                   grid[i][j].el.style.height = CELLHEIGHT;
               }
           }
           grid[0][0].el.style.borderRightColor = '#989898';
       }
        
       loadSavedData();
    }
    
    function createGrid(row,h,w){    
        
        var h = h || 0;
        var w = w || 0;
        var arr = [];
        for(var i = 0 ; i<row; i++){
            arr.push([]);
        }
        
        //assign the dimension of sheet
        document.getElementById('sheet1').style.height = window.innerHeight+h+'px';
        document.getElementById('sheet1').style.width = window.innerWidth+w+'px';
        return arr;
    }
    
    //function to load the data into excel sheet from local storage
    function loadSavedData(){
        var keys = Object.keys(window.localStorage);
        for(var i = 0 ; i<keys.length; i++){
            var gIdx = keys[i].split('-').map(Number);
            document.grid[gIdx[0]][gIdx[1]].setContent(window.localStorage[keys[i]]);
        }
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
                this.el.style[keys[i]] = arguments[0][keys[i]];
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
    
     document.getElementById('item3').addEventListener('click',function(e){
        document.getElementById('cm2').style.visibility = 'hidden';
    },false);
    
    document.getElementById('item4').addEventListener('click',function(e){
        document.getElementById('cm2').style.visibility = 'hidden';
    },false);
    
    
    var keyboardKeys = [];
    
    document.getElementById('sheet1').addEventListener("keydown", function(e){
      console.log('keyCode : ',e.keyCode);
      keyboardKeys[e.keyCode] = true;
        
      //Control + b
      if(keyboardKeys[17] === true){
      if (keyboardKeys[66] === true) {
          e.preventDefault(); 
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
      
      // control + i         
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
    
    document.getElementById('sheet1').addEventListener('keyup', function(e){
        keyboardKeys[e.keyCode] = false;
    }, false);
    
    
    //saving data to local storage
    document.getElementById('sheet1').addEventListener('keyup', function(e){
        {
            var id = e.target.id;
            window.localStorage[id] = document.getElementById(id).innerHTML;
        }
    });
    
    //
    document.getElementById('sheet1').addEventListener('contextmenu', function(e){
        
        e.preventDefault();
        var idArr = e.target.id.split('-').map(Number);
        if(idArr[0]===0){
            doc.getElementById('cm').style.visibility = 'visible';
            doc.getElementById('cm').style.top = e.clientY+'px';
            doc.getElementById('cm').style.left = e.clientX+'px';    
        }
        else if(idArr[1] === 0){
             doc.getElementById('cm2').style.visibility = 'visible';
            doc.getElementById('cm2').style.top = e.clientY+'px';
            doc.getElementById('cm2').style.left = e.clientX+'px';    
        }
    },false);
    
    document.getElementById('sheet1').addEventListener('click',function(e){
        
            doc.getElementById('cm').style.visibility = 'hidden';
            doc.getElementById('cm2').style.visibility = 'hidden';
        
            //document.getElementById('cm').style.visibility = 'hidden';
            
            
    })
    
    document.getElementById('cm').addEventListener('contextmenu',function(e){
       e.preventDefault();
    },false);
    
    document.getElementById('cm2').addEventListener('contextmenu',function(e){
        e.preventDefault();
    })
    document.getElementById('cm').addEventListener('click',addNewColumn,false);
    
    function addNewColumn(e){
         e.preventDefault();
    }
    
    //calling getGrid
    getGrid();
    
    //setting row and column header
    var grid = doc.grid;
    for(var idx=0; idx < grid.length; idx++){
        
        grid[idx][0].setContent(idx);
    }
    
    var col_lebel = 65;
    for(var idx=1; idx < grid[0].length; idx++,col_lebel++){
        grid[0][idx].setContent(String.fromCharCode(col_lebel)); 
    }
    
    
    
})(document,window);