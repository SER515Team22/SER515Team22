// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')
var global_value;
var dynamic_src = '';
var expression = '';
var URL = '';
let fills = document.querySelectorAll('.fill');
let empties = document.querySelectorAll('.empty');

for (let fill of fills){
  fill.addEventListener('dragstart', dragStart);
  fill.addEventListener('dragend', dragEnd);
}
// Loop through empty boxes and add listeners
for (let empty of empties) {
  empty.addEventListener('dragover', dragOver);
  empty.addEventListener('dragenter', dragEnter);
  empty.addEventListener('dragleave', dragLeave);
  empty.addEventListener('drop', dragDrop);
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 900,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('mainWindow.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// Drag Functions
function dragStart() {
  global_value = this.id;
  dynamic_src = this.src;
  console.log(dynamic_src);
  this.className += ' hold';
}

function dragEnd() {
  this.className = 'fill';
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
  this.className += ' hovered';
}

function dragLeave() {
  this.className = 'empty';
}

function dragDrop(e) {
  this.className = 'empty';
  console.log(expression);
  expression = expression + global_value;
  console.log(expression);

  let img = this.getElementsByTagName('img')[0];
  console.log(img);
  img.src = dynamic_src;
  
  // console.log(global_value);
  // this.append(fills[global_value-1]);
}


function evaluateExp() {
  
  var URL = URL;
  var data = expression;

  $.ajax({
          dataType: 'json',
          url: URL,
          type: "POST",
          data: data,
          // cache: false,

        success: function(data){
          console.log('data sent');
        },

        error: function(){
            alert("Unable to evaluate, contact admin");
        }
          });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
