import type { ComponentType } from "react"

import * as calendar from "./calendar"
import * as chapterScrubber from "./chapter-scrubber"
import * as chatComposer from "./chat-composer"
import * as commandMenu from "./command-menu"
import * as dataTable from "./data-table"
import * as datePicker from "./date-picker"
import * as emptyState from "./empty-state"
import * as filterMenu from "./filter-menu"
import * as floatingNav from "./floating-nav"
import * as inputGroup from "./input-group"
import * as integrationVisual from "./integration-visual"
import * as jumpBar from "./jump-bar"
import * as messageList from "./message-list"
import * as reactions from "./reactions"
import * as richTextEditor from "./rich-text-editor"
import * as statusDot from "./status-dot"
import * as stickerAvatar from "./sticker-avatar"
import * as tokenFlow from "./token-flow"
import * as typingIndicator from "./typing-indicator"

/**
 * Each doc's live examples, ported from its fibo stories and keyed by the
 * story's export name, so `<Example of="reactions.Default" />` in the MDX
 * matches `Default` in fibo's reactions.stories.tsx.
 */
export const EXAMPLES: Record<string, Record<string, ComponentType>> = {
  calendar,
  "chapter-scrubber": chapterScrubber,
  "chat-composer": chatComposer,
  "command-menu": commandMenu,
  "data-table": dataTable,
  "date-picker": datePicker,
  "empty-state": emptyState,
  "filter-menu": filterMenu,
  "floating-nav": floatingNav,
  "input-group": inputGroup,
  "integration-visual": integrationVisual,
  "jump-bar": jumpBar,
  "message-list": messageList,
  reactions,
  "rich-text-editor": richTextEditor,
  "status-dot": statusDot,
  "sticker-avatar": stickerAvatar,
  "token-flow": tokenFlow,
  "typing-indicator": typingIndicator,
}
