'use babel';


export default class ImChannelSelectView {
  constructor() {
    // Create root element
    this.element = document.createElement('div')
    this.element.classList.add = 'overlay from-top'
    // Add preloader
    // this.element.innerHTML = `
    //   <div style='display: flex; flex-direction: row; position: fixed; top: 0; right: 0; bottom: 0; left: 0; width: 100%; height: 100%;'>
    //     <div class='block' style='height: 4em; margin: auto; display: flex; justify-content: flex-start;'>
    //       <div style="margin-right: 30px; color: #5c6370; padding-bottom: 5px; font-size: 3em; font-weight: bold;"> Atom @ IM </div>
    //       <div class='im-loader' style='color: #5c6370;'>Loading...</div>
    //     </div>
    //   </div>
    // `
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }
}


// class MySelectListView
//  initialize: ->
//    super
//    @addClass('overlay from-top')
//    @setItems(['Hello', 'World'])
//    @panel ?= atom.workspace.addModalPanel(item: this)
//    @panel.show()
//    @focusFilterEditor()
//
//  viewForItem: (item) ->
//    "<li>#{item}</li>"
//
//  confirmed: (item) ->
//    console.log("#{item} was selected")
//
//  cancelled: ->
//    console.log("This view was cancelled")


// export default class ImChannelSelectView extends SelectListView {
//   constructor(serializedState) {
//     super(serializedState)
//     this.addClass('overlay from-top')
//     this.setItems(['Hello', 'World'])
//     // Create root element
//     // this.element = document.createElement('div');
//     // Add preloader
//     // this.element.innerHTML = ` `
//   }
//
//   // Returns an object that can be retrieved when package is activated
//   serialize() {}
//
//   viewForItem(item) {
//     return `<li>${item}</li>`
//   }
//
//   confirmed(item) {
//     console.log(`${item} was selected`)
//   }
//
//   cancelled() {
//     console.log('This view was cancelled')
//   }
//
//   // Tear down any state and detach
//   destroy() {
//     this.element.remove();
//   }
//
//   getElement() {
//     return this;
//   }
// }
