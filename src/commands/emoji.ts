import "@logseq/libs";
import { useEmojiStore } from "@/stores/emoji";
import { hideMainUI } from "@/common/funcs";
import emojiData from "./emoji/emoji";

// Create a map of emoji keywords to emoji characters for quick lookup
const emojiMap = new Map<string, string>();
emojiData.forEach((item: any) => {
  emojiMap.set(item.keyword, item.title);
  // Also support description format like "smile" for ":smile:"
  if (item.description) {
    const cleanDesc = item.description.replace(/:/g, "");
    emojiMap.set(cleanDesc, item.title);
  }
});

export async function generate(argv) {
  if (argv._.length < 1 || !argv._[0]) {
    logseq.UI.showMsg("Please specify an emoji keyword. Example: :emoji smile");
    return;
  }

  let repeats = 1;
  if (Number.isInteger(parseInt(argv._[argv._.length - 1]))) {
    repeats = parseInt(argv._[argv._.length - 1]);
    argv._.pop();
  }

  if (argv._.length < 1) {
    logseq.UI.showMsg("Please input at least one emoji keyword.");
    return;
  }

  const emojiStore = useEmojiStore();
  let insertedAny = false;

  for (let i = 0; i < argv._.length; i++) {
    const keyword = argv._[i].toLowerCase();
    const emoji = emojiMap.get(keyword);

    if (emoji) {
      const emojiRepeats = [...new Array(repeats)].map(() => emoji).join("");
      await emojiStore.insertEmoji(emojiRepeats);
      insertedAny = true;

      if (argv.space) {
        await logseq.Editor.insertAtEditingCursor(" ");
      }
    } else {
      logseq.UI.showMsg(`Emoji not found: "${keyword}"`);
    }
  }

  if (insertedAny) {
    hideMainUI();
  }
}
