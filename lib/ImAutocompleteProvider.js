'use babel'

export default class ImAutocompleteProvider {
  scopeSelector = '.source.gfm, .text.md, .text.plain, .comment, .string, .source.emojicode'
  enableCustomTextEditorSelector = true

  constructor({ store }) {
    this.store = store
  }

  getTextEditorSelector() {
    return 'atom-text-editor.im-editor'
  }

  getSuggestions({ editor, bufferPosition, scopeDescriptor, prefix, activatedManually }) {
    if (/^@.*/.test(prefix)) {
      return new Promise((resolve, reject) => {
        const { users, currentTeam } = this.store.getState()
        const teamUsers = users[currentTeam.id]
        resolve(
          Object.keys(teamUsers).map((userId) => {
            return {
              text: `@${teamUsers[userId].username}`,
              replacementPrefix: `@${teamUsers[userId].username}`,
              rightLabel: teamUsers[userId].displayName,
            }
          })
        )
      })
    }
  }

  onDidInsertSuggestion({ editor, triggerPosition, suggestion }) {

  }

  dispose() {

  }
}
