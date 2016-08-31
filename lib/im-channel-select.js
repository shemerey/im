'use babel';

import { SelectListView } from 'atom-space-pen-views'

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


export default class ImChannelSelectView extends SelectListView {
  constructor(serializedState) {
    super(serializedState)
    this.addClass('overlay from-top')
    // Create root element
    // this.element = document.createElement('div');
    // Add preloader
    // this.element.innerHTML = ` `
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  viewForItem(item) {
    return `<li>${item}</li>`
  }

  confirmed(item) {
    console.log(`${item} was selected`)
  }

  cancelled() {
    console.log('This view was cancelled')
  }

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this;
  }
}
