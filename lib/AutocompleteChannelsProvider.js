'use babel'

export default class AutocompleteChannelsProvider {
  selector = '.source.gfm, .text.md, .text.plain, .comment, .string, .source.emojicode'
  inclusionPriority =  10

  constructor({ store }) {
    this.store = store
  }

  getSuggestions({ editor, bufferPosition, scopeDescriptor, prefix, activatedManually }) {
    return [{
      text: 'xxxx',
      replacementPrefix: 'xxxx',
      rightLabel: 'xxxx',
    }]
  }

 onDidInsertSuggestion({ editor, triggerPosition, suggestion }) {

 }

 dispose() {

 }
}
