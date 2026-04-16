import {
  debug,
  getSettings,
  showMainUI,
  beforeActionExecute,
  beforeActionRegister,
} from "@/common/funcs";
import { useEmojiStore } from "@/stores/emoji";
import { ILSPluginUser } from "@logseq/libs/dist/LSPlugin";

export default (logseq: ILSPluginUser) => {
  // Check if this keybinding is disabled
  if (!beforeActionRegister("emoji")) {
    return;
  }

  const settings = getSettings();

  const bindings = Array.isArray(settings.keyBindings.emoji)
    ? settings.keyBindings.emoji
    : [settings.keyBindings.emoji];

  const emojiHandler = async () => {
    // Check before action hook
    if (!beforeActionExecute()) {
      return;
    }

    debug("Insert emoji");

    const isEditing = await logseq.Editor.checkEditing();
    if (!isEditing) {
      logseq.UI.showMsg("Please edit a block first.");
      return;
    }

    // Show command mode with emoji command hint
    showMainUI(false);
    logseq.UI.showMsg("Use :emoji <keyword> to insert emoji (e.g., :emoji smile)");
  };

  bindings.forEach((binding, index) => {
    logseq.App.registerCommandPalette(
      {
        key: "vim-shortcut-emoji-" + index,
        label: "Insert emoji",
        keybinding: {
          mode: "global",
          binding,
        },
      },
      emojiHandler
    );
  });

  logseq.Editor.registerSlashCommand("Insert Emoji", emojiHandler);
};
