(function(doc,window){
    
    XLsheet = {};
    
    function createGrid(){
    
       var rownum = parseInt(window.localStorage.rownum) || 30;
       var colnum = parseInt(window.localStorage.colnum) || 21;
       //assign the dimension of sheet
       if(colnum === 21){
            document.getElementById('sheet1').style.width = window.innerWidth+'px';
       }else{
            document.getElementById('sheet1').style.width = window.innerWidth + (64*(colnum-21)) + 'px';
       }
        document.getElementById('sheet1').style.height = window.innerHeight+'px';
           
       var cellwidth = ( parseInt(document.getElementById('sheet1').style.width) - colnum)/colnum + "px";
       var cellheight = ( window.innerHeight - rownum)/rownum  + "px";
        
       XLsheet.rownum = rownum;
       XLsheet.colnum = colnum;
       XLsheet.cellwidth = cellwidth;
       XLsheet.cellheight = cellheight;
    
       var grid = getGrid(rownum); 
       
       XLsheet.grid = grid;
       
       for(var i = 0 ; i< rownum ; i ++){
           
           var row = document.createElement('div');
           row.setAttribute('id',i);
           row.className = 'row';
           row.style.display = 'table-row';
           document.getElementById("sheet1").appendChild(row);
           
           for(var j = 0 ; j< colnum ; j++){
               var cssClass;
               var contentEditable = false;
               i === 0 ? cssClass = "cell-col-header" : (j === 0 ? cssClass = "cell-row-header" : cssClass = "data-cell");
               
               //make data cells (apart from row and column headers editable)
               i === 0 || j === 0 ? contentEditable = false : contentEditable = true;
               
               //create cell element and store it in gird
               grid[i][j] = new Cell().setElement().setClass(cssClass).setId(i+'-'+j).addAttributes({ contentEditable : contentEditable});
               
               //add cell to the dom
               document.getElementById(i).appendChild(grid[i][j].el);
               
               if(i===0){
                   grid[i][j].el.style.width = cellwidth;
                   grid[i][j].el.style.height = cellheight;
               }
           }
           grid[0][0].el.style.borderRightColor = '#989898';
       }
        
       loadSavedData();
    }
    
    function getGrid(row,h,w){    
        
        var h = h || 0;
        var w = w || 0;
        var arr = [];
        for(var i = 0 ; i<row; i++){
            arr.push([]);
        }
        
       
        return arr;
    }
    
    //function to load the data into excel sheet from local storage
    function loadSavedData(){
        var keys = Object.keys(window.localStorage);
        for(var i = 0 ; i<keys.length; i++){
            var gIdx = keys[i].split('-').map(Number);
            if(gIdx.length===2)
                if(XLsheet.grid[gIdx[0]])
                    if(XLsheet.grid[gIdx[0]][gIdx[1]])
                        XLsheet.grid[gIdx[0]][gIdx[1]].setContent(window.localStorage[keys[i]]);
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
                    this.el = document.createElement(el);
            }
            else{
                this.el = document.createElement('div');
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
        
        getId : function(id){
            return this.el.id;
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
    
    var keyboardKeys = [];
    
    
    //keyboard shortcuts for underline , italic and bold
    document.getElementById('sheet1').addEventListener("keydown", function(e){
      keyboardKeys[e.keyCode] = true;
        
      //control + b
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
    
    var clickLocation;
    
    document.getElementById('sheet1').addEventListener('contextmenu', function(e){
        
        e.preventDefault();
        var idArr = e.target.id.split('-').map(Number);
        if(idArr[0]===0){
            document.getElementById('cm').style.visibility = 'visible';
            document.getElementById('cm').style.top = e.clientY+'px';
            document.getElementById('cm').style.left = e.clientX+'px';
            clickLocation = e.target.id; 
        }
        else if(idArr[1] === 0){
             document.getElementById('cm2').style.visibility = 'visible';
            document.getElementById('cm2').style.top = e.clientY+'px';
            document.getElementById('cm2').style.left = e.clientX+'px';
            clickLocation = e.target.id; 
        }
    },false);
    
    document.getElementById('sheet1').addEventListener('click',function(e){
            document.getElementById('cm').style.visibility = 'hidden';
            document.getElementById('cm2').style.visibility = 'hidden';
    },false);
    
     
     document.getElementById('item1').addEventListener('click',function(e){
        document.getElementById('cm').style.visibility = 'hidden';
        addColumn(e);
    },false);
    
    document.getElementById('item2').addEventListener('click',function(e){
        document.getElementById('cm').style.visibility = 'hidden';
        deleteColumn(e);
    },false);
    
     document.getElementById('item3').addEventListener('click',function(e){
        document.getElementById('cm2').style.visibility = 'hidden';
        addNewRow(e);
    },false);
    
    document.getElementById('item4').addEventListener('click',function(e){
        document.getElementById('cm2').style.visibility = 'hidden';
        deleteRow(e);
    },false);
    
    document.getElementById('cm').addEventListener('contextmenu',function(e){
       e.preventDefault();
    },false);
    
    document.getElementById('cm2').addEventListener('contextmenu',function(e){
        e.preventDefault();
    },false);
    
    function addNewRow(e){
        
        var row = document.createElement('div');
           row.className = 'row';
           row.style.display = 'table-row';
           row.id = XLsheet.grid.length;
        console.log('clickLocation',clickLocation);
        
        //add cell array to grid for new row
        console.log('grid then',XLsheet.grid.length);
        var rowPosition = clickLocation.split('-').map(Number)[0];
        console.log('rowPosition',rowPosition);
        XLsheet.grid[XLsheet.grid.length] = [];
        for(var i = 0 ; i< XLsheet.colnum ; i++){
               var cssClass = "data-cell";
               var contentEditable = false;
               
               i === 0 ? cssClass ='cell-row-header' : cssClass = 'data-cell';
               
               //make data cells apart from row and column headers editable
               i === 0? contentEditable = false : contentEditable = true;
               
               
               //create cell element and store it in gird
               XLsheet.grid[XLsheet.grid.length-1][i] = new Cell().setElement().setId(row.id+'-'+i).setClass(cssClass).addAttributes({ contentEditable : contentEditable});
               if(i===0){
                    XLsheet.grid[XLsheet.grid.length-1][i].setContent(XLsheet.grid.length-1);
               }
               row.appendChild(XLsheet.grid[XLsheet.grid.length-1][i].getElement());
            }
        
        //insert new row before current row
        document.getElementById('sheet1').appendChild(row);
        
        XLsheet.rownum += 1;
        window.localStorage.rownum = XLsheet.rownum;
    }
    
    function deleteRow(e){ 
        console.log('deleting row');
        var el = document.getElementById(clickLocation).parentElement.parentElement.lastChild;
        document.getElementById(clickLocation).parentElement.parentElement.removeChild(el);
        XLsheet.grid.pop();
        XLsheet.rownum -= 1;
        window.localStorage.rownum = XLsheet.rownum;
        window.localStorage[clickLocation]=undefined;
    }
    
    function addColumn(e){
        document.getElementById('sheet1').style.width = parseInt(document.getElementById('sheet1').style.width) + parseInt(XLsheet.cellwidth) + 'px';
        var el = document.getElementById('sheet1');
        var children = el.children;
        var contentEditable;
        var cssClass;
        for(var i = 0 ; i< children.length ; i++){
            i === 0 ? contentEditable = false : contentEditable = true;
            i === 0 ? cssClass = 'cell-col-header' : cssClass = 'data-cell';
            var div = new Cell().setElement().setClass(cssClass).setId(i+'-'+grid[i].length).addAttributes({ contentEditable : contentEditable});
            grid[i][grid[i].length] = div;
            children[i].appendChild(div.el);
            if(i===0){
                   grid[i][grid[i].length-1].el.style.width = XLsheet.cellwidth;
                   grid[i][grid[i].length-1].setContent(getCollebel(grid[i].length-1));
            }
        }
        XLsheet.colnum  += 1;
        window.localStorage.colnum = XLsheet.colnum;
    }
    
    function deleteColumn(e){
       var children = document.getElementById('sheet1').children;
       for(var i = 0 ; i< children.length ; i++){
            children[i].removeChild(children[i].lastChild);
            console.log('children[i].lastChild',children[i].lastChild);
        } 
        for(var i = 0 ; i < XLsheet.grid.length; i++){
            XLsheet.grid[i].pop();
        }
        XLsheet.colnum  -= 1;
        window.localStorage.colnum = XLsheet.colnum;
    }
    
    function addRowlebel(){
        for(var idx=0; idx < grid.length; idx++){
            XLsheet.grid[idx][0].setContent(idx);
        }
    }
    
    function addCollebel(){
        var col_lebel = 65;
        for(var idx=1; idx < grid[0].length; idx++,col_lebel++){
            grid[0][idx].setContent(getCollebel(idx)); 
        }
    }
    
    function getCollebel(index){
        var count = index;
                var count1 = -1;
                while(count>0){
                    count -= 26;
                    count1++;
                }
                count += 26;
                if(count1 === 0){
                    return String.fromCharCode(65+index-1);
                }
                else{
                    var prefix = String.fromCharCode(65+count1-1);
                    var postfix  = String.fromCharCode(65+count-1);
                    return prefix+postfix;
                }
    }
    
    //call getGrid
    createGrid();
    
    window.localStorage.rownum = XLsheet.rownum;
    window.localStorage.colnum = XLsheet.colnum;
    
    //setting row and column header
    var grid = XLsheet.grid;
    
    addRowlebel();
    
    addCollebel();
    
    
})(document,window);