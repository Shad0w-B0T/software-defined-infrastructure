import { defineConfig } from "vitepress";
import { SearchPlugin } from "vitepress-plugin-search";
import markdownIt from "markdown-it";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Software Defined Infrastructure",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Examples", link: "/markdown-examples" },
    ],

    sidebar: [
      {
        text: "Server creation",
        items: [
          { text: "Description", link: "/exercise/exercise_1/index.md" },
          { text: "Firewall", link: "/exercise/exercise_1/firewall.md" },
          { text: "Create Server", link: "/exercise/exercise_1/server.md" },
          {
            text: "Reset Root Password",
            link: "/exercise/exercise_1/root_password.md",
          },
          { text: "Connect Server", link: "/exercise/exercise_1/connect.md" },
          {
            text: "Delete Server",
            link: "/exercise/exercise_1/server_delete.md",
          },
        ],
      },
      {
        text: "Server re-creation",
        items: [
          { text: "Description", link: "/exercise/exercise_2/index.md" },
          { text: "List ip's", link: "/exercise/exercise_2/list.md" },
          {
            text: "ReCreate a Server",
            link: "/exercise/exercise_2/recreate.md",
          },
        ],
      },
      {
        text: "Improve your server's security!",
        items: [],
      },
      {
        text: "ssh-agent installation",
        items: [],
      },
      {
        text: "MI Gitlab access by ssh",
        items: [],
      },
      {
        text: "ssh host hopping",
        items: [],
      },

      {
        text: "ssh port forwarding",
        items: [],
      },

      {
        text: "ssh X11 forwarding",
        items: [],
      },

      {
        text: "Enabling index based file search",
        items: [],
      },
      {
        text: "Using the tail -f command",
        items: [],
      },
      {
        text: "Server creation 2",
        items: [
          { text: "Description", link: "/exercise/exercise_1/index.md" },
          { text: "Firewall", link: "/exercise/exercise_1/firewall.md" },
          { text: "Create Server", link: "/exercise/exercise_1/server.md" },
          {
            text: "Reset Root Password",
            link: "/exercise/exercise_1/root_password.md",
          },
          { text: "Connect Server", link: "/exercise/exercise_1/connect.md" },
        ],
      },
      {
        text: "Server creation 3",
        items: [
          { text: "Description", link: "/exercise/exercise_1/index.md" },
          { text: "Firewall", link: "/exercise/exercise_1/firewall.md" },
          { text: "Create Server", link: "/exercise/exercise_1/server.md" },
          {
            text: "Reset Root Password",
            link: "/exercise/exercise_1/root_password.md",
          },
          { text: "Connect Server", link: "/exercise/exercise_1/connect.md" },
        ],
      },
      {
        text: "Server creation 4",
        items: [
          { text: "Description", link: "/exercise/exercise_1/index.md" },
          { text: "Firewall", link: "/exercise/exercise_1/firewall.md" },
          { text: "Create Server", link: "/exercise/exercise_1/server.md" },
          {
            text: "Reset Root Password",
            link: "/exercise/exercise_1/root_password.md",
          },
          { text: "Connect Server", link: "/exercise/exercise_1/connect.md" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },

  markdown: {
    config: (md) => {
      let counter = [0, 0, 0];
      md.core.ruler.push("custom_numbering", function (state) {
        counter = [0, 0, 0];
        state.tokens.forEach((token, idx) => {
          if (token.type === "heading_open") {
            const level = parseInt(token.tag[1]);
            if (level >= 1 && level <= 3) {
              counter[level - 1]++;
              for (let i = level; i < 3; i++) counter[i] = 0;
              const headingIndex = counter.slice(0, level).join(".");
              const inline = state.tokens[idx + 1];
              inline.content = `${headingIndex} ${inline.content}`;
            }
          }
        });
      });
    },
  },

  vite: {
    plugins: [
      SearchPlugin({
        previewLength: 50,
        buttonLabel: "Suche",
        placeholder: "Dokumentation durchsuchen...",
        tokenize: "full",
        //indexOptions: defaultOptions, // oder weglassen
      }),
    ],
  },
});
