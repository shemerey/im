'use babel'

import _ from 'underscore-plus'

export const nowTs = () => `${new Date().getTime() / 1000}000`
export const uniqueId = () => _.uniqueId()
